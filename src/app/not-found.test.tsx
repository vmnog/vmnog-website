import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";

const html = renderToStaticMarkup(<NotFound />);

describe("NotFound", () => {
  it("labels the page 404 and says the page does not exist in one hero-style line", () => {
    expect(html).toMatch(/>404</);
    expect(html).toMatch(
      /<h1[^>]*>This page doesn’t exist\. <span class="text-zinc-400 dark:text-zinc-500">The link may be old or mistyped\.<\/span><\/h1>/,
    );
  });

  it("links back to the homepage, then shows the site footer", () => {
    expect(html).toMatch(/<a [^>]*href="\/"[^>]*>← Back to the homepage<\/a>/);
    expect(html.indexOf("<footer")).toBeGreaterThan(html.indexOf("← Back to the homepage"));
  });

  it("names the tab", () => {
    expect(metadata.title).toBe("Page not found");
  });
});
