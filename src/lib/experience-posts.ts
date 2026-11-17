import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { workExperience } from "@/lib/work-experience";

export type ExperiencePost = {
  slug: string;
  title: string;
  summary: string;
  html: string;
};

export function experienceSlug(company: string): string {
  return company.toLowerCase().trim().split(/\s+/).join("-");
}

export const experienceSlugs: string[] = workExperience.map((job) => experienceSlug(job.company));

const markdown = new Marked({
  renderer: {
    image({ href, text }) {
      return `<img src="${escapeAttribute(href)}" alt="${escapeAttribute(text)}" loading="lazy">`;
    },
  },
});

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function getExperiencePost(slug: string, dir: string): ExperiencePost | null {
  if (!experienceSlugs.includes(slug)) return null;
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const title = requiredText(data, "title", file);
  const summary = requiredText(data, "summary", file);

  const tokens = markdown.lexer(content);
  const imagesWithoutAlt: string[] = [];
  markdown.walkTokens(tokens, (token) => {
    if (token.type === "image" && token.text.trim() === "") imagesWithoutAlt.push(token.href);
    if (token.type === "html" && /<img\b/i.test(token.raw)) {
      throw new Error(`${file}: write images as a markdown image, ![alt](src), not raw HTML <img> (docs/adr/0007)`);
    }
  });
  if (imagesWithoutAlt.length > 0) {
    throw new Error(
      `${file}: every image needs alt text that says what it shows (docs/adr/0007). Missing on: ${imagesWithoutAlt.join(", ")}`,
    );
  }

  return {
    slug,
    title,
    summary,
    html: markdown.parser(tokens),
  };
}

function requiredText(data: Record<string, unknown>, field: string, file: string): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file}: frontmatter needs a non-empty "${field}" (docs/adr/0007)`);
  }
  return value.trim();
}

export function listExperiencePostSlugs(dir: string): string[] {
  return experienceSlugs.filter((slug) => fs.existsSync(path.join(dir, `${slug}.md`)));
}

// Where the real posts live (docs/adr/0007). EXPERIENCE_CONTENT_DIR points the site at another
// folder, for example the test fixtures, to preview the route before the posts are written.
export function experienceContentDir(): string {
  return process.env.EXPERIENCE_CONTENT_DIR ?? path.join(process.cwd(), "content", "experience");
}
