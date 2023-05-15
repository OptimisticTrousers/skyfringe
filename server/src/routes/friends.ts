import { Router } from "express";
import { friend_request } from "../controllers/friendController";
import validateUserId from "../middleware/validateUserId";

const router = Router();

router.route("/:userId").put(validateUserId, friend_request);

export default router;
