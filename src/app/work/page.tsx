import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { WorkGrid } from "@/components/work-grid";
import { workCategories } from "@/content/work";
import { getWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Television, film, commercials, digital and corporate work from Cheeky Media in Johannesburg.",
};

export default async function WorkPage() {
  const items = await getWork();

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <p className="eyebrow text-coral">Our work</p>
        <h1 className="display-xl mt-6 max-w-4xl font-display font-extrabold">
          Ten years of it.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Shows, spots, films and campaigns made for broadcasters and brands
          across South Africa and the continent. Filter by what you are looking
          for, or just scroll.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <WorkGrid items={items} categories={[...workCategories]} />
      </section>

      <Cta />
    </>
  );
}
