# Experience page: layout and not-found

Status: accepted (2026-11-17, ticket experience-pages/01, A6 and A7)

An experience page at `/experience/<slug>` shows, top to bottom:

1. An eyebrow from the role's row in `workExperience`: logo, company, years. It wraps to a second
   line when it does not fit.
2. The post's `title`, with the post's `summary` in grey after it in the same heading, like the
   homepage hero.
3. Role · stack, from the same row. The row data is the single source; the post file does not
   repeat it.
4. A rule, then the post body.
5. A "← Back" link to the homepage Experiences section, then the homepage footer.

The browser tab title is "<post title> · Victor Nogueira". The page description is the post's
`summary` too.

**Update (2026-11-17, experience-pages/02 pick Q1 B, built in experience-pages/06):** the summary
is now shown on the page, not only as the description. The header order changed from "logo,
company, role, years, stack, then title" to the eyebrow, title and role · stack above.

Pages exist only for the 11 known slugs. Any other `/experience/<x>` shows the site's 404 page.
That page is site-styled (404 label, one hero-style line, "← Back to the homepage", the footer)
and covers every unknown URL on the site (experience-pages/02 pick Q3 B).

**Rejected:** a minimal page with only title, body and back link (A6-2); redirecting unknown slugs
to the homepage (A7-2), which hides a broken link from the reader.
