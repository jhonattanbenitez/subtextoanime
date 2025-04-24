"use client";

import { useEffect, useState } from "react";
import { fetchStories } from "@/utils/fetchStories";
import Link from "next/link";
import { Story } from "@/utils/types";
import Image from "next/image";
import formatDate from "@/utils/formatDate";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostsPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStories() {
      setIsLoading(true);
      const storiesData = await fetchStories("published");
      if (storiesData) {
        setStories(storiesData.stories);
      }
      setIsLoading(false);
    }
    getStories();
  }, []);

  // Extracted content rendering logic
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-sm shadow-lg flex flex-col h-full"
              >
                <div className="relative w-full mb-4 flex-shrink-0">
                  <Skeleton className="w-full h-[225px] rounded-sm" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex-grow"></div>
                <div className="flex justify-end">
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
        </div>
      );
    }

    if (!stories.length) {
      return <p className="text-red-500 text-center">No posts found</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => {
          const { content, slug } = story;
          const imageUrl = story.content.cover_image?.filename;
          const title = content.title;
          const intro = content.excerpt;
          const date = story.published_at || story.created_at;

          return (
            <div
              key={story.id}
              className="p-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-100 hover:bg-gray-900 group flex flex-col h-full"
            >
              <Link
                href={`/articulos/${slug}`}
                className="flex flex-col flex-grow"
              >
                {/* Image */}
                {imageUrl && (
                  <div className="relative w-full mb-4 flex-shrink-0">
                    <Image
                      src={`${imageUrl}/m/800x450/filters:format(webp):quality(80)/`}
                      alt={title}
                      width={800}
                      height={450}
                      priority={index === 0}
                      className="object-cover rounded-sm"
                    />
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 uppercase group-hover:text-white">
                  {title}
                </h2>

                {/* Intro */}
                <p className="text-gray-900 text-sm mb-2 leading-5 group-hover:text-gray-200">
                  {intro}
                </p>

                <div className="flex-grow"></div>

                {/* Date */}
                <div className="flex justify-end">
                  <p className="text-gray-900 text-xs group-hover:text-gray-300">
                    {formatDate(date)}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="max-w-full">
      {/* Header Section */}
      <div className="relative w-full h-[60vh] mb-8">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/articulos.png')" }}
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black overlay" />

        {/* Contenido centrado */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#ff2d95] uppercase text-center">
            Artículos
          </h1>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto p-4 bg-white">{renderContent()}</div>
    </section>
  );
}
