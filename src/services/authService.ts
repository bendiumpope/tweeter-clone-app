import { decodeToken } from "./tokenService";
import { createUser, getUserByEmail } from "./userService";
// import { getUserByEmail } from "./userService";
import AppError from "../utils/http-error";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// /**
//  * Login with username and password
//  * @param {string} email
//  * @param {string} password
//  * @returns {Promise<User>}
//  */
export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Incorrect email or password", 402);
  }
  return user;
};

// /**
//  * Reset password
//  * @param {string} resetPasswordToken
//  * @param {string} newPassword
//  * @returns {Promise}
//  */
export const resetPasswordUser = async (
  resetPasswordToken: any,
  newPassword: any
) => {
  try {
    const userDetail: any = await decodeToken(resetPasswordToken);
    const user = await getUserByEmail(userDetail.email);
    const password = await bcrypt.hash(newPassword, 8);
    if (!user) {
      throw new Error();
    }
    let updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { password: password },
    });
    return updatedUser;
  } catch (error) {
    throw new AppError("Password reset failed", 400);
  }
};

// /**
//  * Verify email
//  * @param {string} verifyEmailToken
//  * @returns {Promise}
//  */
export const verifyEmailUser = async (verifyEmailToken: any) => {
  try {
    const user = decodeToken(verifyEmailToken);

    const newUser = await createUser(user);

    return newUser;
  } catch (error) {
    console.log(error);
    throw new AppError("Email verification failed", 401);
  }
};
