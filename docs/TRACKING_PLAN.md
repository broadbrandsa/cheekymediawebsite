# Tracking Plan

Nothing is tracking yet. No analytics script ships, no cookies are set, and the
site currently needs no consent banner. This document is the plan for switching
measurement on, and the moment you do, revisit the consent question.

## What is worth measuring

The site has one commercial job: turn a visitor into an enquiry. Almost
everything below exists to answer whether that is happening and where it breaks.

### Primary conversion

**Contact form submission.** The only true conversion on the site.

### Secondary conversions

Signals that someone is seriously evaluating, short of filling in the form:

- Clicking the phone number
- Clicking the email address
- Reaching `/contact` at all

### Engagement

Useful for understanding what the work is doing, not for judging success:

- Which work items get opened
- Which category filters get used
- Which service pages get read
- Journal reading depth

## Google Analytics 4

Placeholder is already wired. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel,
then add the script. The recommended approach on Next.js 16:

```bash
pnpm add @next/third-parties
```

```tsx
// src/app/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// inside <body>, after {children}
{GA_ID && <GoogleAnalytics gaId={GA_ID} />}
```

The conditional matters. Without it, preview deployments and local development
pollute production data.

## Event tracking

Events to define, using GA4 naming conventions (snake_case, verb first where it
reads naturally):

| Event | Fires when | Parameters | Why |
|---|---|---|---|
| `generate_lead` | Contact form returns success | `form_location` (contact page, or the section that linked there) | The conversion. GA4 treats this name as a key event by default. |
| `form_start` | First field on the contact form gets focus | none | Pair with `generate_lead` to get a form abandonment rate. If people start and do not finish, the form is the problem. |
| `form_error` | The API returns a validation error | `error_type` | Catches a form that is rejecting people wrongly. |
| `click_phone` | Phone link clicked | `location` (header, footer, contact, cta) | On mobile this is often a higher intent signal than the form. |
| `click_email` | Email link clicked | `location` | Same. |
| `view_work_item` | A `/work/[slug]` page loads | `work_slug`, `work_category` | Tells you which work sells. Feeds the decision about what to feature. |
| `filter_work` | A category chip is clicked | `category` | Tells you what people came looking for. |
| `view_service` | A `/services/[slug]` page loads | `service_slug` | Which service line pulls demand. |
| `cta_click` | Any "Start a project" button clicked | `location` | Which CTA placement earns its spot. |

Implementation note: the click events belong in the components that own the
interaction. `work-grid.tsx` already has the filter handler, `contact-form.tsx`
already has the submit and error branches, so each is a one-line addition at a
point where the state is already known.

## Form submission tracking

The contact flow has three outcomes and all three are worth seeing:

1. **Success.** `/api/contact` returns `{ ok: true }` and the form swaps to the
   thank you state. Fire `generate_lead` there, in the client, not in the API
   route. Server-side firing misses the client context and double-counts retries.
2. **Validation error.** Fire `form_error` with the reason.
3. **Delivery failure.** The API returns 502 when Resend rejects the send. This
   one matters more than the analytics event: it means an enquiry was lost.
   Worth a real alert rather than a metric.

Note the current fallback behaviour. With no `RESEND_API_KEY` set, the route
logs the submission and returns `{ ok: true, delivered: false }`. That keeps
development from throwing, but **it means a form submission in production
without a key configured is silently dropped.** Check `delivered: true` in the
response during launch testing.

## Vercel Analytics

Worth turning on alongside GA4 rather than instead of it. It covers the thing
GA4 handles poorly, which is real user performance data, and it needs no cookie.

```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

```tsx
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// inside <body>
<Analytics />
<SpeedInsights />
```

Speed Insights is the one to watch here. The audience is largely mobile on
variable connections, and Core Web Vitals from real South African devices will
tell you more than a Lighthouse score run on a laptop in an office.

## Conversion goals

Set these up in GA4 once data is flowing. Targets are starting points to
calibrate after a month of real numbers, not commitments.

| Goal | Measure | Starting target |
|---|---|---|
| Enquiry rate | `generate_lead` / sessions | 1.5% to 3% is a reasonable band for a B2B production company |
| Contact page conversion | `generate_lead` / `/contact` pageviews | 15% or better. Below 10% means the form or the page is fighting people. |
| Form completion | `generate_lead` / `form_start` | 60% or better. Lower means the form is too long or something is rejecting input. |
| Work engagement | Sessions with a `view_work_item` | 40% or better. The work is the argument, so people should be reaching it. |
| Mobile parity | Mobile enquiry rate vs desktop | Within 30% of each other. A big gap is usually a mobile UX problem, not an audience difference. |

## Search Console

Not analytics, but it belongs in the same setup pass:

- Verify the property on the launch domain
- Submit `/sitemap.xml`
- Watch Coverage closely for the first fortnight after launch, because the URL
  structure changed from the WordPress site and the redirect map is the thing
  most likely to have gaps

## Privacy

Once GA4 is live the site sets cookies, and POPIA applies to South African
visitors. At that point you need a consent mechanism, and GA4 should be
configured with IP anonymisation and consent mode. Vercel Analytics on its own
does not set cookies, so if you want measurement without the consent overhead,
starting with Vercel only is a legitimate option.
