"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    } else {
      setLoading(false); // detener loading si no hay usuario
    }
  }, [user]);

  const fetchOrCreateProfile = async () => {
    setLoading(true);
    // eslint-disable-next-line prefer-const
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (error || !data) {
      const fullName =
        user?.user_metadata?.full_name ??
        user?.user_metadata?.name ??
        "Usuario Anónimo";

      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert([{ id: user?.id, full_name: fullName }])
        .select()
        .single();

      if (insertError) {
        console.error("Error al crear el perfil:", insertError);
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

  if (loading) return <p className="p-4">Cargando perfil...</p>;

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4 text-lg">No has iniciado sesión.</p>
        <Link href="/login">
          <Button>Iniciar sesión</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto max-h-screen my-30">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Perfil de Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Nombre:</strong> {profile?.full_name ?? "No especificado"}
          </p>
          <Button variant="destructive" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
