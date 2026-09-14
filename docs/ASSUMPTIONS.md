# Assumptions

Everything here was inferred while rebuilding the site from the public content
at cheekymediaworld.com. None of it has been confirmed by anyone at Cheeky
Media. Read this before approving the site for launch.

## How the content was gathered

There was no internal data access, no brand guidelines, no analytics, no CRM and
no conversation with the team. Content came from three public sources:

- The WordPress REST API at `/wp-json/wp/v2/` (open to the public)
- The Rank Math sitemaps
- The rendered pages themselves

That means the strategy here is directional. It is a sensible reading of a
company from the outside, and it needs validating against what the business
actually knows about its customers.

## Problems found on the live site

These are real defects on the current production site, not things introduced by
the rebuild.

1. **The Video Production page is unfinished.** It is titled "Digital Media" in
   the page heading, and the body is lorem ipsum: "Divided. May his fill fruit
   was the beginning firmament." It has been live at
   `/video-production/` regardless.
2. **The homepage testimonials are fake.** Two quotes attributed to "Jorge
   Russell" and "Dale Elliott", both placeholder text from the theme demo. They
   have been removed rather than rewritten, because inventing testimonials for a
   real company is not something to do quietly. If there are real client quotes,
   they should go back in.
3. **The "Why Cheeky Media" paragraph is truncated.** It ends mid-sentence on
   "...embedding your brand into a show, we ensure". The rebuilt version
   completes the thought, but the intended ending is a guess.
4. **Duplicate portfolio entries.** "Cop & A Half" appears twice, once under
   Film and once under TV, and "Dungeon" appears twice, once under TV and once
   under Digital. These have been merged into single entries carrying both
   categories. 34 source entries became 32.
5. **The `/test/` page is published** and in the sitemap. It has been dropped.

## Copy that was written rather than migrated

The tone follows the voice already on the About and service pages, which is
direct, a bit dry, confident without being corporate. Specifically written new:

- The homepage hero, intro and section headings
- All four service pages, expanded from the three that had real content
- The **Corporate** service page, which did not exist as a service page at all.
  The old `/corporate/` page was just four portfolio thumbnails. The offering
  described there is inferred from the corporate portfolio work (Barceló,
  Sauceland, MTN, Revelations, FNB) and needs confirming.
- The **Video Production** service page, written from scratch to replace the
  lorem ipsum. Claims made: multi-camera studio work, commercials end to end,
  film and long form, in-house post. All consistent with the About page, but
  confirm before launch.
- Short summaries for the 23 portfolio items that had a title and image only.
  These are deliberately factual and brief because there was nothing to work
  from. They are the weakest copy on the site and the easiest thing to improve.

## Specific facts to verify

| Item | Assumed | Confidence |
|---|---|---|
| Team roles | All three listed as "Leadership" | **Low.** No roles published anywhere on the old site. Yusuf Stevens, Mathilda Essop and Odette van der Haar need real titles. |
| Phone, email, address | 011 258 4465, admin@cheekymedia.co.za, 43 Central St, Houghton Estate | High. Consistent across the homepage, contact page and footer. |
| Founded 2014 | Stated on the About page | High |
| Level 1 BBBEE | Stated on the About page | High, but check the certificate is current |
| Client list | SABC, MultiChoice, ETV, Vodacom, Nestlé, Nedbank, MTN, FNB, SA Tourism, African Bank | Medium. Taken from the About page prose and portfolio credits. Confirm all are cleared for public use. |
| The Morning Show on ETV | Currently in production | Medium. Stated on the About page, but that page may be dated. |
| Portfolio categories | Carried across as published | Medium. Some look arbitrary, for example The Morning Show sitting under Digital rather than TV. |

## Images

All 185 media files were pulled from the WordPress library and 32 portfolio
images are now in `public/images/work/`. Two things to note:

- Several source images are screenshots, named things like
  `Screenshot-2025-11-25-at-15.44.01.png`. They are low resolution and some are
  visibly compressed. Proper stills would lift the work grid noticeably.
- At least one image (The Man Cave) carries a visible "Property of Cheeky Media"
  watermark burned in. That was on the original asset. Worth replacing with a
  clean version.
- No image rights were verified. Assumed Cheeky Media owns or has cleared
  everything in its own media library.

## Things deliberately not carried over

- The Slider Revolution hero video. The source `TMC-S7-INTRO_1.mp4` was
  downloaded and is available if wanted, but a large autoplaying video hurts
  mobile load times and the old one was not loading reliably anyway.
- The testimonials section, for the reason above.
- The `/portfolio-2/` and `/test/` pages.

## Open questions

1. Which domain is the new site launching on, `cheekymediaworld.com` or
   `cheekymedia.co.za`?
2. Are there real client testimonials available?
3. What are the three team members' actual roles, and are there more people who
   should be on the page?
4. Is there a showreel that should sit on the homepage?
5. Who is publishing to the CMS, and how many people need studio access?
