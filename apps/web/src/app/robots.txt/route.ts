import { APP_CONFIG } from "@/config/app-config";

// Upstream's robots.txt, served as a route so its sitemap line names this
// environment's own origin (the static file named the template's demo domain).
// Rendered once by the build.
export const dynamic = "force-static";

const RULES = "User-Agent: *\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: OAI-SearchBot\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: Claude-SearchBot\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: Amzn-SearchBot\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: GPTBot\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: ClaudeBot\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: Claude-Web\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: anthropic-ai\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: Google-Extended\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: Amazonbot\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: Bytespider\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: CCBot\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nUser-Agent: Applebot-Extended\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n";

export function GET(): Response {
  return new Response(`${RULES}\nSitemap: ${new URL("/sitemap.xml", APP_CONFIG.url).href}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
