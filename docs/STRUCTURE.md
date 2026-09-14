# Structure

## Folder layout

```
cheeky-media/
├── docs/                        This documentation
├── public/
│   └── images/
│       ├── brand/               Logo (navy and white), favicon
│       ├── clients/             Client logo marks
│       ├── team/                Team portraits
│       ├── video/               Reserved for showreel assets
│       └── work/                32 portfolio images, named by slug
├── src/
│   ├── app/
│   │   ├── api/contact/         Form handler
│   │   ├── about/
│   │   ├── contact/
│   │   ├── journal/[slug]/
│   │   ├── services/[slug]/
│   │   ├── studio/[[...tool]]/  Embedded Sanity Studio
│   │   ├── work/[slug]/
│   │   ├── globals.css          Theme tokens and brand utilities
│   │   ├── layout.tsx           Fonts, metadata, header, footer
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── sections/            Page sections, composed in routes
│   │   ├── ui/                  shadcn primitives, do not hand-edit
│   │   ├── contact-form.tsx
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── work-card.tsx
│   │   └── work-grid.tsx
│   ├── content/                 Static content, migrated from WordPress
│   │   ├── about.ts
│   │   ├── services.ts
│   │   ├── site.ts
│   │   ├── team.ts
│   │   └── work.ts
│   ├── lib/
│   │   ├── content.ts           Merges Sanity with static content
│   │   └── utils.ts             cn()
│   └── sanity/
│       ├── schemas/             Document definitions
│       ├── client.ts            Client plus the safe fetch wrapper
│       ├── env.ts
│       ├── queries.ts           GROQ
│       └── types.ts
├── sanity.config.ts
└── .env.example
```

## Section composition rules

A route file should read like a table of contents. It fetches data and composes
sections, and it does not contain layout detail:

```tsx
export default async function HomePage() {
  const all = await getWork();
  return (
    <>
      <Hero />
      <Clients />
      <Intro />
      <FeaturedWork items={all.slice(0, 6)} />
      <ServicesOverview />
      <Team />
      <Cta />
    </>
  );
}
```

Rules that keep this workable:

1. **Sections own their own vertical rhythm.** Each one carries its own padding
   (`py-20 sm:py-28`) and its own background. Routes never add spacing between
   sections, so sections can be reordered freely.
2. **Sections own their width.** Each wraps content in
   `mx-auto max-w-7xl px-5 sm:px-8`. A section that needs a full-bleed background
   puts the background on the outer element and the container inside it.
3. **Server by default.** Only `site-header`, `work-grid` and `contact-form` are
   client components, because they need state. Everything else renders on the
   server.
4. **Sections read content, they do not fetch it.** Data fetching happens in the
   route and gets passed down as props. `FeaturedWork` takes `items`; it does not
   know Sanity exists.
5. **shadcn primitives in `components/ui` stay as generated.** Customise through
   the theme tokens in `globals.css`, not by editing the primitives, so
   `shadcn add` stays safe to run.

## Content management approach

Content lives in two places on purpose.

**Static content** in `src/content` covers things that change rarely and benefit
from being typed and version controlled: services, the About copy, team, site
metadata, and the ten years of back catalogue migrated from WordPress. Editing
these means a commit, which is the right amount of friction for copy that
shouldn't drift.

**Sanity** covers things that change often and should not need a developer:
journal posts and new work. The studio runs at `/studio` inside the site itself,
so there is nothing extra to host.

`src/lib/content.ts` merges the two. `getWork()` fetches from Sanity, maps it to
the same shape as the static catalogue, and appends any static items whose slug
is not already in the CMS. So:

- Nothing in the CMS: the site runs entirely on the migrated catalogue
- An item added to the CMS: it appears first in the grid
- An item added with a slug that matches a migrated one: the CMS version wins

The whole CMS layer is optional. `isSanityConfigured` is false when
`NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, `sanityFetch` returns the fallback
instead of throwing, and the site builds and runs normally. That is why the
build passes on a fresh clone with no credentials.

## Theme and brand

The visual language follows three Webflow references supplied as direction:
[SaleUnion](https://saleunion.webflow.io/), [Bungee](https://bungee-pro.webflow.io/)
and [Franco](https://franco-template.webflow.io/homepage/home-b). All three share
the same system, and the site now matches it.

**Three-part type system**, the signature move across all three references:

| Role | Face | Used for |
|---|---|---|
| Display | Instrument Serif | Every heading, at 400 weight with tight negative tracking |
| Body | Inter | Paragraphs and UI |
| Mono | DM Mono | Uppercase micro-labels, eyebrows, buttons, metadata |

**Palette.** Warm cream ground rather than white, deep navy-black ink rather
than pure black, coral as the single accent. The navy is still derived from the
Cheeky Media logo (`#123A62`), warmed so it sits with the cream.

| Token | Light | Role |
|---|---|---|
| `--cream` | `#F9F6EF` | Page background |
| `--sand` | `#EDE7DA` | Alternate section background |
| `--ink` | `#111E2E` | Text, dark sections |
| `--coral` | `#E4573D` | Accent, italics, rules, one CTA |

All are exposed as Tailwind utilities (`bg-cream`, `text-ink`, `text-coral`).
Light and dark are both complete.

**Type scale utilities** replace ad-hoc `text-*` sizes on headings:
`.type-h0` through `.type-h4`, each fluid via `clamp()` with the negative
tracking the references use. `.label-mono` is the uppercase mono micro-label
and `.label-pill` wraps it in the bordered pill seen on the reference heroes.

**Layout utilities.** `.shell` is the 81rem container with responsive gutters,
matching SaleUnion's `--_sizes---container--max-width`. `.section-y` is the
fluid vertical rhythm. Use these rather than repeating the container classes.

**Radii are large.** `--radius` is 1rem and cards use `rounded-3xl`. Buttons and
chips use `rounded-pill` (`100vw`), which is the dominant button shape on all
three references.
