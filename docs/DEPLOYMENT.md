# Deployment

## Requirements

- Node 20 or newer (built and tested on 22)
- pnpm 10
- A GitHub account with access to the repository
- A Vercel account
- A Sanity account, for the CMS
- A Resend account, for contact form delivery

## Running locally

```bash
pnpm install
pnpm dev
```

Opens on http://localhost:3000.

The site runs without any environment variables. The CMS is optional and the
contact form logs submissions instead of emailing them. That is deliberate, so a
fresh clone works immediately.

```bash
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # eslint, must be clean before pushing
```

## GitHub setup

The project was initialised as a git repository by `create-next-app` and has an
initial commit already.

```bash
gh repo create cheeky-media --private --source=. --remote=origin
git push -u origin main
```

Or create the repository in the GitHub UI and then:

```bash
git remote add origin git@github.com:<org>/cheeky-media.git
git push -u origin main
```

Branch strategy, kept simple because the team is small:

- `main` deploys to production
- Feature branches open a pull request, which gets its own Vercel preview URL
- Content changes go through the CMS and need no branch at all

## Vercel setup

Import the GitHub repository at vercel.com/new, then confirm these settings.
Vercel detects most of them correctly, but check rather than assume.

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Root directory | `cheeky-media` (the repository root if you push the project folder itself) |
| Build command | `pnpm build` |
| Install command | `pnpm install` |
| Output directory | **Leave blank.** Next.js manages this. Setting it breaks the build. |
| Node version | 20.x or 22.x |

Do not add a `vercel.json`. Nothing in this project needs one, and an
unnecessary config file is a thing that silently goes stale.

The root directory setting depends on how you push. If the repository root is
the `cheeky-media` folder, leave root directory blank. If you push the parent
folder, set it to `cheeky-media`.

## Environment variables

Copy `.env.example` to `.env.local` for local work, and add the same keys in
Vercel under Settings, Environment Variables.

| Variable | Required | Environments | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For the CMS | All | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | For the CMS | All | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | All | Defaults to `2024-10-01` |
| `RESEND_API_KEY` | For form delivery | Production, Preview | Without it, submissions are logged and lost |
| `CONTACT_TO_EMAIL` | No | All | Defaults to admin@cheekymedia.co.za |
| `CONTACT_FROM_EMAIL` | No | All | Must be on a domain verified in Resend |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Production only | See TRACKING_PLAN.md |

Two things worth knowing. Anything prefixed `NEXT_PUBLIC_` is embedded in the
browser bundle and is public, so never put a secret behind that prefix. And
changing a variable in Vercel does not update the running deployment; you have
to redeploy for it to take effect.

Keep `NEXT_PUBLIC_GA_MEASUREMENT_ID` out of Preview so that test traffic does
not end up in the production analytics property.

## Sanity setup

1. Create a project at https://sanity.io/manage
2. Copy the project ID into `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Under API, add CORS origins for `http://localhost:3000`, the Vercel
   production domain, and `https://*.vercel.app` for previews. Tick "allow
   credentials" for each.
4. Invite the people who will publish, under Members. Editor is the right role
   for most of them; Administrator only for whoever manages the project.
5. Redeploy so the environment variables take effect

The studio is then live at `/studio` on the deployed site. Editors sign in with
their Sanity account. The route is set to `noindex` and is disallowed in
`robots.txt`, so it stays out of search results.

New posts and work appear on the site within 60 seconds, because the journal and
work pages revalidate on that interval.

## Resend setup

1. Create an account at https://resend.com
2. Add and verify the sending domain. This means DNS records, so it needs
   whoever controls the domain.
3. Create an API key and add it as `RESEND_API_KEY`
4. Set `CONTACT_FROM_EMAIL` to an address on the verified domain
5. Redeploy, then submit the form on the live site and confirm the response
   includes `delivered: true`

Until this is done the form appears to work but delivers nothing. Do not launch
without testing it.

## Deploying

Every push to `main` deploys to production automatically. Every pull request
gets a preview URL.

To redeploy without a code change, for example after changing an environment
variable, use the Vercel dashboard: Deployments, then the three dot menu on the
latest one, then Redeploy. Or:

```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push
```

To roll back, find the previous good deployment in the Vercel dashboard and
Promote to Production. It is instant, because the build already exists.

## Domain

Add the domain in Vercel under Settings, Domains, then point DNS at Vercel.
Which domain to use is still open, see `ASSUMPTIONS.md`.

Before the DNS change, write the redirect map from the old WordPress URLs. The
structure changed:

| Old | New |
|---|---|
| `/portfolio/<slug>/` | `/work/<slug>` |
| `/portfolio-2/` | `/work` |
| `/portfolio-category/<cat>/` | `/work` |
| `/about-us/` | `/about` |
| `/contact-us/` | `/contact` |
| `/video-production/` | `/services/video-production` |
| `/brand-integration/` | `/services/brand-integration` |
| `/digital-media/` | `/services/digital-media` |
| `/corporate/` | `/services/corporate` |
| `/test/` | `/` |

These go in `next.config.ts` as permanent redirects:

```ts
async redirects() {
  return [
    { source: "/about-us", destination: "/about", permanent: true },
    { source: "/portfolio/:slug", destination: "/work/:slug", permanent: true },
    // ...
  ];
}
```

Note that the portfolio slugs mostly carry across unchanged, but two were merged
(`cop-a-half` into `cop-and-a-half`, and `dungeon` into `the-dungeon`), so those
two need explicit entries.

## Post-launch checks

- Submit the form and confirm the email arrives
- Check `/sitemap.xml` and `/robots.txt` respond
- Submit the sitemap in Search Console
- Publish a test post in the studio and confirm it appears within a minute
- Run Lighthouse on mobile
- Watch Search Console Coverage for a fortnight and patch redirect gaps
