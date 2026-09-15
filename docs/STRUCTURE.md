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

### Route groups

`src/app/layout.tsx` is the root layout and carries only `<html>`, `<body>`,
fonts, metadata and the Organization schema. The header, footer and skip link
live in `src/app/(site)/layout.tsx`.

That split exists because Sanity Studio is a full-screen application. Rendered
inside the site header and footer it does not work properly, so `/studio` sits
outside the `(site)` group and gets no chrome.

`src/app/not-found.tsx` stays at the root, because a completely unmatched URL
never enters the `(site)` group, and pulls in the header and footer itself.

### The migrated catalogue is now in the CMS

All 32 work items were imported into Sanity on 14 September 2026, with their
images, so everything is editable in the studio rather than only in code. Each
document has the id `work-<slug>`.

What came across: title, slug, kicker, categories, client, year, summary, cover
image with alt text, the full written treatment for the ten items that had one,
and the YouTube URL for the 23 that had a video. Sort order was preserved in
steps of ten so new work can be slotted between existing items, and the same
six items stay flagged as featured.

Two things stayed behind. The Man Cave's self-hosted intro clip has no field in
the schema, so it still comes from `src/content/work.ts`; uploading that video
to the channel would tidy it up. And the static catalogue itself is kept as a
fallback, which is what the site falls back to if Sanity is unreachable or the
environment variables go missing.

`scripts/` holds the import tooling if it ever needs rebuilding from scratch.
Note the import overwrites by document id, so re-running it would discard
edits made in the studio.

### How the CMS connects to the work

`src/lib/content.ts` merges the two. `getWork()` fetches from Sanity, maps it to
the same shape as the static catalogue, and appends any static items whose slug
is not already in the CMS. So:

- Nothing in the CMS: the site runs entirely on the migrated catalogue
- An item added to the CMS: it appears first in the grid
- An item added with a slug that matches a migrated one: the CMS version wins

Every surface that shows work reads from that merge, not from the static file:

| Surface | Reads |
|---|---|
| Homepage featured strip | `getWork()`, first six |
| `/work` grid and filters | `getWork()` |
| `/work/[slug]` | `getProject()` first, static entry as fallback, field by field |
| Related work on a detail page | `getWork()` |
| `generateStaticParams` | CMS slugs plus static slugs, so CMS-only work prerenders |
| `generateMetadata` | CMS title, summary and cover image, falling back to static |
| Sitemap | static slugs today; CMS work is reachable and indexable via ISR |

A CMS entry's rich `body` renders through `src/components/portable-text.tsx`,
shared with the journal. A migrated entry's plain paragraphs render as before,
so both shapes work on the same page. `videoUrl` takes a full YouTube URL and
the id is parsed out at render.

The work pages carry `revalidate = 60`, matching the journal, so a change in
the studio appears within a minute rather than waiting for a redeploy.

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

## Accessibility and responsive behaviour

Audited and fixed rather than assumed. Every claim below was measured.

**Contrast.** All 16 text/background pairs clear WCAG AA in both themes. The
display coral (`--coral`) is only 3.4:1 on cream, which is fine for headings at
24px and up but fails for small text, so there is a second token,
`--coral-text`, at 5.57:1 on cream and 4.88:1 on sand. Use `text-coral` for
large display italics and `text-coral-text` for labels, kickers and inline
links. Solid coral buttons use `--coral-deep`, since white on the display coral
is only 3.67:1.

**Dark mode works.** It previously did not. shadcn ties the `dark:` variant to
a `.dark` class, and nothing ever applied that class, so the whole dark palette
and every `dark:` utility were dead. The custom variant now also matches
`prefers-color-scheme: dark`, so the OS setting is honoured. There is no manual
toggle; `[data-theme="light"]` on the root opts out if one is ever added.

Because of that, avoid raw `bg-ink` / `text-cream` on anything that must invert.
Use `bg-primary` / `text-primary-foreground` for solid buttons, and
`bg-contrast` / `text-on-contrast` for the inverted sections, which keeps the
light/dark section rhythm working in both themes.

**Touch targets.** Every button, input and tab is at least 44px tall. Inputs are
48px. Category chips inside a card are non-interactive labels, the card itself
is the target.

**Responsive.** Zero horizontal overflow across 90 combinations, nine pages by
nine widths from 320px to 1920px. `overflow-x: clip` on html and body is a
backstop, not the fix; the underlying cause was a footer nav row that would not
wrap.

**Other checks that pass across all pages:** exactly one h1 with no heading-level
skips, every image has alt text and reserved dimensions, every form field has a
label, every iframe has a title, no empty links, no duplicate ids, visible
focus rings on everything focusable, and a working skip link.

**Motion.** All transitions are 150 to 700ms on transform and opacity only. The
marquee has its own `prefers-reduced-motion` rule, because the blanket
reduced-motion reset would otherwise freeze it halfway through its travel
rather than at its start.

## Navigation

`site.nav` in `src/content/site.ts` is the single source for both the header
and the footer. An entry with a `children` array renders as a dropdown on
desktop and as a nested list in the mobile sheet; the footer's bottom row skips
those parents, since the four services already have their own column above.

There is deliberately no `/services` landing page. The menu goes straight to
the four service pages, and `/services` itself redirects to the homepage so a
stale link or bookmark does not dead-end.

## Social profiles

Defined once in `src/content/site.ts` under `social`, rendered by
`src/components/social-links.tsx`, and surfaced in three places: the footer,
the contact page sidebar, and the mobile menu.

| Profile | URL |
|---|---|
| Facebook | https://www.facebook.com/CheekyMediaSA |
| Instagram | https://www.instagram.com/cheeky_studios_sa/ |
| X | https://x.com/CheekyMediaSA |
| YouTube | https://www.youtube.com/@CheekyMedia |

The same list feeds `sameAs` in the Organization JSON-LD in the root layout,
which is how Google ties the profiles to the business. Adding a profile means
editing `site.ts` only; everything else follows.

Icons live in `src/components/social-icons.tsx` as filled brand glyphs. Lucide
removed its social icons over trademark concerns, and a stroke-style
approximation of a logo reads as wrong next to the real mark, so these are the
official paths rather than a lucide substitute.
