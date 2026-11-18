# Build: experience post page and row link

Milestone: 1 · Next
Status: In Progress
Blocked by: 02, 03

Build the post page layout (docs/adr/0006) and the "Read the full story →" link at the end of an expanded row
(docs/adr/0002), against the boards Victor picks in experience-pages/02, on the pipeline from experience-pages/03.

Decisions: see experience-pages/01, section `Decisions (grilled 2026-11-17)`, and docs/adr/0001 to 0009.

## Comments

## MVP check (2026-11-17)

Size: quick. Part of experience-pages/01, whose full check was overridden to rung 3 by the approver (docs/adr/0004). This ticket is the smallest slice of that scope; nothing in it can be cut without dropping a decided page.

## Builder (2026-11-17)

Branch `experience-pages-06-post-page`. Built the Q1 B post page (`ExperiencePostView`), the Q2 A "Read the full story →" row link, the Q3 B site-wide `not-found` page, a shared `SiteFooter`, and the ADR 0006 update. Evidence in `screenshots/experience-pages-06/`.
