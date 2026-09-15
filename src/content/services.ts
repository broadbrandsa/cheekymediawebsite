export type Service = {
  slug: string;
  title: string;
  short: string;
  /** Background still for the expandable panel on the homepage.
   *  Placeholders borrowed from the work catalogue, to be replaced. */
  image: string;
  intro: string[];
  offerings: { title: string; body: string }[];
  why: string;
};

export const services: Service[] = [
  {
    slug: "video-production",
    title: "Video Production",
    image: "/images/work/tms.jpg",
    short:
      "Live television, commercials, film and branded content, shot and finished in our own facilities.",
    intro: [
      "We have been making television since 2014, and the equipment is ours. Studios, green screen, sound booths, post suites, cameras. That matters more than it sounds, because it means we can move fast, keep budgets honest, and fix things on the day instead of booking another facility and another week.",
      "The work ranges from a live weekday show on ETV to a thirty second spot to a feature film. Same crew mentality either way. Turn up prepared, shoot it properly, deliver on time.",
    ],
    offerings: [
      {
        title: "Live and studio television",
        body: "Multi-camera studio production, live broadcast, magazine shows and talk formats. We run The Morning Show on ETV, so the pressure of a daily live slot is familiar territory rather than a new risk.",
      },
      {
        title: "Commercials",
        body: "Concept through to final grade. We handle casting, location, crew and post, and we build the cutdowns for every platform you need at the same time rather than coming back for them later.",
      },
      {
        title: "Film and long form",
        body: "Features, pilots and documentary. Development, production and delivery to broadcaster and festival spec.",
      },
      {
        title: "Post production",
        body: "Edit, grade, sound design, original music and motion graphics, all in house. Your footage does not leave the building.",
      },
    ],
    why: "Because owning the kit changes the maths. You are not paying a markup on hired facilities, and when a shoot runs long or a client wants one more version, we are not watching a rental clock. We treat your budget like it is ours.",
  },
  {
    slug: "brand-integration",
    title: "Brand Integration",
    image: "/images/work/barcelo.jpg",
    short:
      "Putting your brand inside content people already choose to watch, in a way that does not make them wince.",
    intro: [
      "Attention is the scarce thing now. People skip ads, block ads, and pay money specifically to avoid ads. So the interesting question stopped being how to interrupt an audience and became how to be part of the thing they came for.",
      "That is what we do. Scripted TV, reality, digital series, podcasts, live events. Your brand shows up where it belongs and the audience does not feel sold to.",
    ],
    offerings: [
      {
        title: "Product placement",
        body: "Brand appearances across film, TV, YouTube and social that people actually remember. We line up visibility with the story beats, which is the whole difference between a placement that works and one that makes everyone cringe.",
      },
      {
        title: "Branded entertainment",
        body: "Content where the brand is the reason to watch rather than the price of watching. Talk show segments, cooking series, reality formats, documentary. It builds equity slowly and it sticks.",
      },
      {
        title: "Scripted and reality partnerships",
        body: "We produce our own shows, so we can build integration into a format from the first treatment. Wardrobe, set dressing, storyline, all of it. Audiences never notice the detail and that is exactly the point.",
      },
    ],
    why: "Modern audiences are fluent in advertising and they can smell a bolt-on from a mile away. Integration that respects the content earns you affinity and retention instead of a skipped impression.",
  },
  {
    slug: "digital-media",
    title: "Digital Media",
    image: "/images/work/mtn-montage.jpg",
    short:
      "Social, performance, creators and campaigns, built to move people rather than just count them.",
    intro: [
      "Digital is not a channel you bolt onto a TV campaign anymore. It is usually where the audience lives, and the content has to be made for it rather than cut down to fit it.",
      "We work from strategy through to daily execution, and we stay close to the numbers so the creative keeps getting sharper instead of just louder.",
    ],
    offerings: [
      {
        title: "Social media management and content",
        body: "Daily content for Instagram, TikTok, Facebook, YouTube and X. Short video, campaign work, community management. Made for each platform rather than reposted across all of them.",
      },
      {
        title: "Performance marketing",
        body: "Paid campaigns across Meta, Google and programmatic, with creative built for conversion rather than handed over as an afterthought. We report on what it returned, not just what it reached.",
      },
      {
        title: "Influencer and creator work",
        body: "Macro, micro and nano creators picked because they fit your brand, not because their follower count looks good in a deck. We run the whole thing from idea to rollout to reporting.",
      },
      {
        title: "Campaign development",
        body: "Insight, concept, production and rollout in one place, with room to adjust while the campaign is live.",
      },
    ],
    why: "We are led by what audiences are actually doing, which we watch closely across analytics, platform behaviour and the tools that keep changing every quarter. Metrics are useful, but relatability is what moves people.",
  },
  {
    slug: "corporate",
    title: "Corporate",
    image: "/images/work/sauceland.jpg",
    short:
      "Internal comms, corporate films, event content and the work that makes a big organisation sound human.",
    intro: [
      "Corporate video has a reputation, and mostly it is deserved. Too long, too careful, nobody watches it to the end.",
      "We make the version people finish. Same governance, same approvals, but written and shot like something you would choose to watch.",
    ],
    offerings: [
      {
        title: "Corporate films and brand stories",
        body: "The film that explains who you are to a client, a regulator or a new hire. Clear, well made, and short enough to hold.",
      },
      {
        title: "Internal communications",
        body: "Leadership messages, culture and training content, change comms. Built so staff actually engage instead of scrolling past.",
      },
      {
        title: "Event and conference content",
        body: "Stage content, live capture, highlight reels and social cutdowns delivered while the event still matters.",
      },
      {
        title: "Case studies and testimonials",
        body: "Real customers, filmed properly, edited so the proof comes through without the script showing.",
      },
    ],
    why: "We have done this for Vodacom, Nestlé, Nedbank, MTN, FNB and SA Tourism. Big organisations have real constraints, and we work inside them without letting the output go flat.",
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
