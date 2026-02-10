import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLatestPosts } from "@/utils/fetchLatestPosts";
import AnimeCard from "./AnimeCard";
import ScrollReveal from "./ScrollReveal";

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
        image: coverImage?.filename || "",
        title: story.content.title,
        slug: story.full_slug,
        category: "Opinión", // Could be dynamic if story has category field
        date: new Date(story.published_at).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
    }) || [];

  const isLoading = posts.length === 0;

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full pb-16 px-6 max-w-7xl mx-auto"
    >
      {blok.title && (
        <ScrollReveal>
          <h2 className="text-4xl font-bebas text-foreground mb-8 text-center uppercase tracking-wider">
            {blok.title}
          </h2>
        </ScrollReveal>
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
          : posts.map((post, index) => (
              <ScrollReveal key={post._uid} delay={index * 0.1}>
                <AnimeCard
                  title={post.title}
                  image={post.image}
                  slug={post.slug}
                  category={post.category}
                  date={post.date}
                />
              </ScrollReveal>
            ))}
      </div>
    </section>
  );
};

export default LatestPosts;
