import { Router } from "express";
import passport from "passport";
import postRouter from "./posts";
import userRouter from "./users";
import authRouter from "./auth";
import friendRouter from "./friends";
import { user_search } from "../controllers/userController";

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
router.get(
  "/search-users",
  passport.authenticate("jwt", { session: false }),
  user_search
);

router.use("/auth", authRouter);

export default router;
