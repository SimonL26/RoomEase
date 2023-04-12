import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import User from "../models/user.model"
import { hashSync } from "bcrypt"


const createUser = async (req: Request, res: Response) => {
    /**
     * handle user registration
     */
    try{
        const newUser = await User.create({
            id: uuidv4(),
            email: req.body.email,
            password: hashSync(req.body.password, 10)
        });
        if (newUser){
            res.status(200).json({message: "User registered successfully"})
        }
    }catch(error){
        res.status(500).json({message: "Unable to create the new user"})
    }
}

const loginUser = async (req: Request, res: Response) => {
    /**
     * handle user login
     */

}

const deleteUser = async (req: Request, res: Response) => {
    /**
     * handle delete user
     */
    
}