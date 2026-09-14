import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  {
    title: "Own the kit",
    body: "Studios, green screen, sound booths and post suites in house. No rental clock, no markup, problems solved on the day.",
  },
  {
    title: "Built for broadcast",
    body: "A live weekday show on ETV keeps the whole crew sharp. That discipline shows up in every commercial and film we shoot.",
  },
  {
    title: "Made for the platform",
    body: "TV, social, podcast or digital. We build for where the audience actually is, from the first treatment rather than as a cutdown later.",
  },
];

export function Intro() {
  return (
    <section className="section-y">
      <div className="shell">
        <p className="label-mono text-coral">Why Cheeky Media</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <h2 className="type-h2 lg:col-span-7">
            We are not just another media company. We are culture engineers and{" "}
            <em className="font-display italic text-coral">
              audience whisperers
            </em>
            .
          </h2>

          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              The work sits where innovation meets emotion, which is a grand way
              of saying we pay attention to the data and then trust our
              instincts anyway. Whether you are launching a product, running a
              campaign or embedding a brand inside a show, the goal is the same.
              People should feel something and then do something.
            </p>
            <Link
              href="/about"
              className="label-mono mt-7 inline-flex items-center gap-2 rounded-pill border border-border px-5 py-3 transition-colors hover:bg-secondary"
            >
              More about us
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.title} className="bg-card p-8">
              <span className="label-mono text-coral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="type-h4 mt-5">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
