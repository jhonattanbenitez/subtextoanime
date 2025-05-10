import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SbHeroData extends SbBlokData {
  title: string;
  subtitle: string;
  image: {
    filename: string;
    alt: string;
  };
  cta_link: {
    cached_url: string;
  };
  cta_text: string;
}

interface HeroProps {
  blok: SbHeroData;
}

const Hero: React.FunctionComponent<HeroProps> = ({ blok }) => {
  const isLoading = !blok?.title || !blok?.image?.filename;

  return (
    <section
      {...storyblokEditable(blok)}
      className="relative flex min-h-screen w-full"
    >
      {/* Imagen de fondo o Skeleton */}
      {isLoading ? (
        <Skeleton className="absolute inset-0 h-full w-full z-0" />
      ) : (
        <Image
          src={blok.image.filename}
          alt={blok.image.alt}
          className="absolute inset-0 h-full w-full object-cover z-0"
          width={1000}
          height={1000}
        />
      )}

      {/* Contenido */}
      <div className="relative z-20 p-32 max-w-2xl sm:py-48 lg:py-56 space-y-6">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-40" />
          </>
        ) : (
          <>
            <h1 className="text-white text-4xl font-bold tracking-tight sm:text-6xl">
              {blok.title}
            </h1>
            <p className="text-lg leading-8 text-white/80">{blok.subtitle}</p>
            {blok.cta_link && blok.cta_text && (
              <Link
                href={blok.cta_link.cached_url}
                className="inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-gray-200 transition"
              >
                {blok.cta_text}
              </Link>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
