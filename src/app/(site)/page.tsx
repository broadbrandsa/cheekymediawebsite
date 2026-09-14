import { Clients } from "@/components/sections/clients";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Marquee } from "@/components/sections/marquee";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Stats } from "@/components/sections/stats";
import { Team } from "@/components/sections/team";
import { getWork } from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const all = await getWork();

  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <FeaturedWork items={all.slice(0, 6)} />
      <ServicesOverview />
      <Stats />
      <Clients />
      <Team />
      <Faq />
      <Cta />
    </>
  );
}
