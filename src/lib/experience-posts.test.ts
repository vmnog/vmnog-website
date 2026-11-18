import path from "node:path";
import { describe, expect, it } from "vitest";
import { workExperience } from "@/lib/work-experience";
import {
  experienceContentDir,
  experiencePostMetadata,
  experienceSlug,
  experienceStoryHrefs,
  getExperiencePost,
  listExperiencePostSlugs,
} from "@/lib/experience-posts";

describe("experienceSlug", () => {
  it("gives every homepage row the slug listed in ADR 0003", () => {
    expect(workExperience.map((job) => experienceSlug(job.company))).toEqual([
      "needles",
      "caraquecoda",
      "booksopen",
      "dochelp",
      "brasilprev",
      "bullla",
      "wex-brasil-tech",
      "sociax",
      "tinbeer",
      "commerzbank",
      "cremesp",
    ]);
  });
});

const fixtures = path.join(__dirname, "__fixtures__", "experience");

describe("getExperiencePost", () => {
  it("reads the title, summary and body of a known slug", () => {
    const post = getExperiencePost("dochelp", path.join(fixtures, "valid"));

    expect(post).toMatchObject({
      slug: "dochelp",
      title: "Building DocHelp from zero",
      summary: "How two founders turned a clinic's paperwork into a product.",
    });
    expect(post?.html).toContain("<h2>What the company does</h2>");
    expect(post?.html).toContain("<p>I built the <strong>first version</strong>.</p>");
  });

  it("returns null for a slug that is not one of the 11 roles", () => {
    expect(getExperiencePost("acme", path.join(fixtures, "valid"))).toBeNull();
  });

  it("returns null for a known role whose post is not written yet", () => {
    expect(getExperiencePost("needles", path.join(fixtures, "valid"))).toBeNull();
  });

  it("renders a markdown image as a plain lazy img with its alt text", () => {
    const post = getExperiencePost("dochelp", path.join(fixtures, "valid"));

    expect(post?.html).toContain(
      '<img src="/assets/og.jpg" alt="The site preview card, used here as a stand-in image" loading="lazy">',
    );
  });

  it("escapes alt text and title once, keeping entities the author wrote", () => {
    const post = getExperiencePost("dochelp", path.join(fixtures, "valid"));

    expect(post?.html).toContain(
      '<img src="/assets/og.jpg" alt="Q&amp;A &amp; a &quot;quote&quot;" title="Card &amp; title" loading="lazy">',
    );
  });

  it("fails when an image has no alt text, naming the file and the image", () => {
    expect(() => getExperiencePost("booksopen", path.join(fixtures, "missing-alt"))).toThrowError(
      /booksopen\.md.*\/experience\/booksopen\/cover\.webp/,
    );
  });

  it("treats alt text made only of spaces as missing", () => {
    expect(() => getExperiencePost("booksopen", path.join(fixtures, "blank-alt"))).toThrowError(
      /booksopen\.md.*alt text.*\/experience\/booksopen\/blank\.webp/,
    );
  });

  it("fails when the frontmatter has no summary", () => {
    expect(() => getExperiencePost("bullla", path.join(fixtures, "bad-frontmatter"))).toThrowError(
      /bullla\.md.*summary/,
    );
  });

  it("fails when the frontmatter title is empty", () => {
    expect(() => getExperiencePost("sociax", path.join(fixtures, "bad-frontmatter"))).toThrowError(
      /sociax\.md.*title/,
    );
  });

  it.each([
    ["a script block", "raw-html-script"],
    ["inline HTML", "raw-html-inline"],
    ["a raw HTML img", "raw-html-img"],
    ["a picture element, which would skip the alt-text check", "raw-html-picture"],
    ["an svg image, which would skip the alt-text check", "raw-html-svg"],
  ])("fails on raw HTML: %s", (_case, folder) => {
    expect(() => getExperiencePost("tinbeer", path.join(fixtures, folder))).toThrowError(
      /tinbeer\.md.*raw HTML/,
    );
  });

  it.each([
    ["a javascript: link", "javascript-link"],
    ["a javascript: image source", "javascript-image"],
    ["a mailto: link", "mailto-link"],
  ])("fails on %s", (_case, folder) => {
    expect(() => getExperiencePost("tinbeer", path.join(fixtures, folder))).toThrowError(
      /tinbeer\.md.*(javascript|mailto):/,
    );
  });

  it("keeps https, site-relative and in-page links", () => {
    const post = getExperiencePost("dochelp", path.join(fixtures, "valid"));

    expect(post?.html).toContain('<a href="/#experiences">the homepage</a>');
    expect(post?.html).toContain('<a href="https://vmnog.com">the site</a>');
    expect(post?.html).toContain('<a href="#what-i-did">the first section</a>');
  });
});

describe("listExperiencePostSlugs", () => {
  it("lists only known roles that have a post file", () => {
    expect(listExperiencePostSlugs(path.join(fixtures, "valid"))).toEqual(["dochelp"]);
  });

  it.each([
    ["differs from a slug only in case", "misnamed-case", "DocHelp.md"],
    ["is not one of the 11 slugs", "misnamed-slug", "doc-help.md"],
  ])("fails when a post file name %s", (_case, folder, fileName) => {
    const message = new RegExp(`${fileName.replace(".", "\\.")}.*not one of the 11`);
    expect(() => listExperiencePostSlugs(path.join(fixtures, folder))).toThrowError(message);
    expect(() => getExperiencePost("dochelp", path.join(fixtures, folder))).toThrowError(message);
  });

  it("lists nothing when the content folder does not exist yet", () => {
    expect(listExperiencePostSlugs(path.join(fixtures, "does-not-exist"))).toEqual([]);
  });
});

describe("experienceStoryHrefs", () => {
  it("links each homepage row that has a post to its page, by company name", () => {
    expect(experienceStoryHrefs(path.join(fixtures, "valid"))).toEqual({ DocHelp: "/experience/dochelp" });
  });

  it("links no row when no post is written yet", () => {
    expect(experienceStoryHrefs(path.join(fixtures, "does-not-exist"))).toEqual({});
  });
});

describe("experienceContentDir", () => {
  it("is always content/experience, whatever the environment says", () => {
    process.env.EXPERIENCE_CONTENT_DIR = "/somewhere/else";
    try {
      expect(experienceContentDir()).toBe(path.join(process.cwd(), "content", "experience"));
    } finally {
      delete process.env.EXPERIENCE_CONTENT_DIR;
    }
  });
});

describe("experiencePostMetadata", () => {
  it("gives the tab, Open Graph and Twitter the post's own title, summary and url", () => {
    const post = getExperiencePost("dochelp", path.join(fixtures, "valid"));
    if (!post) throw new Error("fixture missing");

    expect(experiencePostMetadata(post)).toEqual({
      title: { absolute: "Building DocHelp from zero · Victor Nogueira" },
      description: "How two founders turned a clinic's paperwork into a product.",
      alternates: { canonical: "/experience/dochelp" },
      openGraph: {
        type: "article",
        url: "/experience/dochelp",
        siteName: "Victor Nogueira",
        locale: "en_US",
        title: "Building DocHelp from zero · Victor Nogueira",
        description: "How two founders turned a clinic's paperwork into a product.",
        images: [{ url: "/assets/og.jpg", width: 1200, height: 630, alt: "Victor Nogueira" }],
      },
      twitter: {
        card: "summary_large_image",
        creator: "@mevmnog",
        title: "Building DocHelp from zero · Victor Nogueira",
        description: "How two founders turned a clinic's paperwork into a product.",
        images: ["/assets/og.jpg"],
      },
    });
  });
});
