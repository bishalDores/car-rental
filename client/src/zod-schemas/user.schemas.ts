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

export const UpdateProfileSchema = z.object({
  name: z.string({ message: "Please enter your name" }).min(2, "Name must be atleast 2 characters long"),
  email: z.email({ message: "Please enter valid email address" }),
  phoneNo: z.string({ message: "Please enter your phone number" }),
});

export const UpdatePasswordSchema = z
  .object({
    oldPassword: z.string({ message: "Please enter your old password" }).min(6, "Old password must be atleast 6 characters long"),
    newPassword: z.string({ message: "Please enter your new password" }).min(6, "New password must be atleast 6 characters long"),
    confirmPassword: z.string({ message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.email({ message: "Please enter valid email address" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string({ message: "Please enter your  password" }).min(6, "Password must be atleast 6 characters long"),
    confirmPassword: z.string({ message: "Please confirm your new password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
