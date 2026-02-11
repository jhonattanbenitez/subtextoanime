"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CommentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, "El comentario debe tener al menos 3 caracteres.")
    .max(500, "El comentario no puede exceder los 500 caracteres."),
});

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

  // 1. Input Validation
  const validatedFields = CommentSchema.safeParse({ text });
  if (!validatedFields.success) {
    return {
      success: false,
      error:
        validatedFields.error.flatten().fieldErrors.text?.[0] ||
        "Invalid input",
    };
  }
  const cleanText = validatedFields.data.text;

  try {
    // 2. Rate Limiting (1 comment per minute)
    const lastComment = await prisma.comment.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    if (lastComment) {
      const timeDiff = Date.now() - new Date(lastComment.createdAt).getTime();
      if (timeDiff < 60000) {
        // 60 seconds
        return {
          success: false,
          error: "Por favor espera 1 minuto antes de comentar de nuevo.",
        };
      }
    }

    await prisma.comment.create({
      data: {
        text: cleanText,
        postId,
        userId: session.user.id,
      },
    });

    revalidatePath(`/${postId}`);
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
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, postId: true }, // get postId for revalidation
    });

    if (!comment) return { success: false, error: "Comment not found" };
    if (comment.userId !== session.user.id)
      return { success: false, error: "Unauthorized" };

    await prisma.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/${comment.postId}`);
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

  // Input Validation
  const validatedFields = CommentSchema.safeParse({ text });
  if (!validatedFields.success) {
    return {
      success: false,
      error:
        validatedFields.error.flatten().fieldErrors.text?.[0] ||
        "Invalid input",
    };
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, postId: true },
    });

    if (!comment) return { success: false, error: "Comment not found" };
    if (comment.userId !== session.user.id)
      return { success: false, error: "Unauthorized" };

    await prisma.comment.update({
      where: { id: commentId },
      data: { text: validatedFields.data.text },
    });

    revalidatePath(`/${comment.postId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating comment:", error);
    return { success: false, error: "Failed to update comment" };
  }
}
