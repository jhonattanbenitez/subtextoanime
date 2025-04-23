"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

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
      alert("Debes iniciar sesión para comentar.");
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
      alert("Error al comentar: " + error.message);
    } else {
      setComment("");
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
              {c.profiles?.full_name || "Usuario anónimo"} comentó el{" "}
              {new Date(c.created_at).toLocaleString()}
            </p>

            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
