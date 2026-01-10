import express from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { commentRouter } from "./modules/comment/comment.router";
import { PostController } from "./modules/post/post.controller";
import { UserRole } from "./middleware/auth.middleware";
dotenv.config();

const app = express();
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.BETTER_AUTH_URL || "http://localhost:4000",
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;