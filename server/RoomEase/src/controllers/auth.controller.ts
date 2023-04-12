import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"

const createNewUser = (req: Request, res: Response) => {
    const id = uuidv4()

}