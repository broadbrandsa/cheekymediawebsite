import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cheeky Media in Houghton, Johannesburg. Call 011 258 4465 or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Tell us what you are <em className="font-display italic text-coral">making</em></>}
        lede="A show, a campaign, a film, or an idea that has not taken shape yet. Send it through and we will come back to you quickly, and honestly, about whether we are the right people for it."
      />
      <section className="shell pb-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="label-mono text-muted-foreground">Find us</h2>
            <ul className="mt-6 space-y-6">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="group flex items-start gap-4"
                >
                  <Phone className="mt-1 size-5 shrink-0 text-coral" />
                  <span>
                    <span className="label-mono block text-muted-foreground">
                      Call us
                    </span>
                    <span className="font-display text-xl transition-colors group-hover:text-coral">
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
                    <span className="label-mono block text-muted-foreground">
                      Email
                    </span>
                    <span className="block break-all font-display text-xl transition-colors group-hover:text-coral">
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
                    <span className="label-mono block text-muted-foreground">
                      Studio
                    </span>
                    <span className="font-display text-xl leading-snug transition-colors group-hover:text-coral">
                      {site.contact.address}
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <h3 className="label-mono text-muted-foreground">Follow us</h3>
              <SocialLinks className="mt-4" />
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-border">
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
    </>
  );
}
