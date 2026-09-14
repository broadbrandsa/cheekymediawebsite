export type WorkCategory =
  | "TV"
  | "Film"
  | "Digital"
  | "Corporate"
  | "Commercials";

export type WorkItem = {
  slug: string;
  title: string;
  kicker?: string;
  categories: WorkCategory[];
  image: string;
  summary: string;
  body?: string[];
  year?: number;
  client?: string;
  /** YouTube video id, from the Cheeky Media channel. */
  videoId?: string;
  /** Self-hosted clip in /public, used where there is no YouTube upload. */
  videoFile?: string;
};

export const workCategories: WorkCategory[] = [
  "TV",
  "Film",
  "Digital",
  "Corporate",
  "Commercials",
];

export const work: WorkItem[] = [
  {
    slug: "the-man-cave",
    title: "The Man Cave",
    kicker: "You know the drill, Sergeant.",
    categories: ["TV", "Film"],
    image: "/images/work/the-man-cave.jpg",
    videoFile: "/images/video/the-man-cave-intro.mp4",
    summary:
      "Eight seasons of cars, kit, challenges and banter. The toys that make grown men wish they had a lot more disposable everything.",
    body: [
      "Tune in to The Man Cave to see the toys that make boys wish they had a lot more disposable everything. Cars racing, cars being built, cars crashing. Adrenalin challenges, movie stars, good food, good drink and the occasional very bad idea.",
      "Season eight and still going, which tells you most of what you need to know about the format.",
    ],
  },
  {
    slug: "cop-and-a-half",
    title: "Cop & A Half",
    kicker: "SA's wildest action comedy",
    categories: ["Film", "TV"],
    image: "/images/work/cop-and-a-half.jpg",
    videoId: "kSm5YA3vxeQ",
    summary:
      "A by-the-book cop, a smooth-talking informant, and the Johannesburg underworld between them.",
    body: [
      "In the heart of Johannesburg, a mismatched duo takes the crime fighting scene by storm. When a by-the-book cop gets reluctantly paired with a smooth talking informant, sparks fly as they work their way through the drug trade.",
      "Unlikely camaraderie, a ruthless gang to chase, and a fair amount of chaos and laughter left behind them.",
    ],
  },
  {
    slug: "aesthetic-empire",
    title: "Aesthetic Empire",
    kicker: "Dr. Reza",
    categories: ["TV"],
    image: "/images/work/aesthetic-empire.jpg",
    summary:
      "A reality series following Dr. Reza Mia, a world-renowned aesthetic doctor, and the clinic he runs.",
    body: [
      "Dr. Reza Mia: Aesthetic Empire follows the life of a world renowned aesthetic doctor at the top of his field. The series gets inside the high-stakes business of running a thriving practice, and it moves between drama, humour and some genuinely tender moments.",
      "Transformative procedures, patient stories, the daily mess of managing a busy clinic. Expect glamorous results, unexpected conflict, a lot of laughing and the occasional tear, because the show is really about the human side of beauty and ambition.",
    ],
  },
  {
    slug: "anyone-ask-for-an-upgrade",
    title: "Anyone ask for an upgrade?",
    kicker: "eXchange it!",
    categories: ["Digital"],
    image: "/images/work/anyone-ask-for-an-upgrade.jpg",
    summary:
      "A game show that trades the old for the smart, and drops real upgrades into homes across Mzansi.",
    body: [
      "Dreaming of access to the internet of things? Dreams can become reality. eXchange it! gives ordinary people across Mzansi the chance to swap the old for something newer and smarter.",
      "The show pushes families into the fifth industrial revolution by bringing upgrades and connectivity straight into their homes. Stakes are high and only some will win, in a format where teamwork and ubuntu sit side by side. It is fun, it is funny, and it keeps audiences glued.",
    ],
  },
  {
    slug: "wingin-it",
    title: "Wingin' it",
    kicker: "SA's most misguided travel show",
    categories: ["Film"],
    image: "/images/work/wingin-it.jpg",
    summary:
      "Siv Ngesi and Jonathan Boynton Lee get 48 hours in each city, with no plan whatsoever.",
    body: [
      "What is the most stressful thing about a holiday? The holiday itself. Itineraries, bookings, traffic, missed flights, the list goes on.",
      "Throw all of that out the tour bus window and join best mates Siv Ngesi and Jonathan Boynton Lee as they travel the world, spending 48 adventure-filled hours in each city. No plans, no timetables, just two friends winging it and hunting down the best food and fun a place has to offer.",
    ],
  },
  {
    slug: "hitch-or-ditch",
    title: "Hitch or Ditch",
    kicker: "Need a ride?",
    categories: ["Film"],
    image: "/images/work/hitch-or-ditch.jpg",
    summary:
      "A dating show with physical challenges, exotic locations, and one suitor who knows all her secrets.",
    body: [
      "Hitch or Ditch is the antidote to the stale date. Our hopeful bachelorette goes looking for love and adventure in exotic places, joined by one suitor, or two, or three, and one of them knows all her dirty little secrets.",
      "Hitch or ditch? That is her call, but nobody knows what the next contestant is bringing. An adrenaline-filled dating format where the decisions are just as terrifying as the challenges.",
    ],
  },
  {
    slug: "out-of-office",
    title: "Out of Office",
    kicker: "What could possibly go wrong?",
    categories: ["TV"],
    image: "/images/work/out-of-office.jpg",
    summary:
      "Ten successful entrepreneurs, stripped of every resource, dropped in the wilderness.",
    body: [
      "From the shark tank to shark-infested waters. From the wolf of Wall Street to a pup struggling to survive on its own. Out of Office takes ten successful entrepreneurs and dumps them in the wilderness, where they quickly discover they cannot build a ladder, let alone climb one.",
      "Stripped of resources and power, they have to lean on teamwork, adaptability and their own creativity to get through the physical and mental challenges coming their way. The winner heads back to the boardroom with a new set of skills, and if they are lucky, a shower and clean clothes.",
    ],
  },
  {
    slug: "the-russian-exchange",
    title: "The Russian Exchange",
    kicker: "готовы?",
    categories: ["Digital", "Film"],
    image: "/images/work/the-russian-exchange.jpg",
    summary:
      "A South African and a Russian swap continents, and both of them come back changed.",
    body: [
      "Travel is fatal to prejudice, bigotry and narrow-mindedness, as Mark Twain put it. If travel really does broaden the mind, our two adventurers are about to have theirs blown wide open.",
      "In The Russian Exchange, a South African and a Russian traveller swap continents. St Petersburg's cold landscapes, the food, the history and the warmth of Russian hospitality on one side. Durban's sunny coast, Zulu tradition and South African friendliness on the other. The show quietly proves that however different we think we are, we are mostly the same underneath.",
    ],
  },
  {
    slug: "the-dungeon",
    title: "The Dungeon",
    kicker: "Dare to be 1% better",
    categories: ["TV", "Digital"],
    image: "/images/work/the-dungeon.jpg",
    videoId: "LlDZLP749Ew",
    summary:
      "A transformation format about getting out of the grind and becoming the person you meant to be.",
    body: [
      "Caught in the grind? Weight creeping up? No time for gym, no time for the kids, too busy to take five minutes for yourself? Have a look in the mirror. You know who that is. That is your own worst enemy.",
      "Time to become the person you actually want to be. Take a breath and step into The Dungeon, where the body is only part of what changes.",
    ],
  },
  {
    slug: "the-morning-show",
    title: "The Morning Show",
    categories: ["TV", "Digital"],
    image: "/images/work/the-morning-show.jpg",
    videoId: "ezojdXvcSSI",
    client: "ETV",
    summary:
      "A live weekday show on ETV, produced by us. The daily discipline that keeps the rest of the slate sharp.",
    body: [
      "Live television every weekday leaves nowhere to hide. Guests change, stories break, and the clock does not move. We produce it end to end, and the habits it builds across the crew show up in everything else we shoot.",
    ],
  },
  {
    slug: "tongue-in-cheek",
    title: "Tongue in Cheek",
    categories: ["TV"],
    image: "/images/work/tongue-in-cheek.jpg",
    videoId: "rv_yJnqpKPo",
    summary: "Studio-based entertainment, produced in house.",
  },
  {
    slug: "tms",
    title: "TMS",
    categories: ["TV"],
    image: "/images/work/tms.jpg",
    videoId: "VF_OnT9mWwE",
    summary: "Series production for broadcast.",
  },
  {
    slug: "shes-the-one",
    title: "She's the One",
    categories: ["TV"],
    image: "/images/work/shes-the-one.jpg",
    videoId: "vgm0chFmDKM",
    summary: "Entertainment format built around one woman and a lot of choices.",
  },
  {
    slug: "real-talk",
    title: "Real Talk",
    categories: ["TV"],
    image: "/images/work/real-talk.jpg",
    videoId: "pU21x_oxhwM",
    summary: "Conversation-led television, shot in our studios.",
  },
  {
    slug: "ovakandr",
    title: "Ovakandr",
    categories: ["TV"],
    image: "/images/work/ovakandr.jpg",
    videoId: "belwo1dNQn0",
    summary: "Series production for broadcast.",
  },
  {
    slug: "on-the-fly-promo",
    title: "On the Fly",
    categories: ["TV"],
    image: "/images/work/on-the-fly-promo.jpg",
    videoId: "Joz1hD_0exg",
    summary: "Promo package cut for broadcast.",
  },
  {
    slug: "mtv-vj-search",
    title: "MTV VJ Search",
    categories: ["TV"],
    image: "/images/work/mtv-vj-search.jpg",
    videoId: "kUct9Nol5k0",
    client: "MTV",
    summary: "Talent search format produced for MTV.",
  },
  {
    slug: "cooking-with-the-fakirs",
    title: "Cooking with the Fakirs",
    categories: ["TV"],
    image: "/images/work/cooking-with-the-fakirs.jpg",
    videoId: "Rg8ZqIdD9Yw",
    summary: "A food series with a family at the centre of it.",
  },
  {
    slug: "china-diaries-promo",
    title: "China Diaries",
    categories: ["TV"],
    image: "/images/work/china-diaries-promo.jpg",
    summary: "Travel series promo, cut for broadcast.",
  },
  {
    slug: "biting-about",
    title: "Biting About",
    categories: ["TV"],
    image: "/images/work/biting-about.jpg",
    videoId: "hHgnC5IgJpI",
    summary: "Food and culture series promo.",
  },
  {
    slug: "art-meet-science",
    title: "Art Meet Science",
    categories: ["Digital"],
    image: "/images/work/art-meet-science.jpg",
    videoId: "LiBL79u1rRk",
    client: "Dr. Reza Mia",
    summary: "Digital content series bridging aesthetics and medicine.",
  },
  {
    slug: "dimpie-the-movie",
    title: "Dimpie The Movie",
    categories: ["Film"],
    image: "/images/work/dimpie-the-movie.jpg",
    videoId: "G2DBEzCVMxw",
    summary: "Feature film production.",
  },
  {
    slug: "revelations-pilot-for-vodacom",
    title: "Revelations",
    categories: ["Corporate", "Film"],
    image: "/images/work/revelations-pilot-for-vodacom.jpg",
    videoId: "7k2ufAtfS5Q",
    client: "Vodacom",
    summary: "Pilot produced for Vodacom, with an online promo cut alongside it.",
  },
  {
    slug: "revelations-promo-online",
    title: "Revelations Promo",
    categories: ["Film"],
    image: "/images/work/revelations-promo-online.jpg",
    videoId: "VvESSgZqwgA",
    client: "Vodacom",
    summary: "Online promo for the Revelations pilot.",
  },
  {
    slug: "synctv-montage-from-xtv-to-synctv",
    title: "XTV to SyncTV",
    categories: ["Film", "Corporate"],
    image: "/images/work/synctv-montage-from-xtv-to-synctv.jpg",
    videoId: "xpoW4rapdms",
    client: "SyncTV",
    summary: "A rebrand montage tracking the move from XTV to SyncTV.",
  },
  {
    slug: "synctv-competitions-video-june-2024",
    title: "SyncTV Competitions",
    categories: ["Film", "Corporate"],
    image: "/images/work/synctv-competitions-video-june-2024.jpg",
    client: "SyncTV",
    year: 2024,
    summary: "Competitions campaign video, June 2024.",
  },
  {
    slug: "fnb-synctv",
    title: "FNB on SyncTV",
    categories: ["Corporate", "Digital"],
    image: "/images/work/fnb-synctv.jpg",
    videoId: "Bk0PIIKF5n0",
    client: "FNB",
    summary: "Brand integration work for FNB across the SyncTV platform.",
  },
  {
    slug: "socrati",
    title: "Socrati",
    categories: ["Commercials"],
    image: "/images/work/socrati.jpg",
    videoId: "_0YYLpKcFmg",
    summary: "Commercial production, concept through to delivery.",
  },
  {
    slug: "african-bank",
    title: "African Bank",
    categories: ["Commercials", "Digital"],
    image: "/images/work/african-bank.jpg",
    videoId: "W0UGT3aCL4M",
    client: "African Bank",
    summary:
      "Commercial campaign with six second cutdowns built for digital placement.",
  },
  {
    slug: "sauceland",
    title: "Sauceland",
    categories: ["Corporate"],
    image: "/images/work/sauceland.jpg",
    videoId: "fjCctdLuftc",
    summary: "Corporate brand film.",
  },
  {
    slug: "mtn-montage",
    title: "MTN Montage",
    categories: ["Digital", "Corporate"],
    image: "/images/work/mtn-montage.jpg",
    videoId: "6qzDoQLCC8M",
    client: "MTN",
    summary: "Montage cut from MTN campaign work.",
  },
  {
    slug: "barcelo",
    title: "Barceló",
    categories: ["Corporate"],
    image: "/images/work/barcelo.jpg",
    videoId: "VnoRH4QqLcw",
    client: "Barceló",
    summary: "Corporate video with a short-form version for social.",
  },
];

export const workBySlug = (slug: string) => work.find((w) => w.slug === slug);

export const workByCategory = (cat: WorkCategory | "All") =>
  cat === "All" ? work : work.filter((w) => w.categories.includes(cat));
