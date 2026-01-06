import { Request, Response } from "express";
import { CommentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await CommentService.createComment(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: "Comment creation failed", details: err });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  try {
   const {commentId} = req.params
    const result = await CommentService.getCommentById(commentId as string);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "Comment Fetch failed", details: err });
  }
};

export const commentController = {
  createComment,
  getCommentById
};
