import express from "express";
import {protect} from "../middlewares/auth";
import validate from "../middlewares/validate";
import { deleteUserValidator, getUserValidator, updateUserValidator } from "../validations/userValidation";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController";

const router = express.Router();

router
  .route("/")
  .get(
    protect(),
    getUsers
  );

router
  .route("/:userId")
  .get(
    protect(),
    validate(getUserValidator),
    getUser
  )
  .patch(
    protect(),
    validate(updateUserValidator),
    updateUser
  )
  .delete(
    protect(),
    validate(deleteUserValidator),
    deleteUser
  );

export default router;
