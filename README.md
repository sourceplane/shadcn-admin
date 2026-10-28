# shadcn-admin

Vercel's [Next.js & shadcn/ui Admin Dashboard](https://vercel.com/templates/next.js/next-js-and-shadcn-ui-admin-dashboard)
template — [Studio Admin](https://github.com/arhamkhnz/next-shadcn-admin-dashboard),
its dashboards, auth screens, chat, mail, kanban, calendar, data tables and
charts over mock data, with theme presets and layout controls — running on
**Cloudflare Workers + Static Assets** through
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare), deployed by
[Orun](https://github.com/sourceplane/orun) to stage and prod on every merge.
Packaging it as an Orun baseline is the next milestone (SA2).

The template's code is the code. What the port adds is the Workers build,
the monorepo wrapper, a test package, a health route and the deploy
contract; what it swaps is Google-hosted fonts (for self-hosted ones), the
hard-coded site origin (for an environment variable) and the template
author's analytics tag (gone). See [`specs/epics/shadcn-admin`](specs/epics/shadcn-admin/README.md)
for the design, the milestones and the as-built status.

## What is here (the site)

| Surface | Where |
|---|---|
| The site's name and source link | `apps/web/src/config/site.ts` (read by `apps/web/src/config/app-config.ts`) |
| The landing page | `apps/web/src/app/(external)` |
| The dashboards (default, CRM, finance, analytics, e-commerce, logistics, …), auth screens, chat, mail | `apps/web/src/app/(main)` |
| Mock data | each screen's `_components/*data*`, `apps/web/src/data` |
| Theme presets, fonts, layout preferences | `apps/web/src/styles/presets`, `apps/web/src/lib/fonts/registry.ts`, `apps/web/src/lib/preferences` |
| Sitemap, robots, health | `apps/web/src/app/sitemap.ts`, `apps/web/src/app/robots.txt/route.ts`, `apps/web/src/app/api/health/route.ts` |
| Workers build and deploy contract | `apps/web/next.config.mjs`, `open-next.config.ts`, `wrangler.jsonc`, `component.yaml` |
| Tests | `tests/web` (vitest) |

## Getting started

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm build            # next build + opennextjs-cloudflare build → apps/web/.open-next
```

```bash
pnpm --filter @app/web dev        # http://localhost:3000
pnpm --filter @app/web preview    # wrangler dev over the built Worker
```

One optional build-time variable (`apps/web/.env.example`):

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The site's public origin for the sitemap, robots, Open Graph and JSON-LD links. The Orun build sets it to the environment's `SITE_URL` (intent.yaml), else its Worker URL. Defaults to `http://localhost:3000`. |

The data is the template's mock data, kept as it is: wire a screen to your
own source in its `_components`. The sign-in and sign-up screens are the
template's design screens: they sign nobody in.

## How it maps to Vercel

| Vercel | Here |
|---|---|
| Next.js hosting | One Cloudflare Worker (`.open-next/worker.js`) + Static Assets; the dashboards render per request (they read layout cookies), the static pages and assets come from the static-assets cache |
| Next.js build (Turbopack) | `next build --webpack`: Turbopack's per-route server chunks put the Worker at 3.32 MiB gzipped, over Workers Free's 3 MiB; webpack's shared chunks make it 2.25 MiB |
| `next/font/google` (17 families, fetched at build) | `next/font/local` over each family's variable font from its `@fontsource-variable` package (and `geist`), the same CSS variables |
| `opengraph-image.png` / `twitter-image.png` file convention | One static `public/opengraph-image.png`, named in the metadata (the convention compiled two copies of the PNG into the Worker) |
| Static `robots.txt` naming the demo's domain | `robots.txt/route.ts`: upstream's rules, the environment's own sitemap URL |
| The star count revalidated hourly (`next: { revalidate: 3600 }`) | Fetched once by the build (`cache: "force-cache"`), for the site's own repository |
| Google Analytics (the template author's tag) | Removed |
| Hard-coded demo origin | `NEXT_PUBLIC_SITE_URL` |
| Deploy on push | Orun deploys `<repo>-web-{stage,prod}` on merge to `main` (`apps/web/component.yaml`) |
| "Deploy with Vercel" (clone the template) | `orun new --blueprint repo-blueprint.yaml` — a new repository, branded, deployed |

## CI

| Workflow | What it runs | Ships to a site |
|---|---|---|
| `ci.yml` | the Orun pipeline, and the only workflow a site carries: `orun plan --changed`, then one job per lane. A pull request runs the verify lanes (the site built and dry-deployed per environment; the tests' `quick-check` lane installs and checks the package, it does not run them), except the bootstrap's own landings (`orun/BASE-*`), where `plan` alone is the check; a merge deploys stage → prod. It plans nothing while `intent.yaml` names the placeholder workspace `ws_CHANGE_ME`, as this repository does. A manual run (Orunbase's Deploy button, or Run workflow on `main`) plans the environment and components it names under the push-to-main trigger, so they deploy as a merge deploys them | yes |
