import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Images uploaded through the studio are served from Sanity's CDN.
        // Without this, next/image rejects them and the page 500s.
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  /**
   * The URL structure changed from the WordPress site, so every old address
   * needs somewhere to land or ten years of search results break.
   *
   * Portfolio slugs mostly carry across unchanged, but two items were merged
   * because the old site had them listed twice under different categories, so
   * those two get explicit entries ahead of the catch-all.
   */
  async redirects() {
    return [
      // Merged duplicates. These must come before the /portfolio/:slug rule.
      {
        source: "/portfolio/cop-a-half",
        destination: "/work/cop-and-a-half",
        permanent: true,
      },
      {
        source: "/portfolio/dungeon",
        destination: "/work/the-dungeon",
        permanent: true,
      },

      // Portfolio moved to /work.
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/portfolio-2", destination: "/work", permanent: true },
      {
        source: "/portfolio/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
      {
        // Categories are filters on the grid now rather than their own pages.
        source: "/portfolio-category/:slug",
        destination: "/work",
        permanent: true,
      },

      // Service pages moved under /services.
      {
        source: "/video-production",
        destination: "/services/video-production",
        permanent: true,
      },
      {
        source: "/brand-integration",
        destination: "/services/brand-integration",
        permanent: true,
      },
      {
        source: "/digital-media",
        destination: "/services/digital-media",
        permanent: true,
      },
      {
        source: "/corporate",
        destination: "/services/corporate",
        permanent: true,
      },

      // The services index was removed in favour of a nav dropdown; the
      // individual /services/<slug> pages are unaffected.
      { source: "/services", destination: "/", permanent: false },

      // Renamed pages.
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },

      // Unfinished page that was live on the old site.
      { source: "/test", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
