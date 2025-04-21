import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#0F0F0F] text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        {/* Logo o nombre */}
        <div className="mb-4 sm:mb-0 font-semibold text-gray-800">
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

        {/* Enlaces */}
        <div className="flex space-x-6 text-slate-200">
          <Link href="/sobre-nosotros" className="hover:text-white transition">
            Sobre nosotros
          </Link>
          <Link href="/contacto" className="hover:text-white transition">
            Contacto
          </Link>
          <Link href="/terminos" className="hover:text-white transition">
            Términos
          </Link>
        </div>
      </div>

      {/* Línea de derechos */}
      <div className="text-center text-xs text-gray-400 pb-4">
        © {new Date().getFullYear()} Anime. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
