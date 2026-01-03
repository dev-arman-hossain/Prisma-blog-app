import type { Request, Response } from "express";
import type { post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { postWhereInput } from "../../../generated/prisma/models";

const createPost = async (
  data: Omit<post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

const getAllPosts = async ({
  search,
  tags,
  isFeatured,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
}) => {
  const andConditions: postWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search,
          },
        },
      ],
    });
  }

  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured,
    });
  }

  const result = await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
};
