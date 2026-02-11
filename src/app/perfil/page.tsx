"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function PerfilPage() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <p className="p-4 text-center">Cargando perfil...</p>;

  if (!session?.user) {
    return (
      <div className="p-4 text-center mt-20">
        <p className="mb-4 text-lg">No has iniciado sesión.</p>
        <Button onClick={() => signIn()}>Iniciar sesión</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto my-30">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Perfil de Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={100}
                height={100}
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                {session.user.name?.[0] || "U"}
              </div>
            )}
          </div>
          <div className="text-center space-y-2">
            <p>
              <strong>Nombre:</strong> {session.user.name || "No especificado"}
            </p>
            <p>
              <strong>Email:</strong> {session.user.email}
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={() => signOut()}
            className="w-full"
          >
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
