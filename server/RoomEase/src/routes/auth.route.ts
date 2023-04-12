import { Router, Request, Response } from "express";
import { auth } from "../controllers/auth.controller";
import { verify } from "../middleware/verify";

const authRouter = Router();

// handle sign up
authRouter.post("/signup", [verify.checkDuplicateEmail] ,auth.createUser)
// handle log in
authRouter.post("/login", auth.loginUser)

export default authRouter;
