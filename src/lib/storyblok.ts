import { storyblokInit } from "@storyblok/react/rsc";

import Page from "@/components/Page";
import Teaser from "@/components/Teaser";
import Hero from "@/components/Hero";
import FeaturedPosts from "@/components/FeaturedPosts";
import PostCard from "@/components/PostCard";
import Post from "@/components/Post";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  components: {
    page: Page,
    teaser: Teaser,
    hero: Hero,
    postCard: PostCard,
    featured_posts: FeaturedPosts,
    post: Post
  },
});
