import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Cta } from "@/components/sections/cta";
import { WorkGrid } from "@/components/work-grid";
import { workCategories } from "@/content/work";
import { getWork } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Television, film, commercials, digital and corporate work from Cheeky Media in Johannesburg.",
};

export default async function WorkPage() {
  const items = await getWork();

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title={
          <>
            Ten years <em className="font-display italic text-coral">of it</em>
          </>
        }
        lede="Shows, spots, films and campaigns made for broadcasters and brands across South Africa and the continent. Filter by what you are looking for, or just scroll."
      />
      <section className="shell pb-24">
        <WorkGrid items={items} categories={[...workCategories]} />
      </section>
      <Cta />
    </>
  );
}
