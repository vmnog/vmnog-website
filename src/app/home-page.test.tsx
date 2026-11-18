// @vitest-environment happy-dom
import type { ComponentProps } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HomePage } from "./home-page";

// A plain anchor stands in for next/link: there is no Next router in a test, and the test only
// needs to know the click happened, not to navigate.
vi.mock("next/link", () => ({
  default: ({ href, onClick, ...props }: ComponentProps<"a">) => (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
      }}
      {...props}
    />
  ),
}));

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 404 })));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function rowButton(company: string) {
  return screen.getByRole("button", { name: new RegExp(`^${company}\\b`) });
}

function storyLink() {
  return screen.queryByRole("link", { name: "Read the full story →" });
}

describe("HomePage experience rows", () => {
  it("opens and closes a row from its header button", () => {
    render(<HomePage storyHrefs={{}} />);
    const button = rowButton("DocHelp");

    expect(button.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("points the header button at the row body it opens", () => {
    render(<HomePage storyHrefs={{}} />);
    const button = rowButton("DocHelp");

    const body = document.getElementById(button.getAttribute("aria-controls") ?? "");
    expect(body).not.toBeNull();
    expect(body!.textContent).toContain("RAG-powered");
  });

  it("hides a collapsed row's body, link included, from assistive tech and the tab order", () => {
    render(<HomePage storyHrefs={{ DocHelp: "/experience/dochelp" }} />);
    const body = document.getElementById(rowButton("DocHelp").getAttribute("aria-controls")!)!;

    expect(storyLink()).toBeNull();
    expect(body.hasAttribute("inert")).toBe(true);
  });

  it("ends an open row with a post with a link to its page, on one line", () => {
    render(<HomePage storyHrefs={{ DocHelp: "/experience/dochelp" }} />);
    fireEvent.click(rowButton("DocHelp"));

    const link = storyLink();
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("/experience/dochelp");
    expect(link!.className).toContain("whitespace-nowrap");
    const paragraph = link!.closest("p")!;
    expect(paragraph.lastElementChild).toBe(link);
    expect(within(paragraph).getByText(/RAG-powered/)).toBeTruthy();
    expect(rowButton("DocHelp").contains(link)).toBe(false);
  });

  it("keeps the row open when its story link is clicked", () => {
    render(<HomePage storyHrefs={{ DocHelp: "/experience/dochelp" }} />);
    fireEvent.click(rowButton("DocHelp"));

    fireEvent.click(storyLink()!);

    expect(rowButton("DocHelp").getAttribute("aria-expanded")).toBe("true");
  });

  it("shows no link on an open row without a post", () => {
    render(<HomePage storyHrefs={{ DocHelp: "/experience/dochelp" }} />);
    fireEvent.click(rowButton("BooksOpen"));

    expect(storyLink()).toBeNull();
  });
});
