export const site = {
  name: "Cheeky Media",
  tagline: "Your brand is more than a logo",
  taglineAccent: "It's a story, and we're here to tell it",
  description:
    "Cheeky Media is a Johannesburg content production company. We make TV, film, commercials and digital work for brands and broadcasters across Africa.",
  url: "https://cheekymediaworld.com",
  founded: 2014,
  contact: {
    phone: "011 258 4465",
    phoneHref: "tel:+27112584465",
    email: "admin@cheekymedia.co.za",
    address: "43 Central St, Houghton Estate, Johannesburg, 2198",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=43+Central+St+Houghton+Estate+Johannesburg+2198",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
