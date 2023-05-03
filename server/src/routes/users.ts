import { Router } from "express";
import {
  user_list,
  user_detail,
  user_update,
  user_delete,
  user_feed,
  user_posts,
  user_friends,
} from "../controllers/userController";

const router = Router();

router.route("/").get(user_list);

router.route("/:userId").get(user_detail).put(user_update).delete(user_delete);

router.route("/:userId/feed").get(user_feed);

router.route("/:userId/posts").get(user_posts);

router.route("/:userId/friends").get(user_friends);

export default router;
