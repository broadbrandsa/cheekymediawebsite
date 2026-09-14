import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/content/services";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-sand">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/images/brand/logo-navy.png"
              alt={site.name}
              width={1531}
              height={597}
              className="h-10 w-auto dark:hidden"
            />
            <Image
              src="/images/brand/logo-white.png"
              alt={site.name}
              width={1531}
              height={597}
              className="hidden h-10 w-auto dark:block"
            />
            <p className="mt-6 max-w-xs font-display text-2xl leading-snug">
              Your brand is more than a logo. It is a story, and we are here to
              tell it.
            </p>
          </div>

          <nav className="md:col-span-3">
            <h2 className="label-mono text-muted-foreground">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="transition-colors hover:text-coral"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="label-mono text-muted-foreground">Get in touch</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="transition-colors hover:text-coral"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all transition-colors hover:text-coral"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-start gap-1 leading-relaxed transition-colors hover:text-coral"
                >
                  {site.contact.address}
                  <ArrowUpRight className="mt-1 size-3.5 shrink-0" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-muted-foreground">
            &copy; {new Date().getFullYear()} {site.name}. Level 1 BBBEE.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label-mono text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
