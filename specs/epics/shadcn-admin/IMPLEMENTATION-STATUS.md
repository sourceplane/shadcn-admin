# shadcn-admin — implementation status

| Milestone | State | Landed |
|---|---|---|
| SA0 — the spec | ✅ | the repository's first commit |
| SA1 — the admin dashboard on Workers | ✅ | SA-2 |
| SA2 — a baseline | ✅ | SA-3, tagged `baseline-v1` |

## Departures from the upstream template

Everything not listed here is the template as it is upstream at `89f28da`.

| # | What | Why |
|---|---|---|
| 1 | The app lives in `apps/web` of a pnpm workspace (the root lockfile, pnpm 10.12.1), its dependencies pinned at upstream's `package-lock.json` versions; husky and lint-staged are left out | One lockfile for the workspace; the workspace's git hooks are its CI |
| 2 | Next 16.3.8, not ^16.4.3 | `@opennextjs/cloudflare` 1.20.11 fails on 16.4.x (risk SA-C) |
| 3 | `next.config.mjs`: `output: 'standalone'`, `outputFileTracingRoot` and `turbopack.root` at the workspace root, `images.unoptimized` | OpenNext builds from the standalone output; Workers has no image optimizer |
| 4 | `build` is `next build --webpack`, then OpenNext | Turbopack's Worker is over Workers Free's 3 MiB gzipped (risk SA-B) |
| 5 | `src/lib/fonts/registry.ts`: `next/font/local` over `@fontsource-variable/*` 5.3.0 (latin, variable) and `geist`'s files, for the same 17 families and CSS variables | `next/font/google` fetches Google Fonts at build, which fails on GitHub's runners (risk SA-F) |
| 6 | The social card is `public/opengraph-image.png`, named in the root and landing metadata (`SOCIAL_IMAGE`); `twitter-image.png` and the `.alt.txt` files go | The file convention compiled two copies of the PNG into the Worker |
| 7 | `src/config/site.ts` (`SITE_NAME`, `SOURCE_URL`); `APP_CONFIG` reads them, and its `url` is `NEXT_PUBLIC_SITE_URL` (was the author's domain) | One rename seam; the origin per environment |
| 8 | `robots.txt` is `src/app/robots.txt/route.ts`: upstream's rules, then the environment's sitemap URL | Upstream's file named the author's domain |
| 9 | The landing's star count reads `SOURCE_URL`'s repository (`starCountUrl`), fetched once at build (`force-cache`, was `revalidate: 3600`) | The site's own repository; the cache is read-only (risk SA-D) |
| 10 | The Google Analytics tag, `authors` and `twitter.creator` are removed from the root layout | They are the author's |
| 11 | `vercel.json` (a redirect to the author's domain) is not carried | The site serves on its own origin |
| 12 | `src/app/api/health/route.ts` | The deploy's smoke |
| 13 | `src/types/next-image-types.d.ts` | `tsc` on a fresh tree, before `next-env.d.ts` exists, knows image imports |
| 14 | The landing's screenshots (`media/`) and upstream's `.gitignore` sit in `apps/web` | The landing imports them; Biome reads the ignore file |
| 15 | `open-next.config.ts`, `wrangler.jsonc`, `component.yaml`, `.env.example` (one variable) | The Workers build and its deploy contract |
| 16 | `tests/web` (vitest) | The template ships none |
