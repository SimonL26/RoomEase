import { Router, Request, Response } from "express";

const authRouter = Router();

authRouter.get("/login", (req: Request, res: Response) => {
  console.log("you are in users/login");
  res.send("users log in route");
});

authRouter.get("/signup", (req: Request, res: Response) => {
  console.log("your are in users/signup");
  res.send("users sign up route");
});

export default authRouter;
