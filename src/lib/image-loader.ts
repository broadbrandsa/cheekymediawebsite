type LoaderArgs = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * Keeps images off Vercel's image optimizer, which is metered and ran out on
 * the Hobby plan, returning 402 for every request.
 *
 * Nothing is lost by doing this. Sanity's CDN already resizes, crops and
 * converts format, so sending its output through a second optimizer was
 * duplicated work. Local files in /public are pre-compressed and served as is.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;

  const url = new URL(src);
  const currentW = Number(url.searchParams.get("w"));
  const currentH = Number(url.searchParams.get("h"));

  if (currentW && currentH) {
    // A crop is already in play, so scale both sides together or the aspect
    // ratio breaks. Only ever scale down.
    if (width < currentW) {
      const scale = width / currentW;
      url.searchParams.set("w", String(width));
      url.searchParams.set("h", String(Math.round(currentH * scale)));
    }
  } else if (!currentW || width < currentW) {
    url.searchParams.set("w", String(width));
  }

  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  return url.toString();
}
