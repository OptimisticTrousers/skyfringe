import { Router } from "express";
import { create_message, get_chat } from "../controllers/chatController";

const router = Router();

router.route("/").post(get_chat);

router.route("/:chatId/messages").post(create_message);

export default router;
