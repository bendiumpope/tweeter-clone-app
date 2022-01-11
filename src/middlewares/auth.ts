import { Request, Response, NextFunction } from "express";
import APPError from "../utils/http-error";
import { decodeToken } from "../services/tokenService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//protecting route using a middleware function
export const protect = () => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      if (req.method === "OPTIONS") {
        return next();
      }
      //Getting token and check if it's there
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return next(
          new APPError(
            "You are not logged in! Please log in to get access",
            401
          )
        );
      }

      const decoded: any = decodeToken(token);

      const currentUser = await prisma.user.findUnique({
        where: { id: decoded.id },
      });


      if (!currentUser) {
        return next(
          new APPError(
            "The user belongging to this token no longer exists",
            401
          )
        );
      }
      //Grant access to protected route
      req.user = currentUser;

      next();
    } catch (error) {
      const err = new APPError("Authentication failed!", 403);
      return next(err);
    }
  };
};
