import express from "express";
const router = express.Router();
import postRouter from "./posts";

// routes

router.use("/posts", postRouter)

export default router;