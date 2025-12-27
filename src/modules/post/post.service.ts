import type { Request, Response } from "express";
import type { post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (data: Omit<post, "id" | "createdAt" | "updatedAt">) => {
    // Logic to create a new post
    const result = await prisma.post.create({
        data
    })
    return result;
}

const getAllPosts = async (req: Request, res: Response) => {
    const result = await prisma.post.findMany();
    return result;
}

export const PostService = {
    createPost,
    getAllPosts,
};