import "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";

export async function generateStaticParams() {
  return [];
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
  return <StoryblokStory story={pageData?.story} />;
}
