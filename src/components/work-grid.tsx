"use client";

import { useMemo, useState } from "react";

import { WorkCard, type WorkCardItem } from "@/components/work-card";
import { Button } from "@/components/ui/button";
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
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          Nothing here yet in this category.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <WorkCard key={item.slug} item={item} priority={i < 3} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
