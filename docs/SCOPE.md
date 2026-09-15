# Scope

## Pages included

| Route | Type | Source |
|---|---|---|
| `/` | Static | Sections composed from `src/content` |
| `/work` | Static | Full catalogue, filterable by category |
| `/work/[slug]` | Static, 32 pages | `src/content/work.ts`, overridden by Sanity |
| `/services/[slug]` | Static, 4 pages | `src/content/services.ts`. There is no `/services` index; the nav opens a menu straight to these four. |
| `/about` | Static | `src/content/about.ts` and `team.ts` |
| `/journal` | ISR, 60s | Sanity |
| `/journal/[slug]` | ISR, 60s | Sanity |
| `/contact` | Static, with a client form | `src/content/site.ts` |
| `/studio` | Client | Sanity Studio, noindex |
| `/api/contact` | Dynamic | Form handler |
| `/sitemap.xml`, `/robots.txt` | Generated | Next.js metadata routes |

That is 48 routes at build time.

## Sections included

Homepage, in order:

1. **Hero.** Headline, positioning line, two calls to action, then the
   showreel full bleed.
2. **Work rail.** All 32 projects in a continuously drifting horizontal
   scroller, with arrow controls.
3. **Intro.** Centred "why us" statement and a link through to About.
4. **Clients.** Logo strip, reading as part of the intro above it.
5. **Pillars.** Three "how we work" cards.
6. **Services overview.** Numbered list on an inverted surface.
7. **Stats.** Three credibility figures.
8. **Team.** Three members.
9. **FAQ.** Six questions in an accordion.
10. **CTA.** Contact prompt with phone.

Reusable across other pages: `Clients`, `Team`, `ServicesOverview`, `Cta`,
`WorkCard`, `WorkGrid`.

## Content management

Two document types in Sanity:

- **Journal Post.** Title, slug, excerpt, cover image, publish date, author,
  tags, rich body with inline images.
- **Recent Work.** Title, slug, kicker, categories, client, year, cover image,
  summary, video URL, rich body, featured flag, sort order.

Work published in Sanity appears ahead of the migrated catalogue, and a Sanity
entry with the same slug takes precedence over the static one. That means the
team can start using the CMS immediately without re-entering ten years of work
first.

## What is excluded

Deliberately out of scope for this build:

- **Testimonials.** The only ones on the old site were placeholder text. See
  `ASSUMPTIONS.md`.
- **A showreel video on the hero.** The old site had one that loaded slowly and
  often not at all. Can be added once a properly compressed file exists.
- **Search.** The catalogue is 32 items. Category filters are enough.
- **Multi-language.** English only.
- **User accounts, gated content, client portals.**
- **E-commerce.**
- **Migration of the old WordPress URLs.** The new URL structure differs
  (`/work/` rather than `/portfolio/`, `/services/x` rather than `/x`).
  Redirects are listed as a launch task below but not yet written, because they
  depend on which domain the site lands on.
- **Cookie consent banner.** Nothing currently sets a cookie. This changes the
  moment analytics is switched on, see `TRACKING_PLAN.md`.

## Launch milestones

### Milestone 1: Build complete (done)

Project scaffolded, content migrated, all pages built, production build passing,
lint clean, contact form working end to end.

### Milestone 2: Content sign-off

- Confirm every item in `ASSUMPTIONS.md`
- Get real team roles
- Replace the weak portfolio summaries with real ones
- Supply clean, high resolution stills for the work grid
- Decide on testimonials

### Milestone 3: Infrastructure

- Create the Sanity project and add the environment variables
- Invite editors to the studio
- Set up Resend and verify the sending domain
- Connect the GitHub repository to Vercel
- Deploy to a preview URL and review

### Milestone 4: Pre-launch

- Add analytics and confirm events fire (see `TRACKING_PLAN.md`)
- Write the redirect map from old URLs to new
- Run Lighthouse on mobile and fix anything below 90
- Check the site on a real phone on a real South African connection
- Proofread everything

### Milestone 5: Launch

- Point DNS at Vercel
- Deploy redirects at the same time as the DNS change
- Submit the new sitemap to Google Search Console
- Watch 404s for the first week and patch the redirect map
