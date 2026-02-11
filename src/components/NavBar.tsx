"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut, signIn } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={100}
            className="sm:w-50 w-24"
            priority
          />
        </Link>
      </div>

      {/* Links + User Menu */}
      <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
        <Link
          href="/"
          className="link-hover hover:text-primary transition-colors uppercase tracking-widest"
        >
          Inicio
        </Link>
        <Link
          href="/articulos"
          className="link-hover hover:text-primary transition-colors uppercase tracking-widest"
        >
          Artículos
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors"
            >
              {session?.user?.name
                ? session.user.name.split(" ")[0]
                : "Usuario"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {session ? (
              <>
                <DropdownMenuItem onClick={() => router.push("/perfil")}>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Cerrar sesión
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => signIn()}>
                Iniciar sesión
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
