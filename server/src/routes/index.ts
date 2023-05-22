import { Router } from "express";
import passport from "passport";
import postRouter from "./posts";
import userRouter from "./users";
import authRouter from "./auth";
import { user_search } from "../controllers/userController";
import { friend_request } from "../controllers/friendController";

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

router.put(
  "/friends/:userId",
  passport.authenticate("jwt", { session: false }),
  friend_request
);
router.get(
  "/search-users/:query",
  passport.authenticate("jwt", { session: false }),
  user_search
);

export default router;
