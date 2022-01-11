import express from "express";
import { protect } from "../middlewares/auth";
import validate from "../middlewares/validate";
import { createPostValidator, deletePostValidator, getPostByAuthorValidator, getPostValidator, updatePostValidator } from "../validations/postValidation";
import { createPost, deletePost, getPost, getPostByAuthor, getPosts, updatePost } from "../controllers/postController";

const router = express.Router();

router
  .route("/")
  .post(protect(), validate(createPostValidator), createPost)
  .get(protect(), getPosts);

router
  .route("/:postId")
  .get(protect(), validate(getPostValidator), getPost)
  .patch(protect(), validate(updatePostValidator), updatePost)
  .delete(protect(), validate(deletePostValidator), deletePost);

router.route("/user/:userId").get(protect(), validate(getPostByAuthorValidator), getPostByAuthor);

export default router;
