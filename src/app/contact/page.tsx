import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cheeky Media in Houghton, Johannesburg. Call 011 258 4465 or send us a message.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
      <p className="eyebrow text-coral">Contact</p>
      <h1 className="display-xl mt-6 max-w-3xl font-display font-extrabold">
        Tell us what you are making.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        A show, a campaign, a film, or an idea that has not taken shape yet.
        Send it through and we will come back to you quickly, and honestly, about
        whether we are the right people for it.
      </p>

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="eyebrow text-muted-foreground">Find us</h2>
            <ul className="mt-6 space-y-6">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="group flex items-start gap-4"
                >
                  <Phone className="mt-1 size-5 shrink-0 text-coral" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      Call us
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-coral">
                      {site.contact.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group flex items-start gap-4"
                >
                  <Mail className="mt-1 size-5 shrink-0 text-coral" />
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </span>
                    <span className="block break-all font-display text-lg font-bold tracking-tight transition-colors group-hover:text-coral">
                      {site.contact.email}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4"
                >
                  <MapPin className="mt-1 size-5 shrink-0 text-coral" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      Studio
                    </span>
                    <span className="font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-coral">
                      {site.contact.address}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <iframe
              title="Cheeky Media studio location"
              src="https://www.google.com/maps?q=43+Central+St,+Houghton+Estate,+Johannesburg,+2198&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
