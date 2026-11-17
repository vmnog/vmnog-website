# Experience posts: plain markdown, images allowed, no table of contents

Status: accepted (2026-11-17, ticket experience-pages/01, A8 and A9)

Each post is one plain markdown file at `content/experience/<slug>.md`. Its frontmatter holds
`title` and a one-line `summary`. The site renders the files to static HTML at build time.

A post may include images. Image files live in `public/experience/<slug>/`. A post with no image is
plain text; nothing is shown in its place. Pages have no table of contents.

Images (round 3):

- **Render (A13):** plain markdown images, rendered as a plain `<img loading="lazy">`, the way the
  site already shows images. No `next/image`.
- **Alt text (A14):** every image needs alt text that says what it shows. The build fails when an
  image has none.
- **Files (A15):** at most 1600 px wide and under 300 KB, WebP or PNG. An image scales down to the
  text column and never grows past its own width.

**Rejected:** MDX (A8-2), more setup and no post needs components; text only (A9-1); a table of
contents (A9-3); `next/image` (A13-2), a custom renderer and fixed sizes
for every image; unchecked alt text (A14-2); no size limit (A15-2).
