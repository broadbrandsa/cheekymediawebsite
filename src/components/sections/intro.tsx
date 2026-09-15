import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Intro() {
  return (
    <section className="pt-[clamp(4rem,9vw,8rem)]">
      <div className="shell">
        <p className="label-mono text-center text-coral-text">Why Cheeky Media</p>

        <div className="mx-auto mt-8 max-w-4xl text-center">
          <h2 className="type-h2">
            We are not just another media company. We are culture engineers and{" "}
            <em className="font-display italic text-coral">
              audience whisperers
            </em>
            .
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The work sits where innovation meets emotion, which is a grand way
            of saying we pay attention to the data and then trust our instincts
            anyway. Whether you are launching a product, running a campaign or
            embedding a brand inside a show, the goal is the same. People
            should feel something and then do something.
          </p>

          <Link
            href="/about"
            className="label-mono mt-8 inline-flex items-center gap-2 rounded-pill border border-border px-5 py-4 transition-colors hover:bg-secondary"
          >
            More about us
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
