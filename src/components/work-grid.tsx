"use client";

import { useMemo, useState } from "react";

import { WorkCard, type WorkCardItem } from "@/components/work-card";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

export function WorkGrid({
  items,
  categories,
  initialCount = PAGE_SIZE,
}: {
  items: WorkCardItem[];
  categories: string[];
  initialCount?: number;
}) {
  const [active, setActive] = useState<string>("All");
  const [visible, setVisible] = useState(initialCount);

  const filtered = useMemo(
    () =>
      active === "All"
        ? items
        : items.filter((i) => i.categories.includes(active)),
    [items, active],
  );

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  const pick = (cat: string) => {
    setActive(cat);
    setVisible(initialCount);
  };

  return (
    <div>
      <h2 className="sr-only">Browse the work</h2>
      <div
        role="tablist"
        aria-label="Filter work by category"
        className="flex flex-wrap gap-2"
      >
        {["All", ...categories].map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => pick(cat)}
              className={cn(
                "label-mono rounded-pill border px-5 py-4 transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-ink/40 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"} in{" "}
        {active}
      </p>

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          Nothing here yet in this category.
        </p>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <WorkCard key={item.slug} item={item} priority={i < 3} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="label-mono rounded-pill border border-border px-7 py-4 transition-colors hover:bg-secondary"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
