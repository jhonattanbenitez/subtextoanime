"use client";

import { useEffect } from "react";
import { getStoryblokApi } from "@/lib/storyblok";

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    getStoryblokApi();
  }, []);

  return children;
}
