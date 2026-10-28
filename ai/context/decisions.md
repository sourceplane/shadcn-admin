# shadcn-admin — decisions

The choices that shape this repository, one line each, with where the full
reasoning lives. The machinery's own decisions (one landing, the
stack-tectonic pin, the gate on `ws_CHANGE_ME`, the subdomain read from the
connection, no domain asked, the narration, `AGENTS.md`) are
portfolio-starter-kit's, carried unchanged; this page names them and adds
this site's.

| # | Decision | Why | Source |
|---|---|---|---|
| 1 | OpenNext on Workers + Static Assets (`cloudflare-workers-assets-turbo`), the static-assets incremental cache + `populateCache` | The template needs no data store: the static pages come from the assets cache, the dashboards render per request (they read layout cookies) | design.md |
| 2 | `next build --webpack`, not Turbopack | Turbopack's per-route server chunks put the Worker at 3.32 MiB gzipped, over Workers Free's 3 MiB; webpack's shared chunks make it 2.25 MiB | risk SA-B, IMPLEMENTATION-STATUS |
| 3 | The 17 font families self-hosted (`next/font/local` over each family's `@fontsource-variable` variable font, and `geist`), upstream's CSS variables kept | `next/font/google` fetches Google Fonts at build, which fails on GitHub's runners (strapi-launchpad found it); the picker and presets must not notice | IMPLEMENTATION-STATUS |
| 4 | The social card is one static `public/opengraph-image.png`, named in the metadata | The `opengraph-image`/`twitter-image` file convention compiled two copies of a 420 KB PNG into the Worker (about 0.8 MiB gzipped) | IMPLEMENTATION-STATUS |
| 5 | `robots.txt` is a static route (upstream's rules, the environment's sitemap URL); the sitemap and metadata read `NEXT_PUBLIC_SITE_URL` | Upstream named its demo's domain in a static file | IMPLEMENTATION-STATUS |
| 6 | The landing page's star count is fetched once by the build (`cache: "force-cache"`), for the site's own repository | The static-assets cache is read-only: an hourly revalidation has nowhere to write | risk SA-D |
| 7 | The template author's Google Analytics tag and author metadata are removed; the template's credits (its editions, its author) stay | A product built from it is not the author's site; the credits are the template's own | IMPLEMENTATION-STATUS |
| 8 | The rename engine masks the template's repository names, which spell this baseline's slug (`UPSTREAM_CREDIT`) | Renaming them would point the credits at repositories that do not exist; any other spelling of the slug still fails the sweep | `tooling/rebrand/rebrand.mjs` |
| 9 | The template's Biome is the app's lint; mock data and the design-only auth screens are kept as upstream | The template's own checks, the template's own screens | IMPLEMENTATION-STATUS |
| 10 | Next.js 16.3.8, not upstream's ^16.4.3 | @opennextjs/cloudflare 1.20.11 fails every request on Next 16.4.x | risk SA-C |
| 11 | One landing (`01-product`) then the record (`03-docs`); stack-tectonic 0.19.0; `ci.yml` plans nothing while `intent.yaml` names `ws_CHANGE_ME`; the subdomain read from the Cloudflare connection; no domain asked | portfolio-starter-kit's shape, carried unchanged | portfolio-starter-kit's decisions |
