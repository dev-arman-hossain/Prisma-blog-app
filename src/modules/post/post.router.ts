import express from "express";
import { PostController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", auth(UserRole.USER), PostController.createPost);
router.get("/", PostController.getAllPosts);

export const postRouter = router;
