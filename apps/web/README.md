# apps/web — the site

Studio Admin, the admin dashboard from Vercel's
[Next.js & shadcn/ui Admin Dashboard](https://github.com/arhamkhnz/next-shadcn-admin-dashboard)
template (MIT), running on Cloudflare Workers + Static Assets:

- Two dozen screens (`src/app/(main)`): the dashboards default, CRM, finance,
  analytics, e-commerce, products, academy, logistics, infrastructure, file
  manager, patient monitoring, productivity, calendar, kanban, tasks, users,
  roles, invoice and profile, and chat and mail — over the template's mock data
- Auth screens (`/auth/v1`, `/auth/v2`): design only, they sign nobody in
- Theme presets, fonts and layout preferences (`src/styles/presets`,
  `src/lib/fonts`, `src/lib/preferences`), kept in cookies
- A landing page (`src/app/(external)`), sitemap, robots and `/api/health`
- Next.js 16, React 19, Tailwind CSS v4, shadcn/ui, Biome

The site's name and the repository its landing page links to are in
`src/config/site.ts`. The fonts are self-hosted from `@fontsource-variable`
packages (`src/lib/fonts/registry.ts`).

```bash
pnpm dev        # next dev on http://localhost:3000
pnpm build      # next build --webpack + opennextjs-cloudflare build → .open-next/
pnpm preview    # wrangler dev over the built Worker
pnpm check      # biome
```

How it is deployed — per environment, on merge to `main` — is the
repository's README and `component.yaml` beside this file.
