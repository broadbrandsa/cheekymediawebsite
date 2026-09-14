import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        eyebrow="What we do"
        title={<>From the idea to the <em className="font-display italic text-coral">delivery</em></>}
        lede="We own our studios, our post suites and our kit, so most of what a project needs happens under one roof. That keeps things quick, and it keeps budgets where they should be."
      />
      <ServicesOverview />
      <Cta />
    </>
  );
}
