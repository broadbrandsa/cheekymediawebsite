import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Cta } from "@/components/sections/cta";
import { getPosts } from "@/lib/content";
import { urlFor } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the Cheeky Media team on production, brand integration and the business of making content in South Africa.",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function JournalPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="shell pb-16 pt-16 sm:pt-24">
        <p className="label-pill label-mono text-muted-foreground"><span className="size-1.5 rounded-full bg-coral" />Journal</p>
        <h1 className="type-h1 mt-8 max-w-[14ch]">
          Notes from the <em className="font-display italic text-coral">floor</em>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Things we have learned making shows, running campaigns and arguing
          about edits. Written by the people who were actually there.
        </p>
      </section>

      <section className="shell pb-24">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-12 text-center">
            <h2 className="type-h4">
              Nothing published yet
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
              {isSanityConfigured
                ? "Write the first post in the studio and it will appear here within a minute."
                : "Connect the CMS and the first post will appear here."}
            </p>
            <Link
              href="/studio"
              className="mt-6 inline-block font-medium text-coral-text hover:underline"
            >
              Open the studio
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const img = post.coverImage
                ? urlFor(post.coverImage)?.width(900).height(560).fit("crop").url()
                : null;
              return (
                <Link
                  key={post._id}
                  href={`/journal/${post.slug}`}
                  className="group flex flex-col"
                >
                  {img && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary">
                      <Image
                        src={img}
                        alt={post.coverImage?.alt ?? post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="mt-5 flex flex-1 flex-col">
                    <time
                      dateTime={post.publishedAt}
                      className="label-mono text-muted-foreground"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    <h2 className="type-h4 mt-3 transition-colors group-hover:text-coral">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2.5 line-clamp-3 leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    {post.author && (
                      <p className="label-mono mt-4 text-muted-foreground/70">
                        {post.author}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Cta />
    </>
  );
}
