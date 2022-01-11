import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const pass: any = process.env.JWT_SECRET;

export const generateToken = (user: any) => {
  const expires = process.env.JWT_EXPIRES_IN;
  return jwt.sign(user, pass, { expiresIn: expires });
};

export const decodeToken = (token: any) => {
  
  const decodedToken = jwt.verify(token, pass);
  
  return decodedToken;
};
