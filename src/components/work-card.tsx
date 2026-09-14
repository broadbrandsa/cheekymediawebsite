import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
      className={cn("group flex flex-col", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {item.categories.map((c) => (
            <span
              key={c}
              className="label-mono rounded-pill bg-cream/90 px-3 py-1.5 text-ink backdrop-blur-sm"
            >
              {c}
            </span>
          ))}
        </span>
        <span className="absolute bottom-4 right-4 inline-flex size-10 translate-y-2 items-center justify-center rounded-pill bg-cream text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="mt-5">
        <h3 className="type-h4 transition-colors group-hover:text-coral">
          {item.title}
        </h3>
        {item.kicker && (
          <p className="mt-1.5 font-display text-lg italic text-coral">
            {item.kicker}
          </p>
        )}
        <p className="mt-2.5 line-clamp-2 leading-relaxed text-muted-foreground">
          {item.summary}
        </p>
        {item.client && (
          <p className="label-mono mt-4 text-muted-foreground/70">
            {item.client}
          </p>
        )}
      </div>
    </Link>
  );
}
