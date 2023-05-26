import { Router } from "express";
import passport from "passport";
import postRouter from "./posts";
import userRouter from "./users";
import chatRouter from "./chat";
import authRouter from "./auth";
import { user_search } from "../controllers/userController";
import { friend_request } from "../controllers/friendController";
import {
  send_accepted_request_notification,
  send_outgoing_request_notification,
  send_rejected_outgoing_notification,
} from "../middleware/notifications";

const router = Router();

router.use(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postRouter
);
router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

router.use("/auth", authRouter);

router.use(
  "/chat",
  passport.authenticate("jwt", { session: false }),
  chatRouter
);

router.put(
  "/friends/:userId",
  passport.authenticate("jwt", { session: false }),
  send_accepted_request_notification,
  send_rejected_outgoing_notification,
  send_outgoing_request_notification,
  friend_request
);
router.get(
  "/search-users/:query",
  passport.authenticate("jwt", { session: false }),
  user_search
);

export default router;
