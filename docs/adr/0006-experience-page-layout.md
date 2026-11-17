# Experience page: layout and not-found

Status: accepted (2026-11-17, ticket experience-pages/01, A6 and A7)

An experience page at `/experience/<slug>` shows, top to bottom:

1. A header from the role's row in `workExperience`: logo, company, role, years, stack. The row
   data is the single source; the post file does not repeat it.
2. The post's `title`.
3. The post body.
4. A "← Back" link to the homepage Experiences section.

The browser tab title is "<post title> · Victor Nogueira". The page description is the post's
`summary`.

Pages exist only for the 11 known slugs. Any other `/experience/<x>` shows the site's 404 page.

**Rejected:** a minimal page with only title, body and back link (A6-2); redirecting unknown slugs
to the homepage (A7-2), which hides a broken link from the reader.
