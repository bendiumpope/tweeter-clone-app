import AppError from "../utils/http-error";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const createComments = async (
  comment: string,
  authorId: number,
  postId: number
) => {
  const newComment = await prisma.comment.create({
    data: {
      comment,
      postId,
      authorId,
    },
  });
  return newComment;
};

// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
export const queryComments = async () => {
  const comment = await prisma.comment.findMany({
    include: {
      author: true,
      post: true
    },
  });
  return comment;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
export const getCommentByCommentId = async (commentId: number) => {
  return prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      author: true,
      post: true,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getCommentByAuthorId = async (authorId: number) => {
  return prisma.comment.findMany({
    where: { authorId: authorId },
    include: {
      author: true,
      post: true,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getCommentByPostId = async (postId: number) => {
  return prisma.comment.findMany({
    where: { postId: postId },
    include: {
      author: true,
      post: true,
    },
  });
};


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
export const updateCommentByCommentId = async (
  commentId: number,
  updateBody: any,
  authorId: number
) => {
  const comment: any = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  Object.assign(comment, updateBody);

  const updatedComment = await prisma.comment.updateMany({
    where: { id: commentId, authorId: authorId },
    data: comment,
  });
  return updatedComment;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
export const deleteCommentByCommentId = async (commentId: number, authorId: number) => {
  const post = await getCommentByCommentId(commentId);
  if (!post) {
    throw new AppError("Comment not found", 404);
  }
  const deletedComment = await prisma.comment.deleteMany({
    where: { id: commentId, authorId: authorId },
  });
  return deletedComment;
};
