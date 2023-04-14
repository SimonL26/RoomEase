import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response) => {
  /**
   * User registration.
   * automatically generate user id using uuid v4 and hash password using bcrypt.
   */
  try {
    const newUser = await User.create({
      id: uuidv4(),
      email: req.body.email,
      password: hashSync(req.body.password, 10),
    });
    if (newUser) {
      res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Unable to create new user", error: error.message, path: "/api/auth/signup" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  /**
   * User login with password verification and token generation, 
   * token is generated using jwt.
   */
  try {
    // find a user by its email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      // if does not exist send invalid message
      res.status(404).json({ message: "Email is not registered" });
    } else {
      // if user exist validate password
      const validatePassword = compareSync(req.body.password, user.password);
      if (!validatePassword) {
        res.status(401).json({ message: "Invalid Password!" });
      } else {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET as string,
          { expiresIn: 7200 }
        );

        return res
          .status(200)
          .cookie("token", token, { httpOnly: true })
          .json({
            message: "successfully logged in",
            user: {
              _id: user.id,
              email: user.email,
            },
          });
      }
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Unable to process login", error: error.message, path: "/api/auth/login"});
  }
};

const logoutUser = async (req: Request, res: Response) => {
  /**
   * Logging out users by clearing browser token cookie.
   */
  res.clearCookie("token");
  return res.status(200).json({message: "Successfully logged out"});
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
};
