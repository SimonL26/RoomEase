import { Router } from "express";
import { auth } from "../controllers/auth.controller";
import { verifications } from "../middleware/verifications";
import { validateSchema } from "../middleware/validateSchema";
import {
  verifyEmailSchema,
  createUserSchema,
  loginUserSchema,
} from "../schemas/user.schema";

const authRouter = Router();

// handle sign up
authRouter.post(
  "/signup",
  [verifications.checkDuplicateEmail, validateSchema(createUserSchema)],
  auth.createUser
);
// handle log in
authRouter.post("/login", validateSchema(loginUserSchema), auth.loginUser);

// handle user email verification
authRouter.get(
  "/verifyemail/:verificationCode",
  [validateSchema(verifyEmailSchema)],
  auth.verifyEmailHandler
);
// handle log out, log out removes user cookie from cookies
authRouter.post("/logout", auth.logoutUser);

export default authRouter;
