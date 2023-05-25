import { Router } from "express";
import {
  user_list,
  user_detail,
  user_update,
  user_delete,
  user_feed,
  user_avatar_put,
  user_cover_put,
  user_images,
  get_user_chats,
} from "../controllers/userController";
import multerCoverKey from "../middleware/multerCoverKey";
import validateUserId from "../middleware/validateUserId";
import multerUserKey from "../middleware/multerUserKey";
import restrictTestUserActions from "../middleware/restrictTestUserActions";

const router = Router();

router.route("/").get(user_list);

router
  .route("/:userId")
  .get(validateUserId, user_detail)
  .put(validateUserId, restrictTestUserActions, user_update)
  .delete(validateUserId, restrictTestUserActions, user_delete);

router.route("/:userId/images").get(validateUserId, user_images);

router.route("/:userId/chats").get(validateUserId, get_user_chats);

router
  .route("/:userId/avatar")
  .put(validateUserId, restrictTestUserActions, multerUserKey, user_avatar_put);
router
  .route("/:userId/cover")
  .put(validateUserId, restrictTestUserActions, multerCoverKey, user_cover_put);
router.route("/:userId/feed").get(validateUserId, user_feed);

export default router;
