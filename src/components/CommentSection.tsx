"use client";

import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  createComment,
  getComments,
  deleteComment,
  updateComment,
} from "@/actions/comments";
import Image from "next/image";

interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
  user: {
    name: string | null;
    image: string | null;
  };
}

export default function CommentSection({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadComments = async () => {
    const result = await getComments(postId);
    if (result.success && result.data) {
      setComments(result.data as unknown as Comment[]);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleSubmit = () => {
    if (!session) {
      toast.error("Debes iniciar sesión para comentar");
      return;
    }

    startTransition(async () => {
      const result = await createComment(postId, newComment);
      if (result.success) {
        setNewComment("");
        await loadComments();
        toast.success("Comentario publicado");
      } else {
        toast.error(result.error || "Error al comentar");
      }
    });
  };

  const handleUpdate = () => {
    if (!editingComment) return;

    startTransition(async () => {
      const result = await updateComment(editingComment, editedText);
      if (result.success) {
        setEditingComment(null);
        setEditedText("");
        await loadComments();
        toast.success("Comentario actualizado");
      } else {
        toast.error(result.error || "Error al actualizar");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Estás seguro de borrar este comentario?")) return;

    startTransition(async () => {
      const result = await deleteComment(id);
      if (result.success) {
        await loadComments();
        toast.success("Comentario borrado");
      } else {
        toast.error(result.error || "Error al borrar");
      }
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold font-bebas tracking-wide">
        Comentarios
      </h2>

      {/* Input Area */}
      <div className="space-y-3">
        <textarea
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          rows={3}
          placeholder={
            session ? "Escribe tu opinión..." : "Inicia sesión para comentar"
          }
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!session || isPending}
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!session || isPending || !newComment.trim()}
            className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Publicando..." : "Enviar Comentario"}
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex-shrink-0">
              {c.user.image ? (
                <Image
                  src={c.user.image}
                  alt={c.user.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">
                  {c.user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="flex-grow space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">
                  {c.user.name || "Usuario Anónimo"}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>

              {editingComment === c.id ? (
                <div className="space-y-2 mt-2">
                  <textarea
                    className="w-full p-2 border rounded-md text-sm"
                    rows={2}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={handleUpdate}
                      className="text-green-600 font-bold hover:underline"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingComment(null)}
                      className="text-gray-500 hover:underline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {c.text}
                </p>
              )}

              {/* Actions */}
              {session?.user?.id === c.userId && editingComment !== c.id && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setEditingComment(c.id);
                      setEditedText(c.text);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-xs text-red-600 hover:text-red-800 font-medium"
                  >
                    Borrar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-center text-gray-400 italic py-4">
            Sé el primero en comentar.
          </p>
        )}
      </div>
    </div>
  );
}
