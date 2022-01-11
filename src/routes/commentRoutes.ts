import express from "express";
import { protect } from "../middlewares/auth";
import validate from "../middlewares/validate";
import {
  createCommentValidator,
  deleteCommentValidator,
  getCommentValidator,
  updateCommentValidator,
} from "../validations/commentValidation";
import {
  createComment,
  deleteComment,
  getComment,
  getCommentByAuthor,
  getComments,
  updateComment,
} from "../controllers/commentController";

const router = express.Router();

router.route("/").get(protect(), getComments);

router
  .route("/:postId")
  .post(protect(), validate(createCommentValidator), createComment);

router
  .route("/:commentId")
  .get(protect(), validate(getCommentValidator), getComment)
  .patch(protect(), validate(updateCommentValidator), updateComment)
  .delete(protect(), validate(deleteCommentValidator), deleteComment);

router
  .route("/user/comments")
  .get(protect(), getCommentByAuthor);

export default router;
