import type { Request, Response } from "express";
import { PostService } from "./post.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { UserRole } from "../../middleware/auth.middleware";

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

const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Post Id is required");
    }

    const result = await PostService.getPostById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "failed to fetch posts", details: err });
  }
};

const getMyPosts = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorized!");
    }

    console.log("User data: ", user);

    const result = await PostService.getMyPosts(user.id);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Post fetched failed",
      details: e,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const { postId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN
    console.log(user)

    const result = await PostService.updatePost(
      postId as string,
      req.body,
      user.id, isAdmin
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Post update failed",
      details: e,
    });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
};
