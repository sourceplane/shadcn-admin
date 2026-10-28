# shadcn-admin — risks and open questions

| ID | Risk | State | Notes |
|---|---|---|---|
| SA-A | `baseline-v1` is not yet proven live | OPEN | Proven offline in Baseline CI: the offline bootstrap with the blueprint's own hooks, the stage lane's own steps in a staged job tree, the site served by `wrangler dev` and smoke-tested with the component's own command, every dashboard walked. A console bootstrap closes it |
| SA-B | The Worker is 2.25 MiB gzipped; Workers Free stops at 3 MiB | WATCH | Turbopack made it 3.32 MiB; webpack's shared chunks 2.25 MiB. A template upgrade that adds screens or a chart library can cross it: measure with `wrangler deploy --dry-run` on every upgrade. Past 3 MiB, a site needs Workers Paid (10 MiB) |
| SA-C | Next 16.3.8, not 16.4.3 | ACCEPTED | `@opennextjs/cloudflare` 1.20.11 fails every request on Next 16.4.x; every OpenNext starter here is proven on 16.3.8, and the template uses nothing 16.4 adds |
| SA-D | The landing's star count is as fresh as the last deploy | ACCEPTED | Upstream revalidates it hourly; the static-assets cache is read-only, so the build fetches it once (and renders no count when GitHub refuses). The client hook still refreshes it in the browser |
| SA-E | The auth screens sign nobody in | ACCEPTED | They are the template's design-only screens, kept as upstream; the README and the site's `AGENTS.md` say so |
| SA-F | Fonts from `@fontsource-variable`, latin subset | ACCEPTED | Google serves the same families; the Fontsource packages carry the same variable fonts, and the latin subset is what upstream's `subsets: ["latin"]` asked for. Roboto Slab is Apache-2.0, the rest OFL-1.1 |
