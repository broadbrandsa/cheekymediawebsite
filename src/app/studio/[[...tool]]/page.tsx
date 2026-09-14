import Link from "next/link";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export const metadata = {
  title: "Cheeky Media Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-5 p-8">
        <p className="label-mono text-coral-text">Sanity</p>
        <h1 className="type-h2">Studio not connected yet</h1>
        <p className="leading-relaxed text-muted-foreground">
          The CMS code is in place, but no Sanity project is wired up. Create
          one at{" "}
          <a
            href="https://sanity.io/manage"
            target="_blank"
            rel="noreferrer"
            className="text-coral-text underline underline-offset-4"
          >
            sanity.io/manage
          </a>
          , then set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> and redeploy. Full steps are
          in <code>docs/DEPLOYMENT.md</code>.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Until then the site runs on the catalogue in{" "}
          <code>src/content</code>, which is why everything still works.
        </p>
        <Link
          href="/"
          className="label-mono mt-2 inline-flex w-fit items-center rounded-pill border border-border px-5 py-4 transition-colors hover:bg-secondary"
        >
          Back to the site
        </Link>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
