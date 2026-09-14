import type { WorkCardItem } from "@/components/work-card";
import { sanityFetch, urlFor } from "@/sanity/client";
import {
  postBySlugQuery,
  postsQuery,
  projectBySlugQuery,
  projectsQuery,
} from "@/sanity/queries";
import type { SanityPost, SanityProject } from "@/sanity/types";
import { work, type WorkItem } from "@/content/work";

/**
 * Work items come from Sanity once the CMS is populated, and fall back to the
 * catalogue migrated from the old WordPress site in src/content/work.ts.
 * Anything published in Sanity is shown first, then the static items that have
 * not been re-entered in the CMS.
 */
export async function getWork(): Promise<WorkCardItem[]> {
  const cms = await sanityFetch<SanityProject[]>(projectsQuery, {}, []);

  const fromCms: WorkCardItem[] = cms.map((p) => ({
    slug: p.slug,
    title: p.title,
    kicker: p.kicker,
    categories: p.categories ?? [],
    image: urlFor(p.coverImage)?.width(1200).height(750).fit("crop").url() ?? "",
    summary: p.summary,
    client: p.client,
  }));

  const cmsSlugs = new Set(fromCms.map((p) => p.slug));
  const fromStatic: WorkCardItem[] = work
    .filter((w) => !cmsSlugs.has(w.slug))
    .map(toCardItem);

  return [...fromCms, ...fromStatic];
}

export function toCardItem(w: WorkItem): WorkCardItem {
  return {
    slug: w.slug,
    title: w.title,
    kicker: w.kicker,
    categories: [...w.categories],
    image: w.image,
    summary: w.summary,
    client: w.client,
  };
}

export async function getProject(slug: string) {
  const cms = await sanityFetch<SanityProject | null>(
    projectBySlugQuery,
    { slug },
    null,
  );
  return cms;
}

export async function getPosts(): Promise<SanityPost[]> {
  return sanityFetch<SanityPost[]>(postsQuery, {}, []);
}

export async function getPost(slug: string): Promise<SanityPost | null> {
  return sanityFetch<SanityPost | null>(postBySlugQuery, { slug }, null);
}
