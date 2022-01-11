import { Request, Response, NextFunction } from "express";
import pick from "../utils/pick";
import AppError from "../utils/http-error";
import {
  deleteUserById,
  getUserById,
  queryUsers,
  updateUserById,
} from "../services/userService";


export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await queryUsers();
    res.status(200).json({ message: "success", data: result });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({ message: "success", data: user });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateUserById(req.params.userId, req.body);
    res.status(200).json({ message: "success", data: user });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await deleteUserById(req.params.userId);
    res.status(201).json({ message: "success", data: deletedUser });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};
