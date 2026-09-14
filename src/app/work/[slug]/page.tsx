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
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-28 sm:px-8 sm:pt-36">
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
                className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground"
              >
                {c}
              </span>
            ))}
          </div>

          {kicker && (
            <p className="mt-6 font-display text-lg italic text-coral">
              {kicker}
            </p>
          )}

          <h1 className="display-lg mt-3 font-display font-extrabold">
            {title}
          </h1>

          {client && (
            <p className="mt-4 text-sm uppercase tracking-wider text-muted-foreground">
              Client: {client}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
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

        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-display text-xl leading-relaxed text-foreground sm:text-2xl">
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
        <section className="border-t border-border bg-secondary/50 py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              More like this
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
