# shadcn-admin — Vercel's Next.js & shadcn/ui Admin Dashboard on Cloudflare Workers

**Studio Admin — the Next.js 16 and shadcn/ui admin dashboard, two dozen
screens over mock data with theme presets and layout controls — built by
OpenNext into one Cloudflare Worker inside Workers Free, its fonts
self-hosted, deployed by Orun to stage and prod on every merge, and the
baseline that makes a copy of it somebody else's in one landing.**

| | |
|---|---|
| Status | In progress — SA0 on main |
| Upstream | [arhamkhnz/next-shadcn-admin-dashboard](https://github.com/arhamkhnz/next-shadcn-admin-dashboard), at `89f28da` (2026-10-27), MIT |
| Reference | [portfolio-starter-kit](https://github.com/sourceplane/portfolio-starter-kit) — the same scaffolding, tests and bootstrap |
| Key | `SA` |

## Read in this order

1. [design.md](design.md) — the template, how each Vercel piece maps to
   Cloudflare, the Worker's size, the repository and the build, and the
   alternative rejected.
2. [implementation-plan.md](implementation-plan.md) — the milestones and
   what each one lands.
3. [risks-and-open-questions.md](risks-and-open-questions.md) — what is not
   proven, and what was accepted.
4. [IMPLEMENTATION-STATUS.md](IMPLEMENTATION-STATUS.md) — what shipped, and
   every departure from the upstream template.

## Milestones

| Milestone | What it lands | Task |
|---|---|---|
| SA0 — the spec | the repository, its intent, CI, tooling and spec index; this doc set | SA-1 |
| SA1 — the admin dashboard on Workers | the template in `apps/web`, built by OpenNext into one Worker; the self-hosted fonts; the origin per environment; `tests/web` | SA-2 |
| SA2 — a baseline | the console card, the build document, the context pack and the baseline's tests | SA-3 |
