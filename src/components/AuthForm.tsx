"use client";

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          onClick={handleLogin}
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={handleSignUp}
          className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
        >
          Registrarse
        </button>
      </div>
      <div className="text-center text-gray-400">o</div>
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
      >
        Iniciar con Google
      </button>
    </div>
  );
}
