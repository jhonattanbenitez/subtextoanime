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
      className="relative flex min-h-[80vh] w-full overflow-hidden group"
    >
      {/* Imagen de fondo o Skeleton */}
      {isLoading ? (
        <Skeleton className="absolute inset-0 h-full w-full z-0" />
      ) : (
        <div className="absolute inset-0 h-full w-full z-0">
          <Image
            src={blok.image.filename}
            alt={blok.image.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      )}

      {/* Contenido */}
      <div className="relative z-20 flex flex-col justify-end p-8 sm:p-16 lg:p-24 max-w-4xl w-full mt-auto mb-12">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-12 w-40" />
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-white text-6xl sm:text-8xl font-bebas uppercase tracking-wide drop-shadow-xl">
              {blok.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-2xl drop-shadow-md">
              {blok.subtitle}
            </p>
            {blok.cta_link && blok.cta_text && (
              <div className="pt-4">
                <Link
                  href={blok.cta_link.cached_url}
                  className="inline-block px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-300 shadow-lg"
                >
                  {blok.cta_text}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
