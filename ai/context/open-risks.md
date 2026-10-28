# shadcn-admin — open risks

What is not yet proven or not yet decided. The full write-up of every risk,
including the accepted and resolved ones, is
`specs/epics/shadcn-admin/risks-and-open-questions.md`; this page
lists only what is still live, so it should be short.

| ID | Risk | State | What closes it |
|---|---|---|---|
| SA-A | No console bootstrap has run from this baseline | OPEN | One bootstrap from `baseline-v1` against a workspace, with its timings recorded |
| SA-B | The Worker is 2.25 MiB gzipped against Workers Free's 3 MiB: a template upgrade that adds a chart or a screen could cross it | WATCH | Measure on every upgrade (`wrangler deploy --dry-run`); Workers Paid if it crosses |

Accepted, and worth knowing before you change them: SA-C (Next.js 16.3.8,
not 16.4.x, until the adapter supports it), SA-D (the star count is as
fresh as the last deploy), SA-E (the auth screens sign nobody in).
