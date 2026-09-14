import { work } from "@/content/work";

/** Continuous scrolling ticker of show titles, as on the reference sites. */
export function Marquee() {
  const titles = work.slice(0, 14).map((w) => w.title);
  const run = [...titles, ...titles];

  return (
    <section className="rule-y overflow-hidden bg-sand py-5">
      <div className="marquee flex w-max gap-10">
        {run.map((title, i) => (
          <span
            key={`${title}-${i}`}
            className="label-mono flex shrink-0 items-center gap-10 text-muted-foreground"
            aria-hidden={i >= titles.length}
          >
            {title}
            <span className="size-1 rounded-full bg-coral" />
          </span>
        ))}
      </div>
    </section>
  );
}
