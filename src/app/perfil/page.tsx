"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

interface Profile {
  id: string;
  full_name?: string;
  created_at?: string;
}

export default function PerfilPage() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrCreateProfile();
    }
  }, [user]);

  const fetchOrCreateProfile = async () => {
    setLoading(true);

    // Try to get the profile
    // eslint-disable-next-line prefer-const
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (error || !data) {
      console.log("Profile not found, creating one...");

      // Get the name from user metadata (from Google auth)
      const fullName =
        user?.user_metadata?.full_name ??
        user?.user_metadata?.name ??
        "Anonymous User";

      // Create a profile
      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert([{ id: user?.id, full_name: fullName }])
        .select()
        .single();

      if (insertError) {
        console.error("Error creating profile:", insertError);
      } else {
        data = newProfile;
      }
    }

    setProfile(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // For debugging - remove in production
  useEffect(() => {
    if (user) {
      console.log("User metadata:", user.user_metadata);
    }
  }, [user]);

  if (!user) return <p>No estás logueado.</p>;
  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Perfil del Usuario</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Nombre:</strong> {profile?.full_name || "No especificado"}
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
