import { Router, Request, Response } from "express";
import { auth } from "../controllers/auth.controller";
import { verifications } from "../middleware/verifications";

const authRouter = Router();

// handle sign up
authRouter.post("/signup", [verifications.checkDuplicateEmail] ,auth.createUser)
// handle log in
authRouter.post("/login", auth.loginUser)

export default authRouter;
