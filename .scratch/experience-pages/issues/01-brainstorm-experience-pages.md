# Brainstorm: a page for each experience, with a blog post about the work

Milestone: 1 · Next
Status: needs-triage
Blocked by: none

## The idea (the approver's words)

"I want to make each experience an individual page where if the user clicks on it, we can have a
blog post with more details about everything I did there."

## Today

The homepage lists 11 experiences in `src/app/page.tsx` (`workExperience`). Clicking a row expands
a one-paragraph description in place. There is no route per experience, no markdown or MDX
pipeline, and no blog. The site is a single client page.

## Comments

## MVP check (2026-11-17)

Size: full (it adds a screen and a route).

1. **Who needs it, and what do they do today?** A recruiter or client reading the homepage. Today
   they get one paragraph per role, and the LinkedIn profile for more.
2. **The cheapest rungs:**
   - Rung 0, skip: the expanded paragraph already says what each role was.
   - Rung 1, link out: a "Read more" link on a row points to a post that already exists (the
     DocHelp retrospective on LinkedIn, 2026-04-22). No new page.
   - Rung 2, a page for the roles that have a story: one route, `/experience/<slug>`, with the
     post written in the repo as markdown. Only 2 or 3 roles get a page at first (candidates:
     DocHelp, CARAQUECODA, BooksOpen). The other rows keep today's expand.
   - Rung 3, every role: 11 pages, plus images and a table of contents.
3. **Cold attack.** The cost is the writing, not the code. Eleven pages that nobody writes become
   eleven thin pages, which reads worse than one paragraph. Needles is under an NDA, so its page
   would say no more than the row does today. A row that both expands and opens a page is two
   behaviours for one click; that has to be decided, not guessed.
4. **Verdict: build rung 2.** One route and the markdown pipeline, with the first 2 or 3 posts. A
   row gets a page only when its post exists.

Blocked by: none

## Decisions (grilled 2026-11-17)

Grill session A. Answers from Victor, relayed by the Coordinator.

- **Scope override: rung 3, not rung 2.** Victor overrides the MVP verdict. He chose it after the
  Coordinator raised the writing cost of thin pages, the interns, and Needles under its NDA.
  ADR: docs/adr/0004-experience-pages-scope.md
- A1, which roles get a page: **all 11 roles**. Shipping: all 11 at once, not in waves. Nothing
  ships to production until all 11 posts are written and Victor has approved each one's text.
  ADR: docs/adr/0004-experience-pages-scope.md
- A2, who writes: **1**, an agent drafts each post from LinkedIn, the DocHelp article and the repo
  history; once the design and the draft are done, the drafting agent may ask Victor questions to
  fill gaps; a post ships only after Victor approves its text. Why: the cost is the writing.
  ADR: docs/adr/0001-experience-post-authoring.md
- A3, row click: **1**, the row expands as today; when a page exists, the paragraph ends with a
  "Read the full story →" link. Why: one behaviour for every row. ADR: docs/adr/0002-experience-row-click.md
- A4, Needles: **2**, a page with only public facts (what is already public about Needles and
  Chronic Ink, nothing under the NDA). ADR: docs/adr/0005-needles-page-public-facts.md
- A5, URL slugs: **1**, `/experience/<company in lowercase>`. Why: short, matches the row.
  ADR: docs/adr/0003-experience-url-slugs.md
- A6, post page: **1**, header from the `workExperience` row (logo, company, role, years, stack),
  then post title, body, "← Back" to the homepage Experiences section; tab title
  "<post title> · Victor Nogueira", description from `summary`. Why: the row data stays the single
  source. ADR: docs/adr/0006-experience-page-layout.md
- A7, not-found: **1**, only the 11 known slugs exist; anything else shows the site's 404 page.
  ADR: docs/adr/0006-experience-page-layout.md
- A8, format: **1**, plain markdown at `content/experience/<slug>.md`, frontmatter `title` and
  `summary`, static at build time. Why: no post needs components. ADR: docs/adr/0007-experience-post-format.md
- A9, images: **2**, images allowed in `public/experience/<slug>/`; no table of contents. A post
  without images is plain text. ADR: docs/adr/0007-experience-post-format.md
- A10, slugs with spaces: **1**, lowercase with hyphens (`wex-brasil-tech`). The 11 slugs are listed
  in docs/adr/0003-experience-url-slugs.md
- A11, short roles: **1**, three fixed headings (What the company does / What I did / What I took
  from it); one or two sentences each is fine. ADR: docs/adr/0008-experience-post-sections.md
- A12, Writings: **1**, experience posts are not listed in Writings; the row link is the only way
  in. ADR: docs/adr/0009-experience-posts-not-in-writings.md
- A13, image render: **1**, plain markdown images as `<img loading="lazy">`, as the site does
  today; no `next/image`. ADR: docs/adr/0007-experience-post-format.md
- A14, alt text: **1**, required on every image; the build fails without it. ADR: 0007
- A15, image files: **1**, at most 1600 px wide, under 300 KB, WebP or PNG; scaled to the text
  column. ADR: 0007

design gate: needs boards for the expanded row with the "Read the full story →" link; the post
page with a long post and images; the post page for a short role with no images; long title and
long stack in the header; an image inside the body; the 404 at `/experience/<unknown>`. Each at
390 and 1300 px, light and dark. The Paper file has no boards yet.

Proposed split (not created yet; the Coordinator shows Victor the order first):

1. experience-pages/02 `Explore: experience post page and row link`. Blocked by: none
2. experience-pages/03 `Backend: experience posts content pipeline and route`. Blocked by: none
3. experience-pages/04 `Draft: experience posts with a long story (DocHelp, BooksOpen, CARAQUECODA, Brasilprev)`. Blocked by: none
4. experience-pages/05 `Draft: short experience posts`. Blocked by: none
5. experience-pages/06 `Build: experience post page and row link`. Blocked by: 02, 03

Release holds until 04, 05 and 06 are on staging and Victor has approved all 11 texts (ADR 0004).

Blocked by: none
