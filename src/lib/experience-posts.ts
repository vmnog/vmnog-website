import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
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
    image({ href, text, title }) {
      const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : "";
      return `<img src="${escapeAttribute(href)}" alt="${escapeAttribute(text)}"${titleAttribute} loading="lazy">`;
    },
  },
});

// marked hands over the text as written, so an entity the author typed (&amp;) is kept as is and
// only a bare & is escaped.
function escapeAttribute(value: string): string {
  return value
    .replace(/&(?!#?\w+;)/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function getExperiencePost(slug: string, dir: string): ExperiencePost | null {
  if (!experienceSlugs.includes(slug) || !postSlugsIn(dir).includes(slug)) return null;
  const file = path.join(dir, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const title = requiredText(data, "title", file);
  const summary = requiredText(data, "summary", file);

  const tokens = markdown.lexer(content);
  const imagesWithoutAlt: string[] = [];
  markdown.walkTokens(tokens, (token) => {
    // Posts are plain markdown (docs/adr/0007). Raw HTML would reach the page unescaped and could
    // hide an image from the alt-text check, so any of it fails the build.
    if (token.type === "html") {
      throw new Error(`${file}: posts are plain markdown, remove the raw HTML ${JSON.stringify(token.raw.trim())} (docs/adr/0007)`);
    }
    if (token.type === "link" || token.type === "image") assertSafeUrl(token.href, file);
    if (token.type === "image" && token.text.trim() === "") imagesWithoutAlt.push(token.href);
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

// A link or image may be http(s) or have no scheme at all (/path, #anchor). Any other scheme,
// such as javascript: or mailto:, fails the build.
function assertSafeUrl(href: string, file: string): void {
  const scheme = /^\s*([a-z][a-z0-9+.-]*):/i.exec(href)?.[1].toLowerCase();
  if (scheme !== undefined && scheme !== "http" && scheme !== "https") {
    throw new Error(`${file}: links and images must be http(s) or site-relative, found ${scheme}: in ${JSON.stringify(href)}`);
  }
}

function requiredText(data: Record<string, unknown>, field: string, file: string): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file}: frontmatter needs a non-empty "${field}" (docs/adr/0007)`);
  }
  return value.trim();
}

export function listExperiencePostSlugs(dir: string): string[] {
  const written = postSlugsIn(dir);
  return experienceSlugs.filter((slug) => written.includes(slug));
}

// Reads the folder's real file names, so a case mismatch (DocHelp.md) fails on a case-insensitive
// disk too, instead of being found by accident or silently skipped.
function postSlugsIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const slugs = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.slice(0, -".md".length));
  for (const slug of slugs) {
    if (!experienceSlugs.includes(slug)) {
      throw new Error(
        `${path.join(dir, `${slug}.md`)}: the file name is not one of the 11 slugs (docs/adr/0003): ${experienceSlugs.join(", ")}`,
      );
    }
  }
  return slugs;
}

// The homepage row of each role with a written post links to its page (docs/adr/0002), keyed by
// the row's company name. A row with no post gets no link.
export function experienceStoryHrefs(dir: string): Record<string, string> {
  const written = listExperiencePostSlugs(dir);
  return Object.fromEntries(
    workExperience
      .filter((job) => written.includes(experienceSlug(job.company)))
      .map((job) => [job.company, `/experience/${experienceSlug(job.company)}`]),
  );
}

// Where the real posts live (docs/adr/0007). Fixed on purpose: no setting can point a build at
// another folder. Tests pass their fixture folder to the functions above instead.
export function experienceContentDir(): string {
  return path.join(process.cwd(), "content", "experience");
}

// The layout's openGraph and twitter objects are replaced, not merged, by a page's own, so every
// field the homepage sets is set again here for the post (docs/adr/0006).
export function experiencePostMetadata(post: ExperiencePost): Metadata {
  const title = `${post.title} · Victor Nogueira`;
  const url = `/experience/${post.slug}`;
  return {
    title: { absolute: title },
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Victor Nogueira",
      locale: "en_US",
      title,
      description: post.summary,
      images: [{ url: "/assets/og.jpg", width: 1200, height: 630, alt: "Victor Nogueira" }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@mevmnog",
      title,
      description: post.summary,
      images: ["/assets/og.jpg"],
    },
  };
}
