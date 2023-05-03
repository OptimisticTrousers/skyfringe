import { Router } from "express";
import passport from "passport";
import postRouter from "./posts";
import userRouter from "./users";
import authRouter from "./auth";
import friendRouter from "./friends";

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
router.use(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  friendRouter
);
router.use("/auth", authRouter);

export default router;
