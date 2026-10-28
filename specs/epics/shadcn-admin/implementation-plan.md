# shadcn-admin — implementation plan

Three milestones, each one reviewed pull request (SA0 is the repository's
first commit), each green before it merges.

## SA0 — the spec (SA-1)

The repository is born: `intent.yaml` with the placeholder workspace
`ws_CHANGE_ME`, `ci.yml` (byte for byte turso-starter's, which plans nothing
until the workspace is set), the shared TypeScript configuration, the spec
index, this doc set and the task contracts.

## SA1 — the admin dashboard on Workers (SA-2)

- The template's `src/`, `public/`, `media/`, `biome.json`,
  `components.json`, `.gitignore` and configuration in `apps/web`; its
  dependencies at its lockfile's versions on Next 16.3.8, with
  `@opennextjs/cloudflare` and `wrangler`; husky and lint-staged left out.
- `next.config.mjs`: `output: 'standalone'`, the workspace root for the
  trace and Turbopack, images unoptimized, the template's React Compiler,
  console stripping and `/dashboard` redirect. `open-next.config.ts` with
  the static-assets incremental cache; `wrangler.jsonc`. `build` is `next
  build --webpack` and OpenNext.
- `src/lib/fonts/registry.ts`: every family through `next/font/local` over
  its `@fontsource-variable` package (and `geist`), the same variables.
- `src/config/site.ts` (`SITE_NAME`, `SOURCE_URL`); `APP_CONFIG` reads them
  and `NEXT_PUBLIC_SITE_URL`. The social card in `public/`; `robots.txt` a
  route; the star count fetched once, for `SOURCE_URL`; the analytics tag
  and the author's metadata removed. `/api/health`.
- `component.yaml`: the deploy contract (the origin per environment) and its
  smoke. `tests/web`: the identity and seam, the origin, the social card,
  the robots and sitemap routes, the health route, the self-hosted fonts.
- The README's "How it maps to Vercel".

## SA2 — a baseline (SA-3)

portfolio-starter-kit's machinery, renamed: `blueprint.yaml`,
`repo-blueprint.yaml`, `.baseline/` (identity, the product's README, its
`AGENTS.md`, task contracts), `tooling/rebrand` (the template's repository
names, which spell this baseline's slug, masked as its credit),
`tooling/bootstrap`, `hooks/render-deployment-docs.sh` (probing
`/dashboard/default` and `/api/health`), `docs/phases/`, the context pack,
`testing/` (the leak and placement gates on this tree's files; the e2e tier
building and serving the site and walking every dashboard, the auth screens,
the social card, the fonts, a layout cookie and the routes) and
`baseline.yml` / `tag.yml`.
