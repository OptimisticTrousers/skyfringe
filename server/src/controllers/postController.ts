import { Request, Response, NextFunction } from "express";
import Post from "../models/post";

export const post_list = (req: Request, res: Response, next: NextFunction) => {
  Post.find({})
    .sort({ createdAt: 1 })
    .populate("author")
    .exec()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      next(err);
    });
};

export const post_create = []

export const post_detail = (req: Request, res: Response, next: NextFunction) => {
  Post.findById(req.params.postId)
    .populate("author")
    .exec()
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      next(err);
    });
};

export const post_update = []

export const post_delete = (req: Request, res: Response, next: NextFunction) => {

}