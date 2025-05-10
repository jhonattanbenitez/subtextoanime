import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import React from "react";
import PostCard from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";

interface SbPostCardData extends SbBlokData {
  image: {
    filename: string;
    alt: string;
  };
  category: string;
  title: string;
  published_at: string;
  component: "post_card";
  link: {
    cached_url: string;
  };
}

interface SbFeaturedPostsData extends SbBlokData {
  title: string;
  Posts: SbPostCardData[];
  link: {
    cached_url: string;
  };
}

interface FeaturedPostsProps {
  blok: SbFeaturedPostsData;
}

const FeaturedPosts: React.FunctionComponent<FeaturedPostsProps> = ({
  blok,
}) => {
  const isLoading = !blok?.Posts || blok.Posts.length === 0;

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full py-16 px-6 max-w-7xl mx-auto"
    >
      {blok.title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{blok.title}</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            ))
          : blok.Posts.map((post) => <PostCard blok={post} key={post._uid} />)}
      </div>
    </section>
  );
};

export default FeaturedPosts;
