type StoryblokResponse = {
  story: {
    name: string;
    content: any;
    slug: string;
    created_at: string;
    published_at: string;
    id: number;
    uuid: string;
  };
};

export const fetchStory = async (
  version: "draft" | "published",
  slug?: string[],
): Promise<StoryblokResponse | null> => {
  const correctSlug = `/${slug ? slug.join("/") : "home"}`;
  const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;

  if (!token) {
    console.error("❌ Storyblok API Token is missing");
    return null;
  }

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories${correctSlug}?version=${version}&token=${token}`,
      {
        next: {
          tags: ["cms"],
          revalidate: version === "published" ? 3600 : 0,
        },
      },
    );

    if (!res.ok) {
      console.error(`❌ Storyblok fetch failed: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data as StoryblokResponse;
  } catch (err) {
    console.error("❌ Failed to fetch from Storyblok:", err);
    return null;
  }
};
