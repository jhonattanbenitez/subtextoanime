import "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || ["home"];
  const story = await fetchStory("draft", slug);

  if (!story?.story) return {};

  const { name, content } = story.story;
  interface StoryContent {
    excerpt?: string;
    cover_image?: {
      filename: string;
    };
  }
  const storyContent = content as StoryContent;
  const description =
    storyContent.excerpt ||
    "Descubre el mundo del anime más allá de los subtítulos.";
  const image = storyContent.cover_image?.filename || "/open-graph.jpg";

  return {
    title: `${name} | Subtexto Anime`,
    description,
    openGraph: {
      title: `${name} | Subtexto Anime`,
      description,
      url: `https://subtextoanime.com/${slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Subtexto Anime`,
      description,
      images: [image],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const pageData = await fetchStory("draft", resolvedParams.slug);

  if (pageData?.story?.content) {
    pageData.story.content.post_uuid = pageData.story.uuid;
  }

  return <StoryblokStory story={pageData?.story} />;
}
