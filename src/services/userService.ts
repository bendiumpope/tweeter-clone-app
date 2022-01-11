import AppError from "../utils/http-error";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const createUser = async (userBody: any) => {
  const emailExist = await prisma.user.findUnique({
    where: { email: userBody.email },
  });

  if (emailExist) {
    throw new AppError("Email already taken", 401);
  }
  userBody.userName = userBody.email.split("@")[0];

  const { name, email, userName, password } = userBody;
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      userName,
      password,
    },
  });
  return newUser;
};

export const registerUser = async (userBody: any) => {
  const emailExist = await prisma.user.findUnique({
    where: { email: userBody.email },
  });
  if (emailExist) {
    throw new AppError("Email already taken", 401);
  }
  const password = await bcrypt.hash(userBody.password, 8);
  const confrimPassword = await bcrypt.hash(userBody.confirmPassword, 8);
  if (password! === confrimPassword) {
    throw new AppError("Password and confirmPassword do not match", 401);
  }
  userBody.password = password;
  userBody.confirmPassword = confrimPassword;

  return userBody;
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
export const queryUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
export const getUserById = async (id: any) => {
  return prisma.user.findUnique({ where: { id: id } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getUserByEmail = async (email: any) => {
  return prisma.user.findUnique({ where: { email: email } });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
export const updateUserById = async (userId: any, updateBody: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (updateBody.email && (await getUserByEmail(updateBody.email))) {
    throw new AppError("Email already taken", 401);
  }
  Object.assign(user, updateBody);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: user,
  });
  return updatedUser;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
export const deleteUserById = async (userId: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const deletedUser = await prisma.user.delete({ where: { id: userId } });
  return deletedUser;
};
