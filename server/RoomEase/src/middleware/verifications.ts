import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import * as jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  token: string | jwt.JwtPayload;
}

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
  } catch (error: any) {
    return res.status(500).json({
      message: "Unable to process sign up",
      err: error.message
    });
  }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try{
    // change here
    const token = req.session?.token;

    if (!token) {
      return res.status(403).json({message: "No token provided!"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as CustomRequest).token = decoded;
    
    next();
  }catch(err){ 
    res.status(401).json({message: "Please authenticate"})
  }

}
export const verifications = {
  checkDuplicateEmail,
  verifyToken
};
