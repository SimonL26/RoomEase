import { Request, Response } from "express";

const testGetAllResource = (req: Request, res: Response) => {
    res.status(200).json({message: "Here are your resources"})
}

const testUserResource = (req: Request, res: Response) => {
    res.status(200).json({message: "User private resources."})
}

export const test = {
    testGetAllResource,
    testUserResource
}