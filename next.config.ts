import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["a.storyblok.com"], // Add Storyblok domain
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
};

export default nextConfig;
