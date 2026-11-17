import path from "node:path";
import { describe, expect, it } from "vitest";
import { workExperience } from "@/lib/work-experience";
import { experienceSlug, getExperiencePost, listExperiencePostSlugs } from "@/lib/experience-posts";

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

  it("returns null for a slug that is not one of the 11 roles, even when a file exists", () => {
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

  it("fails when an image has no alt text, naming the file and the image", () => {
    expect(() => getExperiencePost("booksopen", path.join(fixtures, "missing-alt"))).toThrowError(
      /booksopen\.md.*\/experience\/booksopen\/cover\.webp/,
    );
  });

  it("treats alt text made only of spaces as missing", () => {
    expect(() => getExperiencePost("booksopen", path.join(fixtures, "missing-alt"))).toThrowError(
      /\/experience\/booksopen\/blank\.webp/,
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

  it("fails on a raw HTML img, which would skip the alt-text check", () => {
    expect(() => getExperiencePost("tinbeer", path.join(fixtures, "raw-html-img"))).toThrowError(
      /tinbeer\.md.*markdown image/,
    );
  });
});

describe("listExperiencePostSlugs", () => {
  it("lists only known roles that have a post file", () => {
    expect(listExperiencePostSlugs(path.join(fixtures, "valid"))).toEqual(["dochelp"]);
  });

  it("lists nothing when the content folder does not exist yet", () => {
    expect(listExperiencePostSlugs(path.join(fixtures, "does-not-exist"))).toEqual([]);
  });
});
