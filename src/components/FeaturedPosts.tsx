import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import React from "react";
import PostCard from "./PostCard"; 
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
  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full py-16 px-6 max-w-7xl mx-auto"
    >
      
         {blok.title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {blok.title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blok.Posts?.map((post) => (
            <PostCard blok={post} key={post._uid} />
          ))}
        </div>
    </section>
  );
};

export default FeaturedPosts;
