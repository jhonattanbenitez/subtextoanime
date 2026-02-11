"use client";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Cargando sesión...</p>;
  }

  if (!session?.user) return null;

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido, {session.user.name}
      </h1>
      <p>
        Email: <code>{session.user.email}</code>
      </p>
      <button
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
