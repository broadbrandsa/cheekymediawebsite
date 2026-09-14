import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/content/site";

export function Cta() {
  return (
    <section className="section-y bg-ink text-cream">
      <div className="shell text-center">
        <p className="label-pill label-mono mx-auto border-cream/25 text-cream/70">
          <span className="size-1.5 rounded-full bg-coral" />
          Let us talk
        </p>

        <h2 className="type-h1 mx-auto mt-8 max-w-[14ch]">
          Got something you want{" "}
          <em className="font-display italic text-coral">made</em>?
        </h2>

        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-cream/70">
          A show, a campaign, a film, or an idea you have not shaped yet. We
          will tell you honestly whether we are the right people for it.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-pill bg-coral px-7 py-4 text-white transition-colors hover:bg-coral-deep sm:w-auto"
          >
            Start a project
            <ArrowUpRight className="size-3.5" />
          </Link>
          <a
            href={site.contact.phoneHref}
            className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-pill border border-cream/25 px-7 py-4 transition-colors hover:bg-cream/10 sm:w-auto"
          >
            {site.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
