# Project Overview

## What this is

A rebuild of the Cheeky Media website. The old site runs on WordPress with
Elementor and Slider Revolution, and it carries about 200KB of markup per page
plus a stack of plugins. This replaces it with a standalone Next.js application
that renders mostly static HTML, loads fast, and gives the team a simple place
to publish blog posts and new work without touching code.

It is completely self-contained. No monorepo, no shared packages, no
dependencies on folders outside this project.

## Who Cheeky Media is

A content production company in Houghton, Johannesburg, making television,
film, commercials, digital content and corporate work since 2014. Level 1 BBBEE,
black owned and managed. They own their studios, green screen, sound booths and
post suites, which is the commercial argument running underneath most of the
copy on the site.

Track record includes broadcasters (SABC, MultiChoice, ETV) and brands
(Vodacom, Nestlé, Nedbank, MTN, FNB, SA Tourism, African Bank). They produce The
Morning Show for ETV.

## Who the site is for

Three audiences, roughly in this order of commercial value:

1. **Brand and agency decision makers** looking for a production partner. They
   want to see the work first, confirm the company is credible, then find a way
   to make contact. The path from landing to enquiry needs to be short.
2. **Broadcasters and commissioning editors** looking at format and series
   work. They care about the slate, the range, and whether the company can
   deliver at volume.
3. **Prospective crew and collaborators.** Lower priority, but the About and
   Journal pages do the work here.

Most traffic is South African, on mobile, often on a patchy connection. That
shaped the decision to render static HTML and keep the JavaScript small.

## Deployment environment

- **Hosting:** Vercel
- **Framework:** Next.js 16, App Router, React 19, TypeScript
- **Styling:** Tailwind CSS v4 with shadcn/ui primitives
- **CMS:** Sanity, with the studio embedded at `/studio`
- **Forms:** API route at `/api/contact`, delivery through Resend
- **Repository:** GitHub (see `DEPLOYMENT.md`)

## Owner

Cheeky Media. Primary contact for the build is mikee@dsg.co.za.

Current production domain is `cheekymediaworld.com`. Note the company email is
on `cheekymedia.co.za`, which is a different domain, so the cutover plan needs
to confirm which one the new site should live on.

## Related documents

- `ASSUMPTIONS.md` for what was inferred rather than confirmed
- `SCOPE.md` for what is in and out
- `STRUCTURE.md` for how the code is organised
- `TRACKING_PLAN.md` for analytics
- `DEPLOYMENT.md` for setup and release
