import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { WorkCard, type WorkCardItem } from "@/components/work-card";

export function FeaturedWork({ items }: { items: WorkCardItem[] }) {
  return (
    <section className="section-y">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-mono text-coral">Selected work</p>
            <h2 className="type-h2 mt-5 max-w-[16ch]">
              Shows, spots and stories
            </h2>
          </div>
          <Link
            href="/work"
            className="label-mono inline-flex items-center gap-2 rounded-pill border border-border px-5 py-3 transition-colors hover:bg-secondary"
          >
            View everything
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <WorkCard key={item.slug} item={item} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
