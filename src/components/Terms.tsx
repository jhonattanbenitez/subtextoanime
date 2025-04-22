"use client";
import { useParams } from "next/navigation";

import formatDate from "@/utils/formatDate";
import { ISbRichtext, RichTextResolver } from "@storyblok/react";

import React from "react";


type Blok = {
  title: string;
  content: ISbRichtext;
  published_at: string | null;
};

type TermsProps = {
  blok: Blok;
};

/**
 * Terms component to display the terms and conditions page.
 * @param {TermsProps} props - The props for the Terms component.
 * @returns {JSX.Element} The rendered Terms component.
 */

const Terms: React.FC<TermsProps> = ({ blok }) => {
  const { slug } = useParams();
  const date = blok.published_at
    ? formatDate(blok.published_at)
    : "Sin fecha de publicación";

  const renderer = new RichTextResolver();
  const html = renderer.render(blok.content);

  return (
    <article className="w-full max-w-2xl mx-auto px-4 py-8" data-slug={slug}>
      <h1 className="text-3xl font-bold mb-4">{blok.title}</h1>
      <p className="text-gray-500 mb-4">{date}</p>
         <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
};

export default Terms;
