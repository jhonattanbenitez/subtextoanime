import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import React from "react";

interface SbTeaserData extends SbBlokData {
  headline: string;
}

interface TeaserProps {
  blok: SbTeaserData;
}

const Teaser: React.FunctionComponent<TeaserProps> = ({ blok }) => {
  return (
    <section
      {...storyblokEditable(blok)}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              {blok.headline}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teaser;