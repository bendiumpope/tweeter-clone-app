import { Request, Response, NextFunction } from "express";
import AppError from "../utils/http-error";
import {
  
} from "../services/postService";
import { createComments, deleteCommentByCommentId, getCommentByAuthorId, getCommentByCommentId, getCommentByPostId, queryComments, updateCommentByCommentId } from "../services/commentService";

export const createComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
    try {
        const { comment } = req.body
        const { postId } = req.params;
    const newComment = await createComments(comment, +req.user.id, +postId);
    res.status(201).json({ message: "success", data: newComment });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await queryComments();
    res.status(200).json({ message: "success", data: comments });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Comment = await getCommentByCommentId(+req.params.commentId);
    if (!Comment) {
      return next(new AppError("Comment not found", 404));
    }
    res.status(200).json({ message: "success", data: Comment });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getCommentByAuthor = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await getCommentByAuthorId(+req.user.id);
    if (!comments) {
      return next(new AppError("Posts not found", 404));
    }
    res.status(200).json({ message: "success", data: comments });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getCommentByPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await getCommentByPostId(+req.params.postId);
    if (!comments) {
      return next(new AppError("Posts not found", 404));
    }
    res.status(200).json({ message: "success", data: comments });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const updateComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await updateCommentByCommentId(
      +req.params.commentId,
      req.body,
      +req.user.id
    );
    res.status(200).json({ message: "success", data: comment });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const deleteComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedComment = await deleteCommentByCommentId(
      +req.params.commentId,
      +req.user.id
    );
    res.status(201).json({ message: "success", data: deletedComment });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};
