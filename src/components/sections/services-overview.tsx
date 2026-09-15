"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Clapperboard,
  Share2,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { services } from "@/content/services";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  "video-production": Clapperboard,
  "brand-integration": Sparkles,
  "digital-media": Share2,
  corporate: Building2,
};

/**
 * Expandable horizontal panels. The active one opens to show its still,
 * title and copy; the rest collapse to a narrow strip with the title set
 * vertically.
 *
 * Expansion follows hover and focus, so a click is free to do the obvious
 * thing and open the service page. Below lg the panels stack as ordinary
 * cards, since there is no hover on touch and rotated text at that width
 * would be unreadable.
 */
export function ServicesOverview() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="section-y bg-contrast text-on-contrast">
      <div className="shell">
        <p className="label-mono text-coral">What we do</p>
        <h2 className="type-h2 mt-5 max-w-[18ch]">
          Four ways in, one team behind all of them
        </h2>

        <div className="mt-14 flex flex-col gap-4 lg:h-[34rem] lg:flex-row lg:gap-3">
          {services.map((service, i) => {
            const Icon = icons[service.slug];
            const open = active === i;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={`${service.title}. ${service.short}`}
                className={cn(
                  "group relative overflow-hidden rounded-3xl transition-[flex-grow] duration-500 ease-out",
                  "h-72 sm:h-80 lg:h-auto",
                  open ? "lg:grow-[4]" : "lg:grow",
                )}
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={cn(
                    "object-cover transition-all duration-700",
                    open ? "scale-100" : "scale-110 lg:grayscale",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    open
                      ? "bg-ink/65"
                      : "bg-ink/80 group-hover:bg-ink/70",
                  )}
                />

                {/* Collapsed state: vertical title, lg and up only. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 hidden flex-col items-center justify-between py-8 transition-opacity duration-300 lg:flex",
                    open ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                >
                  <Icon className="size-7 shrink-0 text-coral" />
                  <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-display text-2xl text-cream">
                    {service.title}
                  </span>
                  <span className="size-7" />
                </span>

                {/* Expanded state, and the whole card below lg. */}
                <span
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between p-7 transition-opacity duration-500 sm:p-9",
                    "opacity-100",
                    open ? "lg:opacity-100" : "lg:pointer-events-none lg:opacity-0",
                  )}
                >
                  <span className="flex items-center gap-4">
                    <Icon className="size-7 shrink-0 text-coral" />
                    <span className="type-h4 font-display text-cream">
                      {service.title}
                    </span>
                  </span>

                  <span className="max-w-[32rem]">
                    <span className="block leading-relaxed text-cream/80">
                      {service.short}
                    </span>
                    <span className="label-mono mt-6 inline-flex items-center gap-2 rounded-pill border border-cream/30 px-5 py-3 text-cream transition-colors group-hover:border-coral group-hover:text-coral">
                      Read more
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
