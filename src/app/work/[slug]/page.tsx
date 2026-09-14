import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Cta } from "@/components/sections/cta";
import { WorkCard } from "@/components/work-card";
import { work, workBySlug } from "@/content/work";
import { toCardItem } from "@/lib/content";
import { getProject } from "@/lib/content";
import { urlFor } from "@/sanity/client";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) return { title: "Work" };
  return {
    title: item.title,
    description: item.summary,
    openGraph: { images: [item.image] },
  };
}

export default async function WorkDetailPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;

  const cms = await getProject(slug);
  const stat = workBySlug(slug);
  if (!cms && !stat) notFound();

  const title = cms?.title ?? stat!.title;
  const kicker = cms?.kicker ?? stat?.kicker;
  const categories = cms?.categories ?? stat!.categories;
  const client = cms?.client ?? stat?.client;
  const summary = cms?.summary ?? stat!.summary;
  const image =
    (cms &&
      urlFor(cms.coverImage)?.width(1800).height(1000).fit("crop").url()) ??
    stat!.image;
  const body = stat?.body ?? [];

  const related = work
    .filter(
      (w) => w.slug !== slug && w.categories.some((c) => categories.includes(c)),
    )
    .slice(0, 3)
    .map(toCardItem);

  return (
    <>
      <article>
        <div className="shell max-w-5xl pb-12 pt-16 sm:pt-24">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-coral"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="label-mono rounded-pill border border-border px-4 py-2"
              >
                {c}
              </span>
            ))}
          </div>

          {kicker && (
            <p className="mt-6 font-display text-2xl italic text-coral">
              {kicker}
            </p>
          )}

          <h1 className="type-h1 mt-3">
            {title}
          </h1>

          {client && (
            <p className="label-mono mt-5 text-muted-foreground">
              Client: {client}
            </p>
          )}
        </div>

        <div className="shell max-w-6xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-secondary">
            <Image
              src={image}
              alt={title}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="shell max-w-3xl py-16 sm:py-20">
          <p className="type-h3">
            {summary}
          </p>
          {body.length > 0 && (
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
              {body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border py-20">
          <div className="shell">
            <h2 className="type-h3">More like this</h2>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <WorkCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Cta />
    </>
  );
}
