import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import PostCard from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLatestPosts } from "@/utils/fetchLatestPosts";

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

interface SbLatestPostsData extends SbBlokData {
  title: string;
  component: "latest_posts";
  Posts?: SbPostCardData[];
}

interface LatestPostsProps {
  blok: SbLatestPostsData;
}

const LatestPosts = async ({ blok }: LatestPostsProps) => {
  const latest = await fetchLatestPosts("published");

  const posts =
    latest?.stories.map((story) => {
      // Extract the cover image from the correct location in the response
      const coverImage = story.content.cover_image;

      return {
        _uid: story.uuid,
        // Map the image data to match PostCard's expected structure
        image: {
          filename: coverImage?.filename || "",
          alt: coverImage?.alt || story.content.title || "Article image",
        },
        category: "Opinión",
        title: story.content.title,
        published_at: story.published_at,
        component: "post_card",
        link: {
          cached_url: story.full_slug,
        },
      };
    }) || [];

  const isLoading = posts.length === 0;

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full pb-16 px-6 max-w-7xl mx-auto"
    >
      {blok.title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {blok.title}
        </h2>
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
          : posts.map((post) => <PostCard blok={post} key={post._uid} />)}
      </div>
    </section>
  );
};

export default LatestPosts;
