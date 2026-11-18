import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomePage } from "./home-page";

function storyLinks(html: string): string[] {
  return [...html.matchAll(/<a [^>]*>Read the full story →<\/a>/g)].map((match) => match[0]);
}

describe("HomePage experience rows", () => {
  it("ends the expanded paragraph of a row with a post with a link to its page", () => {
    const html = renderToStaticMarkup(<HomePage storyHrefs={{ DocHelp: "/experience/dochelp" }} />);

    const links = storyLinks(html);
    expect(links).toHaveLength(1);
    expect(links[0]).toContain('href="/experience/dochelp"');
    expect(html).toMatch(/helping 500\+ real doctors in their clinical appointments\. <a [^>]*>Read the full story →<\/a><\/p>/);
  });

  it("keeps the link on one line", () => {
    const html = renderToStaticMarkup(<HomePage storyHrefs={{ DocHelp: "/experience/dochelp" }} />);

    expect(storyLinks(html)[0]).toMatch(/class="[^"]*whitespace-nowrap/);
  });

  it("shows no link on rows without a post", () => {
    const html = renderToStaticMarkup(<HomePage storyHrefs={{}} />);

    expect(storyLinks(html)).toHaveLength(0);
  });

  it("keeps a collapsed row's link in the tab order", () => {
    const html = renderToStaticMarkup(<HomePage storyHrefs={{ DocHelp: "/experience/dochelp" }} />);

    expect(html).not.toContain("inert");
    expect(storyLinks(html)[0]).not.toContain("tabindex");
  });
});
