import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export const urlFor = (source: Image) => builder?.image(source) ?? null;

/** Runs a GROQ query, returning the fallback when the CMS is not configured. */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error("Sanity fetch failed, using fallback content.", err);
    return fallback;
  }
}
