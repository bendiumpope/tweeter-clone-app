import { Request, Response, NextFunction } from "express";
import AppError from "../utils/http-error";
import { createLikes, deleteLikeByAuthorId, getLikeByPostId, queryLikes } from "../services/likeService";

export const createLike = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { likeType } = req.body;
    const { postId } = req.params;
    const newLike = await createLikes(likeType, +req.user.id, +postId);
    res.status(201).json({ message: "success", data: newLike });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getLikes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const likeType = await queryLikes(+req.params.postId, req.query.likeType);
    res.status(200).json({ message: "success", data: likeType });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getLikeByPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const likes = await getLikeByPostId(+req.params.postId);
    if (!likes) {
      return next(new AppError("Posts not found", 404));
    }
    res.status(200).json({ message: "success", data: likes });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const deleteLike = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedLike = await deleteLikeByAuthorId(
        +req.user.id,
        +req.params.postId
    );
    res.status(201).json({ message: "success", data: deletedLike });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};
