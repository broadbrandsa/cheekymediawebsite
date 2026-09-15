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
   real company is not something to do quietly.

   A placeholder quote card sat on the hero for a while, clearly labelled as
   one. That has now been removed too, so **the site currently carries no
   social proof at all**. Two real client quotes with names and companies would
   be the single highest-value content addition left.
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

- The WordPress featured images were mostly screenshots
  (`Screenshot-2025-11-25-at-15.44.01.png` and similar), at inconsistent sizes
  and aspect ratios. The media library also held the original video thumbnails
  at a clean 1280x720, so **17 of the 32 work images have been swapped to
  those**. All 32 were then re-encoded as progressive JPEG, which took the
  folder from 22MB to 1.9MB.
- **Eight images are still weaker than they should be.** These had no better
  source in the library:
  `the-morning-show` (363x647), `fnb-synctv` (365x499), `wingin-it` (485x276),
  `hitch-or-ditch`, `out-of-office`, `cop-and-a-half`, `anyone-ask-for-an-upgrade`
  and `the-russian-exchange` are all under 500px on their long edge, so they are
  upscaled in the grid and look soft. Replacing these eight with proper stills
  is the single cheapest visual improvement available.
- `the-morning-show` and `fnb-synctv` are vertical social clips. There is no
  landscape still for either, so the grid crops them. Proper 16:9 key art would
  fix it.
- At least one image (The Man Cave) carries a visible "Property of Cheeky Media"
  watermark burned in. That was on the original asset. Worth replacing with a
  clean version.
- No image rights were verified. Assumed Cheeky Media owns or has cleared
  everything in its own media library.

## Video

The old site embedded YouTube videos through Elementor widget settings, where
the URLs sit double-encoded inside a `data-settings` attribute rather than in
the `_vp_format_video_url` meta field the theme provides. That meta field is
empty on all 34 items, which is why a first pass over the REST API finds no
video at all. They were recovered by decoding the widget settings.

**24 of the 32 work items now carry video.** Every id was verified live through
the YouTube oEmbed endpoint, and all of them sit on the
[Cheeky Media channel](https://www.youtube.com/@CheekyMedia).

Two further videos were found outside the portfolio:

- **The Cheeky Media showreel** (`sDi4WLVuzfU`) was embedded on the old About
  page and nowhere else. It now plays from the homepage hero.
- **A shorter Barceló cut** (`JeZjbVir19k`) was on the old Corporate page. Not
  used, since the full version is already on the Barceló work page.

### Items with no video, and why

| Item | Reason |
|---|---|
| Aesthetic Empire, Anyone ask for an upgrade?, Wingin' it, Hitch or Ditch, Out of Office, The Russian Exchange | No video on the old site either. These are the six items that carry full written treatments instead. |
| China Diaries Promo | **The old site links the wrong video.** It points at `hHgnC5IgJpI`, which is the Biting About promo, already used by that item. Left empty rather than repeating the error. |
| SyncTV Competitions June 2024 | **The old site links the wrong video.** It points at `VvESSgZqwgA`, which is Revelations Promo Online, already used by that item. Left empty rather than repeating the error. |

Those last two need the correct YouTube ids from whoever manages the channel.

### How video is handled

Playback uses a click-to-load facade in `src/components/video-player.tsx`. The
poster is our own still, and the YouTube iframe is only created when someone
presses play, so roughly a megabyte of third-party script never loads for the
majority of visitors who do not. Embeds use `youtube-nocookie.com`.

The Man Cave has no YouTube upload but does have a self-hosted intro, which was
on the old site as `TMC-S7-INTRO_1.mp4`. It plays through the same component as
a native `<video>`. **It is 16MB and uncompressed.** That is heavy for a South
African mobile connection and should either be re-encoded or, better, uploaded
to the channel so it matches everything else.

New work added through the CMS takes a full YouTube URL in the `videoUrl`
field; the id is parsed out of it at render time.

## Social profiles

Facebook, Instagram and X were supplied directly. All three resolve, and the
Facebook page title confirms it is the right account ("Cheeky Media South
Africa"); a plain request to Facebook returns 400 because it blocks
non-browser traffic, not because the page is missing.

**YouTube was added on my own initiative.** The channel
(youtube.com/@CheekyMedia) is where all 24 work videos are hosted, so the site
already depends on it, and leaving it out of the social list would have been
odd. Say the word if it should not be listed alongside the others.

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
