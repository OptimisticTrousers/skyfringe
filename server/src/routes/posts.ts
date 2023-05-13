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

const router = Router();

router.route("/").get(post_list).post(multerPostKey, post_create);

router.route("/:postId").put(multerPostKey, post_update).delete(post_delete);

router.route("/:postId/likes").put(post_like);

router.route("/:postId/comments").get(comment_list).post(comment_create);

router
  .route("/:postId/comments/:commentId")
  .put(comment_update)
  .delete(comment_delete);

router.route("/:postId/comments/:commentId/likes").put(comment_like);

export default router;
