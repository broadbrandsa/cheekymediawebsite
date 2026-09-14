import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        eyebrow="About us"
        title={<>Impossible is not in our <em className="font-display italic text-coral">vocabulary</em></>}
        lede={about.lede}
      />

      <section className="shell pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {about.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-card p-8">
              <h2 className="label-mono text-coral-text">Transformation</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {about.transformation}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">
              {about.stats.map((stat) => (
                <div key={stat.label} className="bg-card p-6">
                  <dt className="font-display text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="label-mono mt-2 leading-snug text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <blockquote className="mt-20 border-l-2 border-coral pl-6 sm:pl-10">
          <p className="type-h2 max-w-4xl">
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
