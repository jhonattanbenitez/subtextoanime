"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  title: string;
  excerpt?: string;
  image: string;
  slug: string;
  category?: string;
  date?: string;
  className?: string;
}

export default function AnimeCard({
  title,
  excerpt,
  image,
  slug,
  category,
  date,
  className,
}: AnimeCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl bg-card shadow-lg transition-transform hover:-translate-y-1",
        className,
      )}
    >
      {/* Image Container with Overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

        {/* Category Badge */}
        {category && (
          <span className="absolute top-4 left-4 rounded-md bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider shadow-md">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {date && (
          <time className="mb-2 block text-xs text-muted-foreground">
            {date}
          </time>
        )}
        <h3 className="font-bebas text-2xl leading-none tracking-wide text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
