import express, { Request, Response, NextFunction } from "express";
import AppError from "../utils/http-error";
import {
  loginUserWithEmailAndPassword,
  resetPasswordUser,
  //   resetPasswordUser,
  //   verifyEmailUser,
} from "../services/authService";
import {
  sendResetPasswordEmail,
  sendVerificationEmailUser,
} from "../services/emailService";
import { generateToken } from "../services/tokenService";
import {
  createUser,
  getUserByEmail,
  registerUser,
} from "../services/userService";
import { verifyEmailUser } from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUser(req.body);

    const tokens = await generateToken(user);
    sendVerificationEmailUser(user.email, tokens);
    res.status(200).json({
      message:
        "Registration Successful! an email have been sent to you for verification",
      tokens,
    });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserWithEmailAndPassword(email, password);
    const tokens = await generateToken(user);
    req.headers.authorization = `Bearer ${tokens}`;
    res.status(200).json({ message: "Success", tokens });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserByEmail(req.body.email);
    const resetPasswordToken = await generateToken(user);
    await sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(200).json({
      message:
        "A verification email have being sent to you to reset your password!",
      token: resetPasswordToken,
    });
  } catch (error: any) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

export const resetPassword = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await resetPasswordUser(
      req.query.token,
      req.body.password
    );
    res
      .status(200)
      .json({ message: "password reset successful", data: updatedUser });
  } catch (error: any) {
    return next(new AppError(error.message, 500));
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await verifyEmailUser(req.query.token);
    const tokens = await generateToken(newUser);
    req.headers.authorization = `Bearer ${tokens}`;

    res.status(200).json({
      message: "Verification is Successful Thank you! You may now login.",
      data: newUser,
      token: tokens,
    });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};
