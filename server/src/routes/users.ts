import { Router } from "express";
import {
  user_list,
  user_detail,
  user_update,
  user_delete,
} from "../controllers/userController";

const router = Router();

router.route("/").get(user_list);

router.route("/:userId").get(user_detail).put(user_update).delete(user_delete);

export default router;
