import  { Router } from "express";
import { PostController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";

const router: Router = Router();

router.get("/myposts", auth(UserRole.USER, UserRole.ADMIN),PostController.getMyPosts);
router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.post("/", auth(UserRole.USER), PostController.createPost);
router.patch("/:postId", auth(UserRole.ADMIN, UserRole.USER), PostController.updatePost)
router.delete("/:postId", auth(UserRole.ADMIN, UserRole.USER), PostController.deletePost)

export const postRouter = router;