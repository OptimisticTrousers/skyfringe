import { Router } from "express";
import {
  post_list,
  post_create,
  post_update,
  post_delete,
  post_like,
} from "../controllers/postController";
import {
  comment_list,
  comment_create,
  comment_update,
  comment_delete,
  comment_like,
} from "../controllers/commentController";
import multerPostKey from "../middleware/multerPostKey";
import validatePostId from "../middleware/validatePostId";
import validateCommentId from "../middleware/validateCommentId";

const router = Router();

router.route("/").get(post_list).post(multerPostKey, post_create);

router
  .route("/:postId")
  .put(validatePostId, multerPostKey, post_update)
  .delete(validatePostId, multerPostKey, post_delete);

router.route("/:postId/likes").put(validatePostId, post_like);

router
  .route("/:postId/comments")
  .get(validatePostId, comment_list)
  .post(validatePostId, comment_create);

router
  .route("/:postId/comments/:commentId")
  .put(validatePostId, validateCommentId, comment_update)
  .delete(validatePostId, validateCommentId, comment_delete);

router
  .route("/:postId/comments/:commentId/likes")
  .put(validatePostId, validateCommentId, comment_like);

export default router;
