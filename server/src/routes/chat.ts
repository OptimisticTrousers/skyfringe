import { Router } from "express";
import { create_message, get_chat } from "../controllers/chatController";
import multerMessageKey from "../middleware/multerMessageKey";

const router = Router();

router.route("/").post(get_chat);

router.route("/:chatId/messages").post(multerMessageKey, create_message);

export default router;
