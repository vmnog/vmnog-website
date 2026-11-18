import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getExperiencePost } from "@/lib/experience-posts";
import { workExperience } from "@/lib/work-experience";
import { ExperiencePostView } from "./experience-post-view";

const fixtures = path.join(__dirname, "..", "..", "..", "lib", "__fixtures__", "experience");
const post = getExperiencePost("dochelp", path.join(fixtures, "valid"))!;
const job = workExperience.find((row) => row.company === "DocHelp")!;
const html = renderToStaticMarkup(<ExperiencePostView job={job} post={post} />);

describe("ExperiencePostView", () => {
  it("shows the row's logo, company and years in the eyebrow", () => {
    expect(html).toContain('src="/assets/dochelp.png"');
    expect(html).toContain('alt="DocHelp logo"');
    expect(html).toMatch(/>DocHelp</);
    expect(html).toMatch(/>2024 - 2025</);
  });

  it("shows the title with the summary in grey after it, in one heading", () => {
    const heading = /<h1[^>]*>(.*?)<\/h1>/.exec(html)?.[1];
    expect(heading).toBe(
      'Building DocHelp from zero <span class="text-zinc-400 dark:text-zinc-500">How two founders turned a clinic&#x27;s paperwork into a product.</span>',
    );
  });

  it("shows the role and stack below the title", () => {
    expect(html).toMatch(/<span class="font-medium">Co-Founder<\/span> · Next.js, LangChain, Vector DB/);
    expect(html.indexOf("Co-Founder")).toBeGreaterThan(html.indexOf("</h1>"));
  });

  it("renders the post body after the rule, with its headings and lazy images", () => {
    expect(html).toContain('<div class="experience-post-body');
    expect(html).toContain("<h2>What I did</h2>");
    expect(html).toContain('loading="lazy"');
  });

  it("links back to the homepage Experiences section, then shows the site footer", () => {
    expect(html).toMatch(/<a [^>]*href="\/#experiences"[^>]*>← Back<\/a>/);
    expect(html.indexOf("<footer")).toBeGreaterThan(html.indexOf("← Back"));
    expect(html).toContain("me@vmnog.com");
  });
});
