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
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 p-8">
        <h1 className="text-2xl font-semibold">Studio not configured yet</h1>
        <p className="text-muted-foreground">
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> to your environment, then
          redeploy. Setup steps are in <code>docs/DEPLOYMENT.md</code>.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
