import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Cta } from "@/components/sections/cta";
import { services, serviceBySlug } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: "Services" };
  return { title: service.title, description: service.short };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-coral"
        >
          <ArrowLeft className="size-4" />
          All services
        </Link>

        <h1 className="display-xl mt-8 max-w-4xl font-display font-extrabold">
          {service.title}
        </h1>

        <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          {service.intro.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="eyebrow rule-coral text-coral">What we offer</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {service.offerings.map((o, i) => (
              <div key={o.title} className="bg-card p-8 sm:p-10">
                <span className="font-display text-sm font-bold text-coral">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                  {o.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <h2 className="eyebrow text-coral">Why it works</h2>
        <p className="mt-6 font-display text-2xl leading-snug tracking-tight sm:text-3xl">
          {service.why}
        </p>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Other services
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group bg-card p-6 transition-colors hover:bg-secondary/70"
              >
                <h3 className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-coral">
                  {o.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {o.short}
                </p>
                <ArrowRight className="mt-4 size-4 text-coral transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
