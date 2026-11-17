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

## Pick and boards of record (2026-11-17)

Victor picked **Q1 B, Q2 A, Q3 B** (relayed by the Coordinator).

- Q1 B: a small eyebrow (logo, company, years), then the post title with the post's `summary` in grey after it, like the homepage hero; role · stack below; sentence-case headings; a rule above the body.
  **ADR 0006 needs an update in experience-pages/06:** the page now shows `summary` on the page, not only as the page description.
- Q2 A: "Read the full story →" as the last words of the expanded paragraph; underlined, never split across lines.
- Q3 B: a site-styled not-found page (404 label, one hero-style line, "← Back to the homepage", the footer). It covers every unknown URL on the site, not only `/experience/`.

Boards on the Paper `Home` page (https://app.paper.design/file/01M7NHT3JGWJFZYAB6YF1TGB82/p-2-0), left to right:

Row — Experience post page:
1. Experience post / long story 1300
2. Experience post / long story 390
3. Experience post / long story 1300 dark
4. Experience post / long story 390 dark
5. Experience post / short role, no images 1300
6. Experience post / short role, no images 390
7. Experience post / short role, no images 1300 dark
8. Experience post / short role, no images 390 dark
9. Experience post / long title and stack 1300
10. Experience post / long title and stack 390
11. Experience post / long title and stack 1300 dark
12. Experience post / long title and stack 390 dark

Row — Homepage experience row:
1. Home / experience row expanded 1300
2. Home / experience row expanded 390
3. Home / experience row expanded 1300 dark
4. Home / experience row expanded 390 dark

Row — 404 page:
1. 404 / unknown URL 1300
2. 404 / unknown URL 390
3. 404 / unknown URL 1300 dark
4. 404 / unknown URL 390 dark

Notes for the builder: images inside the body are on the long-story boards (a wide one that scales down to the column, a 420 px one that never grows). Post copy is placeholder. The footer on the boards is simplified; reuse the homepage footer. The eyebrow wraps to a second line when it does not fit (checked at 320 px).
The Explorations row and its PNGs are deleted.
