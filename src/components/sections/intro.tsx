import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { about } from "@/content/about";

export function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow rule-coral text-coral">Why Cheeky Media</p>
          <h2 className="display-lg mt-8 font-display font-bold">
            Culture engineers and audience whisperers.
          </h2>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              We are not just another media company. We blend the strategic
              thinking of a global agency with the speed of a startup, and we
              build content that resonates rather than content that simply
              exists.
            </p>
            <p>
              The work sits where innovation meets emotion, which is a grand way
              of saying we pay attention to the data and then trust our
              instincts anyway. Whether you are launching a product, running a
              campaign or embedding a brand inside a show, the goal is the same.
              People should feel something and then do something.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {about.stats.map((stat) => (
              <div key={stat.label} className="bg-card p-5">
                <dt className="font-display text-2xl font-bold text-primary">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-coral"
          >
            More about us
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
