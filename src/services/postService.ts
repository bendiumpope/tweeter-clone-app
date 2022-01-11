import AppError from "../utils/http-error";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const createPosts = async (content: string, authorId: number) => {
  const newPost = await prisma.post.create({
    data: {
      content,
      authorId,
    },
  });
  return newPost;
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
export const queryPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
  return posts;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
export const getPostById = async (postId: number) => {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getPostsByAuthor = async (authorId: number) => {
  return prisma.post.findMany({
    where: { authorId: authorId },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
export const updatePostByPostId = async (postId: number, updateBody: any, authorId: number) => {
  const post: any = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  Object.assign(post, updateBody);

  const updatedPost = await prisma.post.updateMany({
    where: { id: postId, authorId: authorId },
    data: post,
  });
  return updatedPost;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
export const deletePostByPostId = async (postId: number, authorId: number) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  const deletedPost = await prisma.post.deleteMany({ where: { id: postId, authorId:authorId } });
  return deletedPost;
};
