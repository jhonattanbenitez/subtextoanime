"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: comments };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { success: false, error: "Failed to fetch comments" };
  }
}

export async function createComment(postId: string, text: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  if (!text.trim()) {
    return { success: false, error: "Comment cannot be empty" };
  }

  try {
    await prisma.comment.create({
      data: {
        text,
        postId,
        userId: session.user.id,
      },
    });

    revalidatePath(`/${postId}`); // Revalidate the page (or specifically the comments)
    return { success: true };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, error: "Failed to create comment" };
  }
}

export async function deleteComment(commentId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Verify ownership
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (!comment) return { success: false, error: "Comment not found" };
    if (comment.userId !== session.user.id)
      return { success: false, error: "Unauthorized" };

    await prisma.comment.delete({
      where: { id: commentId },
    });

    // We might need to pass the path to revalidate, or just let the client refresh
    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { success: false, error: "Failed to delete comment" };
  }
}

export async function updateComment(commentId: string, text: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (!comment) return { success: false, error: "Comment not found" };
    if (comment.userId !== session.user.id)
      return { success: false, error: "Unauthorized" };

    await prisma.comment.update({
      where: { id: commentId },
      data: { text },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating comment:", error);
    return { success: false, error: "Failed to update comment" };
  }
}
