# Cheeky Media

The Cheeky Media website. Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui,
Sanity for content, deployed on Vercel.

## Quick start

```bash
pnpm install
pnpm dev
```

Runs on http://localhost:3000. No environment variables needed to get going,
the site falls back to the static content in `src/content` when the CMS is not
configured.

## Commands

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # eslint
```

## Publishing content

The CMS lives at `/studio` on the deployed site. Two document types:

- **Journal Post** for blog posts
- **Recent Work** for new portfolio items

Anything published appears on the site within 60 seconds.

## Documentation

| Document | What it covers |
|---|---|
| [PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) | What this is, who it is for, where it runs |
| [ASSUMPTIONS.md](docs/ASSUMPTIONS.md) | What was inferred and needs confirming. **Read before launch.** |
| [SCOPE.md](docs/SCOPE.md) | Pages, sections, exclusions, milestones |
| [STRUCTURE.md](docs/STRUCTURE.md) | Folder layout, section rules, content approach |
| [TRACKING_PLAN.md](docs/TRACKING_PLAN.md) | Analytics, events, conversion goals |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | GitHub, Vercel, Sanity, Resend, redirects |
