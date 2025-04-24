import React from "react";
import {
  richTextResolver,
  StoryblokRichTextOptions,
  StoryblokRichTextNode,
} from "@storyblok/richtext";
import { convertAttributesInElement } from "@storyblok/react";

type RichTextRendererProps = {
  content: StoryblokRichTextNode<React.ReactElement>;
};

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const options: StoryblokRichTextOptions<React.ReactElement> = {
    renderFn: React.createElement,
    keyedResolvers: true,
  };

  const rawHtml = richTextResolver(options).render(content);
  const formattedHtml = convertAttributesInElement(rawHtml);

  return <div className="prose prose-neutral max-w-none">{formattedHtml}</div>;
};

export default RichTextRenderer;
