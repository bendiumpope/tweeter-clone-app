import AppError from "../utils/http-error";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const createLikes = async (
  likeType: string,
  authorId: number,
  postId: number
) => {
  const likeExist = await prisma.like.findMany({
    where: { authorId: authorId },
  });

  if (likeExist.length > 0) {
    const {id, createdAt, updatedAt, postId, authorId} = likeExist[0]

    const like = await prisma.like.updateMany({
      where: { id: id },
      data: { id, createdAt, updatedAt, likeType, postId, authorId },
    });
    return like;
  } else {
    const like = await prisma.like.create({
      data: {
        likeType,
        postId,
        authorId,
      },
    });
    return like;
  }
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
export const queryLikes = async (postId: number, likeType: any) => {
  const likes = await prisma.like.findMany({where:{postId: postId, likeType: likeType},
    include: {
      author: true,
      post: true,
    },
  });
  return likes.length;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getLikeByPostId = async (postId: number) => {
  return prisma.like.findMany({
    where: { postId: postId },
    include: {
      author: true,
      post: true,
    },
  });
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
export const deleteLikeByAuthorId = async (
  authorId: number,
  postId: number
) => {
  const like = await prisma.like.findMany({
    where: { postId: postId, authorId: authorId },
  });
  if (!like) {
    throw new AppError("Like not found", 404);
  }
  const deletedLike = await prisma.like.deleteMany({
    where: {authorId: authorId },
  });
  return deletedLike;
};
