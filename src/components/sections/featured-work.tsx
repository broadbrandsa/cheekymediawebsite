import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { WorkCard, type WorkCardItem } from "@/components/work-card";

export function FeaturedWork({ items }: { items: WorkCardItem[] }) {
  return (
    <section className="bg-secondary/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-coral">Our work</p>
            <h2 className="display-lg mt-4 font-display font-bold">
              Shows, spots and stories.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-coral"
          >
            View everything
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <WorkCard key={item.slug} item={item} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
