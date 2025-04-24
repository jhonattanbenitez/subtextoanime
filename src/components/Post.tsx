"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import formatDate from "@/utils/formatDate";
import Script from "next/script";
import React from "react";
import CommentSection from "./CommentSection";
import RichTextRenderer from "./RichTextRenderer";

type CoverImageType = {
  filename: string;
};

type Blok = {
  title: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; 
  cover_image?: CoverImageType;
  published_at: string | null;
  post_uuid: string;
};

type PostProps = {
  blok: Blok;
};

const Post: React.FC<PostProps> = ({ blok }) => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const image = blok.cover_image?.filename ?? "";
  const date = blok.published_at
    ? formatDate(blok.published_at)
    : "Sin fecha de publicación";

  return (
    <article className="w-full max-w-2xl mx-auto px-4 py-8" data-slug={slug}>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blok.title,
            image: [image],
            datePublished: blok.published_at,
            author: {
              "@type": "Person",
              name: "Subtexto Anime",
            },
            description: blok.excerpt,
          }),
        }}
      />

      <h1 className="text-3xl font-bold mb-4">{blok.title}</h1>
      <p className="text-gray-500 mb-4">{date}</p>

      {image && (
        <Image
          src={image}
          alt={blok.title}
          className="w-full h-auto rounded-lg mb-4"
          width={1000}
          height={1000}
          priority
        />
      )}
      <p className="text-gray-700 mb-4">{blok.excerpt}</p>
      <RichTextRenderer content={blok.content} />
      <CommentSection postId={blok.post_uuid} />
    </article>
  );
};

export default Post;
