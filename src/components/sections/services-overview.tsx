import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/content/services";

export function ServicesOverview() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="eyebrow rule-coral text-coral">What we do</p>
      <h2 className="display-lg mt-8 max-w-3xl font-display font-bold">
        Four ways in, one team behind all of them.
      </h2>

      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {services.map((service, i) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group relative flex flex-col bg-card p-8 transition-colors hover:bg-secondary/70 sm:p-10"
          >
            <span className="font-display text-sm font-bold text-coral">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-coral">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
              {service.short}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Read more
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
