import { object, string, TypeOf, z } from "zod";

export const createUserSchema = object({
  body: object({
    email: string({ required_error: "Email address is required" }).email(
      "Invalid email address"
    ),
    password: string({ required_error: "Password is required" }).min(
      8,
      "Password must be more than 8 characters"
    ),
    confirmPassword: string({ required_error: "Please confirm your password" }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Email address is required" }).email(
      "Invalid email address"
    ),
    password: string({
      required_error: "Password is required",
    }).min(8, "Invalid email or password"),
  }),
});

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export type RegisterUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "confirmPassword"
>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>["params"];
