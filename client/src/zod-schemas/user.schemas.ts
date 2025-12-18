import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string({ message: "Please enter your name" }).min(2, "Name must be atleast 2 characters long"),
  email: z.email({ message: "Please enter valid email address" }),
  password: z.string({ message: "Please enter your password" }).min(6, "Password must be atleast 6 characters long"),
  phoneNo: z.string({ message: "Please enter your phone number" }),
});

export const LoginSchema = z.object({
  email: z.email({ message: "Please enter valid email address" }),
  password: z.string({ message: "Please enter your password" }).min(6, "Password must be atleast 6 characters long"),
});
