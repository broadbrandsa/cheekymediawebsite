import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { Cta } from "@/components/sections/cta";
import { getPost } from "@/lib/content";
import { sanityClient, urlFor } from "@/sanity/client";
import { postSlugsQuery } from "@/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!sanityClient) return [];
  try {
    const slugs = await sanityClient.fetch<string[]>(postSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverImage
      ? { images: [urlFor(post.coverImage)?.width(1200).url() ?? ""] }
      : undefined,
  };
}

const components: PortableTextComponents = {
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
            className="w-full rounded-xl"
          />
          {value.alt && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-display text-xl font-bold tracking-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-coral pl-6 font-display text-xl italic">
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
        className="text-coral underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

export default async function JournalPostPage({
  params,
}: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cover = post.coverImage
    ? urlFor(post.coverImage)?.width(1800).height(1000).fit("crop").url()
    : null;

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-coral"
        >
          <ArrowLeft className="size-4" />
          All posts
        </Link>

        <time
          dateTime={post.publishedAt}
          className="mt-8 block text-xs uppercase tracking-wider text-muted-foreground"
        >
          {new Date(post.publishedAt).toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>

        <h1 className="display-lg mt-4 font-display font-extrabold">
          {post.title}
        </h1>

        {post.author && (
          <p className="mt-4 text-sm text-muted-foreground">
            By {post.author}
          </p>
        )}

        {cover && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
            <Image
              src={cover}
              alt={post.coverImage?.alt ?? post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {post.body && (
          <div className="mt-10">
            <PortableText value={post.body} components={components} />
          </div>
        )}
      </article>

      <Cta />
    </>
  );
}
