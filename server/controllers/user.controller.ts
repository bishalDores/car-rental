import bcrypt from "bcryptjs";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

import User from "../models/user.model";
import jwt, { SignOptions } from "jsonwebtoken";
import { UserInput } from "../types/user.types";
import { Response } from "express";

export const registerUser = catchAsyncErrors(async (userInput: UserInput) => {
  const { name, email, password, phoneNo } = userInput;

  return await User.create({
    name,
    email,
    password,
    phoneNo,
  });
});

export const login = catchAsyncErrors(async (email: string, password: string, res: Response) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid Email or Password");
  }
  const isPasswordMatched = await bcrypt.compare(password, user?.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid Email or Password");
  }

  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT configuration is missing");
  }

  const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  } as SignOptions);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: Number(process.env.COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
  });
  return user;
});
