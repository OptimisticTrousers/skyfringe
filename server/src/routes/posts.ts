import multer from "multer";
import { Router } from "express";
import {
  post_list,
  post_create,
  post_detail,
  post_update,
  post_delete,
} from "../controllers/postController";

import {
  comment_list,
  comment_create,
  comment_update,
  comment_delete,
} from "../controllers/commentController";

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.route("/").get(post_list).post(upload.single("image"), post_create);

router.route("/:postId").get(post_detail).put(post_update).delete(post_delete);

router.route("/:postId/comments").get(comment_list).post(comment_create);

router
  .route("/:postId/comments/:commentId")
  .put(comment_update)
  .delete(comment_delete);

export default router;
