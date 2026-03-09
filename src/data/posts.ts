/**
 * Blog posts slot — plug in CMS or markdown later.
 */
export type Post = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  mood: "building" | "health" | "life";
  tags: string[];
};

export const examplePosts: Post[] = [
  {
    id: "1",
    title: "First 10K in the books",
    date: "2024-02-15",
    excerpt: "How I trained for and ran my first 10K. Consistency beat speed.",
    slug: "first-10k",
    mood: "health",
    tags: ["running", "discipline"],
  },
  {
    id: "2",
    title: "Morning routine and running",
    date: "2024-01-28",
    excerpt: "Waking up early to run: what worked and what didn't.",
    slug: "morning-routine-running",
    mood: "life",
    tags: ["routine", "mindset"],
  },
  {
    id: "3",
    title: "Recovery days matter",
    date: "2024-01-10",
    excerpt: "Why I stopped running every day and got faster.",
    slug: "recovery-days",
    mood: "health",
    tags: ["recovery", "training"],
  },
  {
    id: "4",
    title: "Building in public, one sprint at a time",
    date: "2024-03-01",
    excerpt: "A short update on balancing client work with experimental side projects.",
    slug: "building-in-public",
    mood: "building",
    tags: ["shipping", "learning"],
  },
];
