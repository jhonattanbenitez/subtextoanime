import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import React from "react";

interface SbHeroData extends SbBlokData {
  title: string;
  subtitle: string;
  image: {
    filename: string;
    alt: string;
  };
  cta_link: string;
  cta_text: string;
}

interface HeroProps {
  blok: SbHeroData;
}

const Hero: React.FunctionComponent<HeroProps> = ({ blok }) => {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative flex  min-h-screen w-full"
    >
      {/* Imagen de fondo */}
      <Image
        src={blok.image.filename}
        alt={blok.image.alt}
        className="absolute inset-0 h-full w-full object-cover z-0"
        width={1000}
        height={1000}
      />


      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Contenido */}
      <div className="relative z-20 px-6 max-w-2xl py-32 sm:py-48 lg:py-56">
        <h1 className="text-white text-4xl font-bold tracking-tight sm:text-6xl">
          {blok.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/80">{blok.subtitle}</p>
        {blok.cta_link && blok.cta_text && (
          <a
            href={blok.cta_link}
            className="mt-10 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-gray-200 transition"
          >
            {blok.cta_text}
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
