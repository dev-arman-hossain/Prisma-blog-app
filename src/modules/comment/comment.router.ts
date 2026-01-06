import express from "express";
import { commentController } from "./comment.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";

const router = express.Router();

router.post('/',auth(UserRole.USER, UserRole.ADMIN),commentController.createComment)


export const commentRouter = router;