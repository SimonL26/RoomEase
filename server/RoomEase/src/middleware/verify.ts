import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * This is a validator function, it checks whether the email that the user
   * enters on registration already exists in the database,
   * if so return Error message on response.
   */
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).json({
        message: "Email is already registered as a user!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Unable to validate email!",
    });
  }
};

export const verify = {
  checkDuplicateEmail,
};
