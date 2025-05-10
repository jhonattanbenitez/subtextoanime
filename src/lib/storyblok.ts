import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import Page from "@/components/Page";
import Teaser from "@/components/Teaser";
import Hero from "@/components/Hero";
import FeaturedPosts from "@/components/FeaturedPosts";
import PostCard from "@/components/PostCard";
import Post from "@/components/Post";
import Terms from "@/components/Terms";
import AuthForm from "@/components/AuthForm";
import LatestPosts from "@/components/LatestPosts";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    teaser: Teaser,
    hero: Hero,
    postCard: PostCard,
    featured_posts: FeaturedPosts,
    post: Post,
    terms: Terms,
    auth_form: AuthForm,
    latest_posts: LatestPosts,
  },
});
