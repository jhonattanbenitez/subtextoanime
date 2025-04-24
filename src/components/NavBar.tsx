"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabaseClient"; // Ajusta si está en otra ruta
import { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
        <Link href="/" className="hover:text-black transition-colors">
          Inicio
        </Link>
        <Link href="/articulos" className="hover:text-black transition-colors">
          Artículos
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm">
              Usuario
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {user ? (
              <>
                <DropdownMenuItem onClick={() => router.push("/perfil")}>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Cerrar sesión
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => router.push("/login")}>
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
