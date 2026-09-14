import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-[36rem] rounded-full bg-coral/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-coral">Let us talk</p>
            <h2 className="display-lg mt-6 font-display font-bold">
              Got something you want made?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
              Tell us what you are working on. A show, a campaign, a film, or
              just an idea you have not shaped yet. We will tell you honestly
              whether we are the right people for it.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
            <Button
              asChild
              size="lg"
              className="w-full bg-coral text-white hover:bg-coral-dark sm:w-auto"
            >
              <Link href="/contact">
                Start a project
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <div className="mt-4 space-y-3 text-sm lg:text-right">
              <a
                href={site.contact.phoneHref}
                className="flex items-center gap-3 text-cream/80 transition-colors hover:text-coral lg:justify-end"
              >
                <Phone className="size-4 text-coral" />
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 break-all text-cream/80 transition-colors hover:text-coral lg:justify-end"
              >
                <Mail className="size-4 shrink-0 text-coral" />
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
