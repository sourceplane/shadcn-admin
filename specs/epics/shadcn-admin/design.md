# shadcn-admin — design

## The template

[arhamkhnz/next-shadcn-admin-dashboard](https://github.com/arhamkhnz/next-shadcn-admin-dashboard)
(Next.js 16.4 App Router, React 19 with the React Compiler, Tailwind CSS 4,
shadcn/ui on Radix UI, Biome) is Studio Admin, the template Vercel lists as
"Next.js & shadcn/ui Admin Dashboard": a landing page, then two dozen
screens — under `/dashboard` default, CRM, finance, analytics, e-commerce,
products, academy, logistics, infrastructure, file manager, patient
monitoring, productivity, calendar, kanban, tasks, users, roles, invoice and
profile, beside `/chat` and `/mail` — and the auth screens (`/auth/v1`, `/auth/v2`: login,
register). Every screen draws on mock data in its own `_components`; the
auth screens are design only and sign nobody in. A preferences panel picks
a theme preset, a font (17 Google families through `next/font/google`), the
content width, the navbar and the sidebar's variant and collapse, and keeps
them in cookies that the server layout reads, so the dashboards render per
request. It deploys to Vercel with no environment variables.

## How it maps to Cloudflare

| Vercel | Here | Why |
|---|---|---|
| Next.js hosting | One Worker built by `@opennextjs/cloudflare` (`output: 'standalone'`), the static-assets incremental cache and `populateCache local` | The landing page, the sitemap and robots are pre-rendered and come from the assets; the dashboards read cookies and render in the Worker; nothing needs a binding |
| `next build` (Turbopack) | `next build --webpack` | Turbopack's per-route server chunks make the Worker 3.32 MiB gzipped, over Workers Free's 3 MiB; webpack's shared chunks make it 2.25 MiB (risk SA-B) |
| `next/font/google` (17 families) | `next/font/local` over each family's `@fontsource-variable` latin variable font, and `geist`'s own files; the same CSS variables | `next/font/google` downloads from Google Fonts at build, which fails on GitHub's runners; the picker and the presets read the variables and do not notice |
| `opengraph-image.png` / `twitter-image.png` (the file convention) | One `public/opengraph-image.png`, named by the root and landing metadata | The convention compiles each PNG into a Worker route: two copies of a 420 KB image, about 0.8 MiB gzipped |
| `metadataBase`, the sitemap and `robots.txt` on the author's domain | `NEXT_PUBLIC_SITE_URL` per environment; `robots.txt` a static route that names the environment's sitemap | A site built from this is not the author's |
| The landing's star count (`revalidate: 3600`) | Fetched once by the build (`force-cache`), for the site's own repository | The static-assets cache is read-only: a revalidation has nowhere to write (risk SA-D) |
| The author's Google Analytics tag | Removed | It reports to the author's property |
| `vercel.json` (a host redirect to the author's domain) | Not carried | The site serves on its own origin |

## The repository

portfolio-starter-kit's shape: `apps/web` (type
`cloudflare-workers-assets-turbo`, lane `isolated`) and `tests/web` (type
`turbo-package`, a vitest suite run on the `dev` rung). No infrastructure:
the data is the template's mock data. The site's name is one seam,
`SITE_NAME` in `apps/web/src/config/site.ts`, which the template's
`APP_CONFIG` reads (the page title, the landing header, the copyright, the
social card's alt text); `SOURCE_URL` is the landing's GitHub link and the
repository its star count reads, rewritten to the site's repository. The
template's own lint is Biome, and stays.

## The build

`next build --webpack` (the React Compiler, the template's Tailwind
PostCSS), then `opennextjs-cloudflare build --skipBuild` and `populateCache
local`. `repo-blueprint.yaml` is portfolio-starter-kit's: one landing
(`01-product`) places, brands and lands the whole tree, one convergence
builds and deploys stage and prod side by side, and `03-docs` records what
went live. The smoke checks the landing page links the dashboard, the
dashboard renders its sidebar, and `/api/health` is ok.

## Out of scope

- Real sign-in behind the auth screens: the template ships them as design.
- A data store behind the screens: the template's data is mock data, and an
  owner who wants one adds it.
- The template's other editions (Base UI, React Aria, TanStack Start): the
  Radix UI edition on Next.js is the one Vercel lists.

## The alternative rejected

**Workers Paid, keeping Turbopack.** Turbopack is the template's default
bundler and Next 16's, and Workers Paid takes a 10 MiB Worker. But a
baseline that asks every site built from it for a paid plan to save a build
flag costs every owner; webpack builds the same pages, the e2e tier checks
every route, and the README says how to go back.
