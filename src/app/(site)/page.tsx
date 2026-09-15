import { Clients } from "@/components/sections/clients";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Pillars } from "@/components/sections/pillars";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Stats } from "@/components/sections/stats";
import { WorkScroller } from "@/components/sections/work-scroller";
import { Team } from "@/components/sections/team";
import { getWork } from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const all = await getWork();

  return (
    <>
      <Hero />
      <WorkScroller items={all} />
      <Intro />
      <Clients />
      <Pillars />
      <ServicesOverview />
      <Stats />
      <Team />
      <Faq />
      <Cta />
    </>
  );
}
