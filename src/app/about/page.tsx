import type { Metadata } from "next";

import { Clients } from "@/components/sections/clients";
import { Cta } from "@/components/sections/cta";
import { Team } from "@/components/sections/team";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cheeky Media has been making content across every platform since 2014, from our own studios in Houghton, Johannesburg.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <p className="eyebrow text-coral">About us</p>
        <h1 className="display-xl mt-6 max-w-4xl font-display font-extrabold">
          Impossible is not in our vocabulary.
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
          {about.lede}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {about.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="eyebrow rule-coral text-coral">Transformation</h2>
              <p className="mt-8 leading-relaxed text-muted-foreground">
                {about.transformation}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
              {about.stats.map((stat) => (
                <div key={stat.label} className="bg-card p-6">
                  <dt className="font-display text-2xl font-bold text-primary">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <blockquote className="mt-20 border-l-4 border-coral pl-6 sm:pl-10">
          <p className="display-lg max-w-4xl font-display font-bold">
            {about.closing}
          </p>
        </blockquote>
      </section>

      <Clients />
      <Team />
      <Cta />
    </>
  );
}
