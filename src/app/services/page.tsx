import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { ServicesOverview } from "@/components/sections/services-overview";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Video production, brand integration, digital media and corporate content from Cheeky Media.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-4 pt-28 sm:px-8 sm:pt-36">
        <p className="eyebrow text-coral">What we do</p>
        <h1 className="display-xl mt-6 max-w-4xl font-display font-extrabold">
          From the idea to the delivery.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          We own our studios, our post suites and our kit, so most of what a
          project needs happens under one roof. That keeps things quick, and it
          keeps budgets where they should be.
        </p>
      </section>
      <ServicesOverview />
      <Cta />
    </>
  );
}
