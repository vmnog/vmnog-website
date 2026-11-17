# Backend: experience posts content pipeline and route

Milestone: 1 · Next
Status: ready-for-agent
Blocked by: none

Markdown files at content/experience/<slug>.md (title and summary at the top), read at build time; the static route
/experience/<slug> for the 11 known slugs only (docs/adr/0003); every other slug gets the site's 404; plain markdown
images rendered as lazy <img>; the build fails when an image has no alt text (docs/adr/0007). Backend only: the page
layout waits for the boards picked in experience-pages/02 and is built in experience-pages/06. List the states that
need a board. Do not write the real posts (experience-pages/04 and 05 own content/experience/); use test fixtures.

Decisions: see experience-pages/01, section `Decisions (grilled 2026-11-17)`, and docs/adr/0001 to 0009.

## Comments

## MVP check (2026-11-17)

Size: quick. Part of experience-pages/01, whose full check was overridden to rung 3 by the approver (docs/adr/0004). This ticket is the smallest slice of that scope; nothing in it can be cut without dropping a decided page.
