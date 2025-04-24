"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { toast } from "sonner";


interface Comment {
  id: number;
  text: string;
  created_at: string;
  user_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profiles: any;
}


export default function CommentSection({ postId }: { postId: string }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editedText, setEditedText] = useState("");

  const fetchComments = useCallback(async () => {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        text,
        created_at,
        user_id,
        profiles!user_id (full_name)
      `
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setComments(data as Comment[]);
    }
  }, [supabase, postId]);

  useEffect(() => {
    if (postId) fetchComments();
  }, [fetchComments, postId]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión para comentar");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      {
        user_id: user.id,
        text: comment,
        post_id: postId,
      },
    ]);

    if (error) {
      toast.error("Error al comentar: " + error.message);
    } else {
      setComment("");
      fetchComments();
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment);
    setEditedText(comment.text);
  };

  const handleUpdate = async () => {
    if (!editingComment) return;

    const { error } = await supabase
      .from("comments")
      .update({ text: editedText })
      .eq("id", editingComment.id);

    if (error) {
      toast.error("Error al actualizar comentario: " + error.message);
    } else {
      toast.success("Comentario actualizado");
      setEditingComment(null);
      setEditedText("");
      fetchComments();
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);

    if (error) {
      toast.error("Error al borrar comentario: " + error.message);
    } else {
      toast.success("Comentario borrado");
      fetchComments();
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Comentarios</h2>

      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows={3}
        placeholder="Escribe tu comentario..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enviar
      </button>

      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="p-4 bg-white rounded shadow border">
            <p className="text-sm text-gray-500">
              {c.profiles?.full_name ?? "Usuario anónimo"} comentó el{" "}
              {new Date(c.created_at).toLocaleString()}
            </p>

            {editingComment?.id === c.id ? (
              <div>
                <label htmlFor="edit-comment" className="sr-only">Editar comentario</label>
                <textarea
                  id="edit-comment"
                  className="w-full p-2 border rounded mt-2"
                  rows={3}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  placeholder="Editar comentario..."
                  aria-label="Editar comentario"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleUpdate}
                    className="text-green-600 font-medium"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setEditingComment(null);
                      setEditedText("");
                    }}
                    className="text-gray-500"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2">{c.text}</p>
            )}

            {user?.id === c.user_id && editingComment?.id !== c.id && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Borrar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}