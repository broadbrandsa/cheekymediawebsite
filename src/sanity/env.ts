export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * The site is designed to build and run before Sanity is wired up, so pages
 * fall back to the static content in src/content when this is false.
 * Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local (and in Vercel) to turn the
 * CMS on. See docs/DEPLOYMENT.md.
 */
export const isSanityConfigured = projectId.length > 0;
