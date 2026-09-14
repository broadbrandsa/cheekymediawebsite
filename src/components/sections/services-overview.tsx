import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/content/services";

/** Numbered list rows, the layout used for services on the reference sites. */
export function ServicesOverview() {
  return (
    <section className="section-y bg-contrast text-on-contrast">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-mono text-coral">What we do</p>
            <h2 className="type-h2 mt-5 max-w-[18ch]">
              Four ways in, one team behind all of them
            </h2>
          </div>
          <Link
            href="/services"
            className="label-mono inline-flex items-center gap-2 rounded-pill border border-on-contrast/25 px-5 py-3 transition-colors hover:bg-on-contrast/10"
          >
            All services
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <ul className="mt-14 border-t border-on-contrast/15">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid items-baseline gap-x-8 gap-y-3 border-b border-on-contrast/15 py-8 transition-colors hover:bg-on-contrast/5 sm:grid-cols-12 sm:py-10"
              >
                <span className="label-mono text-on-contrast/50 sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-h4 sm:col-span-4 group-hover:text-coral">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-on-contrast/60 sm:col-span-6">
                  {service.short}
                </p>
                <span className="sm:col-span-1 sm:justify-self-end">
                  <ArrowUpRight className="size-5 text-on-contrast/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-coral" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
