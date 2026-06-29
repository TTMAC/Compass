// Minimal static file server for the production build in ./dist.
//
// Replaces `astro preview`, which the @astrojs/netlify adapter does not support.
// It serves the prerendered pages and assets for the Playwright E2E suite
// against the real production output (not the dev server, whose toolbar and
// dev-only behaviour skew the tests). On-demand (prerender=false) routes are
// served by Netlify Functions in production and are intentionally absent here;
// the link checks skip them.
//
// Build first: `npm run build`. In CI the build job produces the dist artifact
// which the e2e job restores before this server runs.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const DIST = join(process.cwd(), "dist");
const PORT = Number(process.env.PORT) || 4321;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
};

async function resolveFile(pathname) {
  let rel = decodeURIComponent(pathname);
  rel = normalize(rel).replace(/^(\.\.(\/|\\|$))+/, ""); // no path traversal
  const candidates = rel.endsWith("/")
    ? [join(DIST, rel, "index.html")]
    : [
        join(DIST, rel),
        join(DIST, `${rel}.html`),
        join(DIST, rel, "index.html"),
      ];
  for (const f of candidates) {
    try {
      if ((await stat(f)).isFile()) return f;
    } catch {
      // try next candidate
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`);
  const file = await resolveFile(pathname || "/");
  if (!file) {
    try {
      const body = await readFile(join(DIST, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
    return;
  }
  const type = TYPES[extname(file).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  res.end(await readFile(file));
});

server.listen(PORT, () => {
  console.log(`[serve-dist] serving ./dist at http://localhost:${PORT}`);
});
