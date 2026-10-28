import { existsSync, readFileSync } from "node:fs";
import * as path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const web = path.resolve(__dirname, "../../../apps/web");
const read = (p: string) => readFileSync(path.join(web, p), "utf8");
const ORIGIN = "https://admin.example.com";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("site identity (apps/web/src/config/site.ts)", () => {
  it("names the site and links its source repository", async () => {
    const { SITE_NAME, SOURCE_URL } = await import("@/config/site");
    expect(SITE_NAME.trim()).not.toBe("");
    expect(SOURCE_URL).toMatch(/^https:\/\/github\.com\/[A-Za-z0-9-]+\/[a-z0-9-]+$/);
  });

  it("keeps both literal and on one line each, for the rename to rewrite in place", () => {
    const src = read("src/config/site.ts");
    expect(src).toMatch(/^export const SITE_NAME = ".+";$/m);
    expect(src).toMatch(/^export const SOURCE_URL = "https:\/\/github\.com\/[^"]+";$/m);
  });
});

describe("the app's configuration (apps/web/src/config/app-config.ts)", () => {
  it("takes the environment's origin from NEXT_PUBLIC_SITE_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", ORIGIN);
    const { APP_CONFIG } = await import("@/config/app-config");
    expect(APP_CONFIG.url).toBe(ORIGIN);
  });

  it("falls back to the dev server's origin without one", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    const { APP_CONFIG } = await import("@/config/app-config");
    expect(APP_CONFIG.url).toBe("http://localhost:3000");
  });

  it("names the site, its repository and its social card from the seam", async () => {
    const { SITE_NAME, SOURCE_URL } = await import("@/config/site");
    const { APP_CONFIG, SOCIAL_IMAGE } = await import("@/config/app-config");
    expect(APP_CONFIG.name).toBe(SITE_NAME);
    expect(APP_CONFIG.repository).toBe(SOURCE_URL);
    expect(APP_CONFIG.meta.title.startsWith(`${SITE_NAME}:`)).toBe(true);
    expect(APP_CONFIG.copyright).toContain(SITE_NAME);
    expect(SOCIAL_IMAGE.url).toBe("/opengraph-image.png");
    expect(SOCIAL_IMAGE.alt).toContain(SITE_NAME);
    expect(existsSync(path.join(web, "public/opengraph-image.png"))).toBe(true);
  });

  it("loads no analytics tag of the template's author", () => {
    expect(read("src/app/layout.tsx")).not.toMatch(/googletagmanager|gtag\(/);
  });
});

describe("the landing page's star count", () => {
  it("asks GitHub about the site's own repository", async () => {
    const { starCountUrl } = await import("@/app/(external)/_hooks/star-count-url");
    expect(starCountUrl("https://github.com/acme-inc/acme-admin")).toBe(
      "https://api.github.com/repos/acme-inc/acme-admin/stargazers/count",
    );
  });

  it("is fetched once by the build, not revalidated by the Worker", () => {
    const intro = read("src/app/(external)/_components/intro.tsx");
    expect(intro).toContain('cache: "force-cache"');
    expect(intro).not.toMatch(/revalidate/);
  });
});

describe("robots.txt and the sitemap", () => {
  it("robots.txt keeps upstream's rules and names the environment's own sitemap", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", ORIGIN);
    const { GET } = await import("@/app/robots.txt/route");
    const res = GET();
    const body = await res.text();
    expect(res.headers.get("content-type")).toMatch(/^text\/plain/);
    expect(body).toMatch(/^User-Agent: \*$/m);
    expect(body).toMatch(/^User-Agent: ClaudeBot$/m);
    expect(body.trim().split("\n").at(-1)).toBe(`Sitemap: ${ORIGIN}/sitemap.xml`);
    expect(body).not.toContain("arhamkhnz.com");
  });

  it("the sitemap lists the pages under the environment's origin", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", ORIGIN);
    const { default: sitemap } = await import("@/app/sitemap");
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain(`${ORIGIN}/dashboard/default`);
    expect(urls.every((u) => u.startsWith(`${ORIGIN}/`))).toBe(true);
  });
});

describe("the health route (the deploy's smoke)", () => {
  it("answers ok", async () => {
    const { GET } = await import("@/app/api/health/route");
    const res = GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});

describe("the fonts (apps/web/src/lib/fonts/registry.ts)", () => {
  it("are self-hosted: nothing from Google, and every file exists", () => {
    const src = read("src/lib/fonts/registry.ts");
    expect(src).not.toMatch(/from "next\/font\/google"/);
    const files = [...src.matchAll(/src: "([^"]+)"/g)].map((m) => m[1]);
    expect(files).toHaveLength(17);
    for (const f of files) {
      expect(existsSync(path.resolve(web, "src/lib/fonts", f!)), f).toBe(true);
    }
  });

  it("keeps upstream's CSS variables, so the theme presets still find them", () => {
    const src = read("src/lib/fonts/registry.ts");
    for (const v of ["--font-geist", "--font-inter", "--font-geist-mono", "--font-jetbrains-mono", "--font-lora"]) {
      expect(src).toContain(`variable: "${v}"`);
    }
  });
});
