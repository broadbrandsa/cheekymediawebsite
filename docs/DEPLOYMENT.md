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

## GitHub

The repository is live at
**https://github.com/broadbrandsa/cheekymediawebsite**, on the `main` branch.
The project folder is the repository root, so `package.json` sits at the top
level. That matters for the Vercel root directory setting below.

Note the repository is **public**. There are no secrets in it (every key comes
from environment variables, and `.env.local` is gitignored), so this is safe,
but it does mean the code and this documentation are readable by anyone. If that
is not wanted, switch it to private in the repository settings.

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
| Root directory | **Leave blank.** `package.json` is at the repository root. |
| Build command | `pnpm build` |
| Install command | `pnpm install` |
| Output directory | **Leave blank.** Next.js manages this. Setting it breaks the build. |
| Node version | 20.x or 22.x |

Do not add a `vercel.json`. Nothing in this project needs one, and an
unnecessary config file is a thing that silently goes stale.

When importing, Vercel will detect Next.js and pnpm on its own. The only setting
worth checking by hand is Output Directory, which must stay empty.

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

**The project already exists and is connected locally.**

| | |
|---|---|
| Project | Cheeky Media |
| Project ID | `rcfto3ru` |
| Dataset | `production` |
| Studio | `/studio` on whatever domain the site is running on |
| Manage | https://www.sanity.io/manage/project/rcfto3ru |

`sanity.cli.ts` holds the project id so CLI commands work without flags. The id
is public, not a secret, which is why it is committed.

### Still to do

1. **Add the environment variables in Vercel.** `.env.local` is gitignored, so
   the deployed site does not have them yet and will fall back to the migrated
   catalogue until it does:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=rcfto3ru
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

2. **Add CORS origins for the deployed domains.** `http://localhost:3000` is
   already allowed. After the first deploy, add the production domain and the
   preview wildcard:

   ```bash
   npx sanity cors add https://your-domain.com --credentials
   npx sanity cors add https://your-project.vercel.app --credentials
   ```

3. **Invite the people who will publish**, under Members at the manage link
   above. Editor is the right role for most; Administrator only for whoever
   owns the project.

### Verified working

The full round trip was tested with real documents, published through the API
and confirmed rendering on the site, then deleted:

- A journal post appeared on `/journal` and its own page, with body and author.
- A work item appeared on `/work`, on the homepage featured strip, and on its
  own page, with the rich text body, the Sanity CDN image, the parsed YouTube
  video and its categories.
- After deletion the site fell back cleanly to the 32 migrated work items and
  the journal empty state.

One thing that testing caught: `next.config.ts` had no `remotePatterns`, so
`next/image` rejected every Sanity CDN URL and any page with a CMS image
returned a 500. Fixed, but it would not have shown up without a live project.

One stray asset remains in the dataset from that test, the uploaded socrati.jpg.
It is unreferenced and harmless; delete it in the studio under Media if you
want a clean slate.

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

**The redirects are implemented** in `next.config.ts` and tested. Every URL the
old WordPress site exposed lands somewhere sensible, with or without a trailing
slash, which matters because that is how Google has them indexed.

| Old | New |
|---|---|
| `/portfolio/<slug>/` | `/work/<slug>` |
| `/portfolio/cop-a-half/` | `/work/cop-and-a-half` (merged duplicate) |
| `/portfolio/dungeon/` | `/work/the-dungeon` (merged duplicate) |
| `/portfolio/`, `/portfolio-2/` | `/work` |
| `/portfolio-category/<cat>/` | `/work` |
| `/about-us/` | `/about` |
| `/contact-us/` | `/contact` |
| `/video-production/` | `/services/video-production` |
| `/brand-integration/` | `/services/brand-integration` |
| `/digital-media/` | `/services/digital-media` |
| `/corporate/` | `/services/corporate` |
| `/test/` | `/` |

All are 308 permanent redirects, so search engines transfer ranking rather than
treating the new URLs as unrelated pages.

## Images do not use Vercel's optimizer

Vercel meters image optimization, and the Hobby plan's allowance ran out.
Every `/_next/image` request started returning **402
OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED**, so no image on the site loaded.

`src/lib/image-loader.ts` is a custom `next/image` loader wired up in
`next.config.ts`. Sanity URLs get width, quality and `auto=format` appended so
its own CDN does the resizing and format conversion; local files in `/public`
are returned untouched, since they are already compressed.

Nothing is lost by this. Sanity's CDN was already doing the work, so sending
its output through a second optimizer was duplication. It also means the site
no longer consumes a metered resource, so this will not recur.

If you ever move to a Vercel plan with a larger allowance and want the built-in
optimizer back, delete `loader` and `loaderFile` from `next.config.ts`. The
`remotePatterns` entry is already there and would take over.

## Post-launch checks

- Submit the form and confirm the email arrives
- Check `/sitemap.xml` and `/robots.txt` respond
- Submit the sitemap in Search Console
- Publish a test post in the studio and confirm it appears within a minute
- Run Lighthouse on mobile
- Watch Search Console Coverage for a fortnight and patch redirect gaps
