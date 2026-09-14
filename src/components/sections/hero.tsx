import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative">
      <div className="shell pb-14 pt-16 text-center sm:pt-24">
        <p className="label-pill label-mono mx-auto text-muted-foreground">
          <span className="size-1.5 rounded-full bg-coral" />
          Johannesburg, since 2014
        </p>

        <h1 className="type-h0 mx-auto mt-8 max-w-[16ch]">
          Your brand is more than a{" "}
          <em className="font-display italic text-coral">logo</em>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          It is a story, and we are here to tell it. Television, film,
          commercials and digital content, made out of our own studios in
          Houghton.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/work"
            className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-pill bg-ink px-7 py-4 text-cream transition-colors hover:bg-ink-soft sm:w-auto"
          >
            See the work
            <ArrowUpRight className="size-3.5" />
          </Link>
          <Link
            href="/contact"
            className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-pill border border-border px-7 py-4 transition-colors hover:bg-secondary sm:w-auto"
          >
            Start a project
          </Link>
        </div>
      </div>

      {/* Full-bleed showreel still, with a floating quote card over it. */}
      <div className="relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src="/images/work/barcelo.jpg"
            alt="Cheeky Media on set"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
          />
        </div>

        <div className="shell relative">
          <figure className="-mt-16 ml-auto max-w-sm rounded-3xl border border-border bg-card p-6 shadow-xl shadow-ink/10 sm:-mt-24">
            <div className="flex gap-0.5 text-coral" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 font-display text-xl leading-snug">
              &ldquo;They turned a tight brief into a shoot that actually
              landed, and they did it without blowing the budget.&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <p className="text-sm font-medium">Brand partner</p>
              <p className="label-mono mt-1 text-muted-foreground">
                Placeholder, pending a real client quote
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
