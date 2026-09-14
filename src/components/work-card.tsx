import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type WorkCardItem = {
  slug: string;
  title: string;
  kicker?: string;
  categories: string[];
  image: string;
  summary: string;
  client?: string;
};

export function WorkCard({
  item,
  priority = false,
  className,
}: {
  item: WorkCardItem;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl hover:shadow-navy-900/10",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {item.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-coral">
          {item.title}
        </h3>

        {item.kicker && (
          <p className="mt-1 text-sm italic text-coral">{item.kicker}</p>
        )}

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {item.summary}
        </p>

        {item.client && (
          <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground/70">
            {item.client}
          </p>
        )}
      </div>
    </Link>
  );
}
