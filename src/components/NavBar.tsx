import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full  flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
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

      {/* Links */}
      <div className="flex space-x-6 text-sm font-medium text-gray-700">
        <Link href="/" className="hover:text-black transition-colors">
          Inicio
        </Link>
        <Link href="/articulos" className="hover:text-black transition-colors">
          Artículos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
