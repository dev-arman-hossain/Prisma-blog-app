import type { Request, Response } from "express";
import { PostService } from "./post.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await PostService.createPost(req.body, user.id);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: "post creation failed", details: err });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query
    );

    const result = await PostService.getAllPosts({
      search: searchString,
      tags,
      isFeatured,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "failed to fetch posts", details: err });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
};
