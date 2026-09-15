export const site = {
  name: "Cheeky Media",
  tagline: "Your brand is more than a logo",
  taglineAccent: "It's a story, and we're here to tell it",
  description:
    "Cheeky Media is a Johannesburg content production company. We make TV, film, commercials and digital work for brands and broadcasters across Africa.",
  url: "https://cheekymediaworld.com",
  founded: 2014,
  /** Cheeky Media showreel, from the About page of the old site. */
  showreelId: "sDi4WLVuzfU",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/CheekyMediaSA" },
    { label: "Instagram", href: "https://www.instagram.com/cheeky_studios_sa/" },
    { label: "X", href: "https://x.com/CheekyMediaSA" },
    { label: "YouTube", href: "https://www.youtube.com/@CheekyMedia" },
  ],
  contact: {
    phone: "011 258 4465",
    phoneHref: "tel:+27112584465",
    email: "admin@cheekymedia.co.za",
    address: "43 Central St, Houghton Estate, Johannesburg, 2198",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=43+Central+St+Houghton+Estate+Johannesburg+2198",
  },
  /**
   * Top-level navigation. "Services" has no landing page of its own; it opens
   * a menu straight to the four service pages.
   */
  nav: [
    { label: "Work", href: "/work" },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Video Production", href: "/services/video-production" },
        { label: "Brand Integration", href: "/services/brand-integration" },
        { label: "Digital Media", href: "/services/digital-media" },
        { label: "Corporate", href: "/services/corporate" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
