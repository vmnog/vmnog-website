# Explore: experience post page and row link

Milestone: 1 · Next
Status: ready-for-agent
Blocked by: none

Draw boards on the Explorations page of the Paper file for every state the design gate listed in experience-pages/01:
the expanded row with the "Read the full story →" link; the post page with a long post and images; the post page
for a short role with no images; a long title and long stack in the header; an image inside the body; the 404 at
/experience/<unknown>. Each at 390 and 1300 px, light and dark.

Decisions: see experience-pages/01, section `Decisions (grilled 2026-11-17)`, and docs/adr/0001 to 0009.

## Comments

## MVP check (2026-11-17)

Size: quick. Part of experience-pages/01, whose full check was overridden to rung 3 by the approver (docs/adr/0004). This ticket is the smallest slice of that scope; nothing in it can be cut without dropping a decided page.

## Designer: options ready (2026-11-17)

Paper file, page `Explorations`, row `Row — Experience post page and row link (experience-pages/02)`.
PNGs: `/Users/victornogueira/fun/vmnog-site/screenshots/experience-pages-02/`.

- Q1 post page header. A (recommended): the homepage row reused as the header, title at 32 px, uppercase section labels as the three headings. B: small eyebrow, 46 px hero-style title with the summary in grey, sentence-case headings.
- Q2 row link. A (recommended): "Read the full story →" as the last words of the paragraph, underlined, never split. B: the link on its own line under the paragraph.
- Q3 404. A: the Next.js default (what ships today; the site has no not-found page). B (recommended): a site-styled not-found page with a back link.
- States, not choices, drawn in Q1 A / Q2 A / Q3 B: short role with no images, long title and long stack (checked at 320 px), images inside the body (wide and narrow), and dark mode for every state at 390 and 1300.
