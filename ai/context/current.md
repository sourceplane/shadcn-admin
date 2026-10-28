# shadcn-admin — where this repository stands

The entry page for anyone (or any agent) picking this repository up. It is
this repository's own state and does not ship to a site built from it; the
two pages that do are [operations.md](operations.md) and
[deployment.md](deployment.md).

## What it is

Vercel's Next.js & shadcn/ui Admin Dashboard template — Studio Admin
(arhamkhnz/next-shadcn-admin-dashboard): dashboards, auth screens, chat,
mail, kanban, calendar, data tables and charts over mock data, with theme
presets and layout controls — on Cloudflare Workers + Static Assets
(`@opennextjs/cloudflare`), packaged as an Orun baseline: `orun new
--blueprint repo-blueprint.yaml` builds a new site in its own repository and
takes it to live on stage and prod in one landing (`01-product`), then
records what went live (`03-docs`). One component, no infra. The machinery
is portfolio-starter-kit's, in its current shape.

## Release

| | |
|---|---|
| Latest tag | `baseline-v1` — SA0–SA2 (the epic doc set, the dashboard on Workers, the baseline) |
| Proven live | No — every tier passes offline, including the bootstrap and the built Worker served by `wrangler dev`; no console bootstrap has run yet (risk SA-A) |

## Where to read

| Question | Page |
|---|---|
| What shipped, and every departure from upstream | `specs/epics/shadcn-admin/IMPLEMENTATION-STATUS.md` |
| Why it is built this way | [decisions.md](decisions.md), then `specs/epics/shadcn-admin/design.md` |
| What could still go wrong | [open-risks.md](open-risks.md), then `specs/epics/shadcn-admin/risks-and-open-questions.md` |
| How to instantiate it | `BOOTSTRAP.md`, `docs/phases/` |
| What each component is | `apps/web/docs/`, `tests/web/docs/` (generated; `python3 tooling/catalog/gen-component-docs.py`) |
| What a site's agent reads first | `.baseline/product/AGENTS.md` (ships as the site's `AGENTS.md`) |

## Next

1. Bootstrap one site from `baseline-v1` against a workspace: read the
   console's panel against what the build did, record its timings against
   the card's 6-minute estimate, and check the Worker's live size against
   Workers Free (closes SA-A).
