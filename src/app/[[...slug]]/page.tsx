import "@/lib/storyblok"; // 👈 fuerza que se registre el init
import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/utils/fetchStory";

export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const pageData = await fetchStory("draft", params.slug);
  return <StoryblokStory story={pageData?.story} />;
}
