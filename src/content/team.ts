export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

// NOTE: roles are not published on the current site. These are placeholders
// and need confirming before launch. See docs/ASSUMPTIONS.md.
export const team: TeamMember[] = [
  {
    name: "Yusuf Stevens",
    role: "Leadership",
    image: "/images/team/yusuf-stevens.png",
  },
  {
    name: "Mathilda Essop",
    role: "Leadership",
    image: "/images/team/mathilda-essop.png",
  },
  {
    name: "Odette van der Haar",
    role: "Leadership",
    image: "/images/team/odette-van-der-haar.png",
  },
];
