import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, coverImage, publishedAt, author, tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, coverImage, publishedAt, author, tags, body
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const projectsQuery = groq`
  *[_type == "project" && defined(slug.current)] | order(order asc, _createdAt desc) {
    _id, title, "slug": slug.current, kicker, categories, client, year,
    coverImage, summary, videoUrl, featured
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc)[0...6] {
    _id, title, "slug": slug.current, kicker, categories, client, year,
    coverImage, summary, videoUrl
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, kicker, categories, client, year,
    coverImage, summary, videoUrl, body
  }
`;
