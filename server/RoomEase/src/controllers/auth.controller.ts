import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";
import { hashSync, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "config";
import Email from "../utils/email";
import { RegisterUserInput, VerifyEmailInput } from "../schemas/user.schema";
import crypto from "crypto";
import AppError from "../utils/appError";

const createUser = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
  next: NextFunction
) => {
  /**
   * User registration.
   * automatically generate user id using uuid v4 and hash password using bcrypt.
   */
  try {
    const { email, password } = req.body;

    // retriving verification code generated by the function
    const { verificationCode, hashedVerificationCode } =
      User.createVerificationCode();

    const newUser = await User.create({
      id: uuidv4(),
      email: email.toLowerCase(),
      password: hashSync(password, 10),
      verified: false,
      verificationCode: hashedVerificationCode
    });

    // Sending Verification email
    const redirectUrl = `${config.get<string>(
      "origin"
    )}/verifyemail/${verificationCode}`;

    if (newUser) {
      // if newUser is created -> send new email
      try {
        await new Email(newUser, redirectUrl).sendVerification();

        res.status(201).json({
          status: "success",
          message:
            "An email with a verification code has been sent to your email address.",
        });
      } catch (error: any) {
        // handling errors occurred while sending emails
        newUser.verificationCode = null;

        return res.status(500).json({
          status: "error",
          message:
            "There was an error sending verification email, please try again",
        });
      }
    }
  } catch (error: any) {
    // handling errors occurred while creating a new user
    res.status(500).json({
      message: "Unable to create new user",
      error: error.message,
      path: "/api/auth/signup",
    });
    next(error)
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * User login with password verification and token generation,
   * token is generated using jwt.
   */
  try {

    const { email, password } = req.body;
    // find a user by its email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // Check user if registered
    if (!user) {
      res.status(404).json({ message: "Email is not registered" });
      return next(new AppError(400, "Invalid Email"))
    }

    // Check user if verified
    if (!user.verified) {
      return next(new AppError(400, "Email is not verified"))
    }
    // Check if password is valid
    if (!(await compare(password, user.password))) {
      return next(new AppError(400, "Invalid Password"))
    }
    // Create access token 
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.get<string>("jwtSecret"),
      { expiresIn: 7200 }
    );

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({
        status: "success",
        message: "Successfully logged in",
        access_token: token,
      });
  } catch (error: any) {
    res.status(500).json({
      message: "Unable to process login",
      error: error.message,
      path: "/api/auth/login",
    });
    next(error);
  }
};

const verifyEmailHandler = async (
  req: Request<VerifyEmailInput>,
  res: Response,
  next: NextFunction
) => {
  try{
    const { verificationCode } = req.params
    const code = crypto.createHash('sha256').update(verificationCode).digest("hex");

    const user = await User.findOne({
      where: {
        verificationCode: code
      }
    });
    
    if (user){
      user.verified = true;
      user.verificationCode = null;
      await user.save();

      res.status(200).json({
        status: 'success',
        message: "Email successfully verified"
      });
    }
  }catch (error: any){
    next(error);
  }
};

const logoutUser = async (req: Request, res: Response) => {
  /**
   * Logging out users by clearing browser token cookie.
   */
  res.clearCookie("token");
  return res.status(200).json({ status: "success", message: "Successfully logged out" });
};

const deleteUser = async (req: Request, res: Response) => {
  /**
   * handle delete user
   */
};

export const auth = {
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  verifyEmailHandler,
};
