import { Router } from "express";
import postRouter from "./posts";
import userRouter from "./users";
import authRouter from "./auth";

const router = Router();

router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
