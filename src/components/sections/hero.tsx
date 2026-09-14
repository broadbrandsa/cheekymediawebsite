import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-cream">
      {/* Soft light bloom behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-[-30%] size-[70rem] rounded-full bg-navy-600/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-[-20%] size-[40rem] rounded-full bg-coral/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-32">
        <p className="eyebrow text-coral">Johannesburg, since 2014</p>

        <h1 className="display-xl mt-6 max-w-5xl font-display font-extrabold">
          Your brand is more
          <br className="hidden sm:block" /> than a logo.
          <span className="block text-coral">It is a story.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/75 sm:text-xl">
          We make television, film, commercials and digital content out of our
          own studios in Houghton. Ten years of it, for broadcasters and brands
          who need the work to land rather than just exist.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-coral text-white hover:bg-coral-dark">
            <Link href="/work">
              See the work
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-cream/25 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
          >
            <Link href="/contact">Start a project</Link>
          </Button>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-8 text-sm text-cream/60 sm:mt-20">
          {["Television", "Film", "Commercials", "Digital", "Corporate"].map(
            (item) => (
              <li key={item} className="tracking-wide">
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
