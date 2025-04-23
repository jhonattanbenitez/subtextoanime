"use client"
import { useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { isLoading } = useSessionContext(); 
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading]);

  if (isLoading || !user) {
    return <p className="text-center mt-10">Cargando sesión...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.email}</h1>
      <p>
        Tu UID: <code>{user.id}</code>
      </p>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/");
        }}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
