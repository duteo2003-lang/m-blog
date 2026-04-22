import Slugger from 'github-slugger';
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Converts a string into a URL-friendly slug.
 * Example: "Hello World: This is Next.js!" -> "hello-world-this-is-nextjs"
 */
export function slugify(text: string): string {
  const slugger = new Slugger();
  return slugger.slug(text);
}