import { Router } from "express";
import {
  user_list,
  user_detail,
  user_update,
  user_delete,
  user_feed,
} from "../controllers/userController";
import multerCoverKey from "../middleware/multerCoverKey";
import validateUserId from "../middleware/validateUserId";

const router = Router();

router.route("/").get(user_list);

router
  .route("/:userId")
  .get(validateUserId, user_detail)
  .put(validateUserId, multerCoverKey, user_update)
  .delete(validateUserId, user_delete);

router.route("/:userId/feed").get(validateUserId, user_feed);

export default router;
