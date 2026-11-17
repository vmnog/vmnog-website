# Experience page URLs: /experience/<company in lowercase>

Status: accepted (2026-11-17, ticket experience-pages/01, A5)

Each experience page lives at `/experience/<slug>`. The slug is the company name in lowercase, for
example `/experience/dochelp` and `/experience/booksopen`.

**Why:** short, and it matches the name on the row.

**Rejected:** company plus role (`/experience/dochelp-co-founder`). It only helps if one company
ever has two roles, and none does today.

**Rule (A10):** lowercase, spaces become hyphens. The 11 slugs: `needles`, `caraquecoda`,
`booksopen`, `dochelp`, `brasilprev`, `bullla`, `wex-brasil-tech`, `sociax`, `tinbeer`,
`commerzbank`, `cremesp`. Rejected: the shortest brand name (`wex`), a one-off exception.
