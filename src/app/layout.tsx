import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif, Inter } from "next/font/google";

import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Serif display + mono micro-labels + neutral sans body. The same three-part
// system used across the reference templates.
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Content production in Johannesburg`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Content production in Johannesburg`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  icons: { icon: "/images/brand/favicon.png" },
};

/**
 * Organization schema. `sameAs` is what lets Google tie the social profiles to
 * the business, which is the main SEO value of listing them.
 */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/brand/logo-navy.png`,
  description: site.description,
  foundingDate: String(site.founded),
  email: site.contact.email,
  telephone: "+27112584465",
  address: {
    "@type": "PostalAddress",
    streetAddress: "43 Central St",
    addressLocality: "Houghton Estate, Johannesburg",
    postalCode: "2198",
    addressCountry: "ZA",
  },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-ZA"
      className={`${inter.variable} ${instrumentSerif.variable} ${dmMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
