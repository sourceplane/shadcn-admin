# shadcn-admin

An admin dashboard — Studio Admin's dashboards (default, CRM, finance,
analytics, e-commerce, logistics and more), auth screens, chat, mail, a
kanban board, a calendar, data tables and charts over mock data, with theme
presets and layout controls, built with Next.js 16 and shadcn/ui — on
**Cloudflare Workers + Static Assets** through [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

Working on it with a coding agent? [AGENTS.md](AGENTS.md) says what to read
first, how a change lands and what not to touch.

## Live deployment

<!-- 03-docs:begin -->
Not recorded yet. The bootstrap's last phase writes the live URLs, the
workspace and the secrets the site uses into
[ai/context/deployment.md](ai/context/deployment.md); how the site deploys
and how to operate it is in
[ai/context/operations.md](ai/context/operations.md).
<!-- 03-docs:end -->

## What is here

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

The data is the template's mock data: each screen's `_components` holds its
own, so wiring one to your source is that folder's change. The sign-in and
sign-up screens are the template's design screens — they sign nobody in;
add your auth provider before you put anything private behind them. Make
the site yours in `apps/web/src/config/site.ts` (its name and the repository
the landing page links to); the landing page itself is
`apps/web/src/app/(external)`, and it still credits the template and its
author.

One optional build-time variable (`apps/web/.env.example`):

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The site's public origin for the sitemap, robots, Open Graph and JSON-LD links. The deploy sets it per environment (see below). Defaults to `http://localhost:3000`. |

## How it deploys

Merges to `main` converge through [Orun](https://github.com/sourceplane/orun):
`.github/workflows/ci.yml` plans the changed components and runs each lane
against the workspace in `intent.yaml`. The site deploys to `stage`, then to
`prod` once stage has converged on the same commit; `dev` only verifies. The
Worker is `shadcn-admin-web-<env>` on your account's workers.dev
subdomain, and every deploy is smoke-tested over HTTP. A pull request runs
the same pipeline's verify lanes: the site built and dry-deployed for each
environment, with nothing deployed. They do not lint or run the tests, so
run `pnpm typecheck`, `pnpm lint` and `pnpm test` before you push. (A push
to `main` builds, deploys and smoke-tests.)

The pipeline holds one credential, GitHub's own `GITHUB_TOKEN`. The
Cloudflare token and account id are brokered per run from the workspace's
Cloudflare connection; nothing provider-shaped is stored in the repository
or in GitHub.

**Deploy by hand.** Orunbase's **Deploy** button on a component, or **Run
workflow** on the CI workflow in GitHub's Actions tab (on `main`), runs
`ci.yml` for the environment and components you pick, and each one deploys
exactly as a merge would deploy it. Leave the component blank to redeploy
every component in that environment, with nothing changed: after rotating a
secret, say. A component with nothing to run in that environment (a test
suite in `prod`) is left out with a notice.

## Custom domain

The site answers on workers.dev from its first deploy. To serve it on your
own domain:

1. Add the domain to the Cloudflare account the site deploys into, and attach
   it to the Worker (dashboard → Workers & Pages →
   `shadcn-admin-web-prod` → Settings → Domains & Routes → Add →
   Custom domain). Do the same for stage with a subdomain if you want one.
2. Set the environment's public origin in `intent.yaml`, so the sitemap,
   robots, Open Graph and JSON-LD links use it (until then they use the
   workers.dev URL):

   ```yaml
   environments:
     prod:
       env:
         SITE_URL: https://shadcn-admin.example.com
   ```

   The site was born with the reserved placeholder
   `shadcn-admin.example.com` where its domain goes: that example,
   and `BASE_DOMAIN` under each environment (dev, stage and prod) in
   `intent.yaml`. Replace it with your domain in the same change.

3. Merge. The next deploy of `apps/web` builds with the new origin. (A change
   to `intent.yaml` alone deploys nothing — touch `apps/web` in the same pull
   request, or let the next change to the site carry it.)

## Credits

The site is [Studio Admin](https://github.com/arhamkhnz/next-shadcn-admin-dashboard)
by Arham Khan (MIT — `apps/web/LICENSE.md`), the template Vercel lists as
the Next.js & shadcn/ui Admin Dashboard. Its fonts are the families' own
variable fonts from Fontsource (OFL-1.1; Roboto Slab Apache-2.0) and Vercel's
Geist (OFL-1.1).
