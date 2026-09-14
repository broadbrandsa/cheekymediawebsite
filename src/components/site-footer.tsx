import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { services } from "@/content/services";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/images/brand/logo-white.png"
              alt={site.name}
              width={1531}
              height={597}
              className="h-11 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
              Your brand is more than a logo. It is a story, and we are here to
              tell it.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-cream/50">Services</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-cream/80 transition-colors hover:text-coral"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="eyebrow text-cream/50">Get in touch</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="flex items-start gap-3 text-cream/80 transition-colors hover:text-coral"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-coral" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-start gap-3 break-all text-cream/80 transition-colors hover:text-coral"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-coral" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 text-cream/80 transition-colors hover:text-coral"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-coral" />
                  {site.contact.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Level 1 BBBEE, black
            owned and managed.
          </p>
          <nav className="flex gap-6">
            <Link href="/work" className="transition-colors hover:text-cream">
              Work
            </Link>
            <Link href="/journal" className="transition-colors hover:text-cream">
              Journal
            </Link>
            <Link href="/contact" className="transition-colors hover:text-cream">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
