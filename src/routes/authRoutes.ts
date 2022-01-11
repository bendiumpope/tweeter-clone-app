import express from "express";
import validate from "../middlewares/validate";
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resetPasswordValidator,
} from "../validations/authValidation";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/authController";
// import {auth} from "../middlewares/auth";

const router = express.Router();

router.post("/register", validate(registerValidator), register);
router.post(
  "/verify-email",
  verifyEmail
);
router.post("/login", validate(loginValidator), login);

router.post(
  "/forgot-password",
  validate(forgotPasswordValidator),
  forgotPassword
);
router.post("/reset-password", validate(resetPasswordValidator), resetPassword);

export default router;
