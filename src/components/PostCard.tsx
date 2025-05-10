import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SbPostCardData extends SbBlokData {
  image: {
    filename: string;
    alt: string;
  };
  category: string;
  title: string;
  published_at: string;
  link: {
    cached_url: string;
  };
}

interface PostCardProps {
  blok: SbPostCardData;
}

const PostCard: React.FunctionComponent<PostCardProps> = ({ blok }) => {
  const href = blok.link?.cached_url ? `/${blok.link.cached_url}` : "#";
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl overflow-hidden shadow-lg transition hover:shadow-xl h-full flex flex-col"
      {...storyblokEditable(blok)}
    >
      {/* Imagen superior */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80">
        <Image
          src={blok.image.filename}
          alt={blok.image.alt}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div>
          <span className="text-xs font-semibold uppercase text-pink-600 tracking-wider">
            {blok.category}
          </span>
          <h2 className="mt-2 text-xl font-bold text-gray-900">{blok.title}</h2>
        </div>

        <p className="mt-auto pt-4 text-sm text-gray-500">
          {new Date(blok.published_at).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
