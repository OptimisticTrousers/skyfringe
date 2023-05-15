import { Router } from "express";
import {
  user_list,
  user_detail,
  user_update,
  user_delete,
  user_feed,
} from "../controllers/userController";
import multerCoverKey from "../middleware/multerCoverKey";

const router = Router();

router.route("/").get(user_list);

router
  .route("/:userId")
  .get(user_detail)
  .put(multerCoverKey, user_update)
  .delete(user_delete);

router.route("/:userId/feed").get(user_feed);

export default router;
