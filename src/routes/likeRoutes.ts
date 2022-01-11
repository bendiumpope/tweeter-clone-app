import express from "express";
import { createLike, deleteLike, getLikes } from "../controllers/likeController";
import { protect } from "../middlewares/auth";
import validate from "../middlewares/validate";
import { getLikeByPostId } from "../services/likeService";
import { createLikeValidator, deleteLikeValidator, getLikeByPostValidator, getLikesValidator } from "../validations/likeValidation";

const router = express.Router();

router
  .route("/:postId")
  .post(protect(), validate(createLikeValidator), createLike)
  .get(protect(), validate(getLikesValidator), getLikes)
  .delete(protect(), validate(deleteLikeValidator), deleteLike);

// router
//   .route("/post/:postId")
//   .get(protect(), validate(getLikeByPostValidator), getLikeByPostId)

export default router;
