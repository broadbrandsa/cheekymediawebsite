import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

import { urlFor } from "@/sanity/client";

export const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlFor(value)?.width(1400).url();
      if (!url) return null;
      return (
        <figure className="my-10">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1400}
            height={900}
            className="w-full rounded-3xl"
          />
          {value.alt && (
            <figcaption className="label-mono mt-3 text-center text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="type-h3 mt-12">{children}</h2>,
    h3: ({ children }) => <h3 className="type-h4 mt-10">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-coral pl-6 font-display text-2xl italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-muted-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-coral-text underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={portableComponents} />;
}
