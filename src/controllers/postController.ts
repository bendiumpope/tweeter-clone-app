import { Request, Response, NextFunction } from "express";
import pick from "../utils/pick";
import AppError from "../utils/http-error";
import { createPosts, deletePostByPostId, getPostById,  getPostsByAuthor, queryPosts, updatePostByPostId } from "../services/postService";

export const createPost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await createPosts(req.body.content, req.user.id);
    res.status(200).json({ message: "success", data: post });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await queryPosts();
    res.status(200).json({ message: "success", data: posts });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPostById(+req.params.postId);
    if (!post) {
      return next(new AppError("Post not found", 404));
    }
    res.status(200).json({ message: "success", data: post });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const getPostByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getPostsByAuthor(+req.params.userId);
    if (!posts) {
      return next(new AppError("Posts not found", 404));
    }
    res.status(200).json({ message: "success", data: posts });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};

export const updatePost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await updatePostByPostId(+req.params.postId, req.body, +req.user.id);
    res.status(200).json({ message: "success", data: post });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};


export const deletePost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedPost = await deletePostByPostId(+req.params.postId, +req.user.id);
    res.status(201).json({ message: "success", data: deletedPost });
  } catch (error: any) {
    return next(new AppError(error, 500));
  }
};
