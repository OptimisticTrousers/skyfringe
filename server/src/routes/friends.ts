import { Router } from "express";
import { friend_request } from "../controllers/friendController";

const router = Router();

router.route("/:userId").put(friend_request);

export default router;
