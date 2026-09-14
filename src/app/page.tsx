import { Clients } from "@/components/sections/clients";
import { Cta } from "@/components/sections/cta";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Team } from "@/components/sections/team";
import { getWork } from "@/lib/content";

export default async function HomePage() {
  const all = await getWork();
  const featured = all.slice(0, 6);

  return (
    <>
      <Hero />
      <Clients />
      <Intro />
      <FeaturedWork items={featured} />
      <ServicesOverview />
      <Team />
      <Cta />
    </>
  );
}
