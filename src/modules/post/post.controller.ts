import type { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: "post creation failed", details: err });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getAllPosts(req, res);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "failed to fetch posts", details: err });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
};
