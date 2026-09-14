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
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <p className="eyebrow text-coral">Journal</p>
        <h1 className="display-xl mt-6 max-w-3xl font-display font-extrabold">
          Notes from the floor.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Things we have learned making shows, running campaigns and arguing
          about edits. Written by the people who were actually there.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Nothing published yet
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
              {isSanityConfigured
                ? "Write the first post in the studio and it will appear here within a minute."
                : "Connect the CMS and the first post will appear here."}
            </p>
            <Link
              href="/studio"
              className="mt-6 inline-block font-medium text-coral hover:underline"
            >
              Open the studio
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const img = post.coverImage
                ? urlFor(post.coverImage)?.width(900).height(560).fit("crop").url()
                : null;
              return (
                <Link
                  key={post._id}
                  href={`/journal/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-navy-900/10"
                >
                  {img && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <Image
                        src={img}
                        alt={post.coverImage?.alt ?? post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    <h2 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-coral">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    {post.author && (
                      <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground/70">
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
