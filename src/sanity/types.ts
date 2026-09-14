import type { Image, PortableTextBlock } from "sanity";

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: Image & { alt?: string };
  publishedAt: string;
  author?: string;
  tags?: string[];
  body?: PortableTextBlock[];
};

export type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  kicker?: string;
  categories: string[];
  client?: string;
  year?: number;
  coverImage: Image & { alt?: string };
  summary: string;
  videoUrl?: string;
  featured?: boolean;
  body?: PortableTextBlock[];
};
