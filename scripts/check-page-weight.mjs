#!/usr/bin/env node

/**
 * Page-weight budget checker.
 * Scans dist/ for HTML pages and reports total transfer size per page
 * (HTML + CSS + JS assets referenced by each page).
 *
 * Usage:
 *   node scripts/check-page-weight.mjs          # after npm run build
 *   node scripts/check-page-weight.mjs --strict  # exits 1 if any page exceeds budget
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, extname } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = "dist";
const BUDGET_HARD = 450 * 1024; // 450 KB
const BUDGET_TARGET = 250 * 1024; // 250 KB
const strict = process.argv.includes("--strict");

async function findFiles(dir, ext) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findFiles(full, ext)));
    } else if (extname(entry.name) === ext) {
      results.push(full);
    }
  }
  return results;
}

function gzipSize(buf) {
  return gzipSync(buf, { level: 9 }).length;
}

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function getAssetSizes() {
  const sizes = new Map();
  for (const ext of [".css", ".js"]) {
    const files = await findFiles(DIST, ext);
    for (const f of files) {
      const buf = await readFile(f);
      const rel = "/" + relative(DIST, f);
      sizes.set(rel, { raw: buf.length, gzip: gzipSize(buf) });
    }
  }
  return sizes;
}

function extractAssetRefs(html) {
  const refs = [];
  // CSS: <link rel="stylesheet" href="...">
  const cssRe = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/g;
  let m;
  while ((m = cssRe.exec(html))) refs.push(m[1]);
  // JS: <script src="...">
  const jsRe = /<script[^>]+src=["']([^"']+)["']/g;
  while ((m = jsRe.exec(html))) refs.push(m[1]);
  return refs;
}

async function main() {
  const htmlFiles = await findFiles(DIST, ".html");
  const assetSizes = await getAssetSizes();

  const pages = [];
  let overBudget = 0;

  for (const htmlPath of htmlFiles) {
    const buf = await readFile(htmlPath);
    const html = buf.toString();
    const htmlGzip = gzipSize(buf);
    const route = "/" + relative(DIST, htmlPath).replace(/index\.html$/, "");

    const refs = extractAssetRefs(html);
    let totalGzip = htmlGzip;
    const assets = [];

    for (const ref of refs) {
      const assetPath = ref.startsWith("/") ? ref : "/" + ref;
      const size = assetSizes.get(assetPath);
      if (size) {
        totalGzip += size.gzip;
        assets.push({ path: assetPath, gzip: size.gzip });
      }
    }

    pages.push({ route, htmlGzip, totalGzip, assets });
    if (totalGzip > BUDGET_HARD) overBudget++;
  }

  pages.sort((a, b) => b.totalGzip - a.totalGzip);

  // Summary table
  console.log("\n  Page Weight Budget Report");
  console.log("  " + "=".repeat(60));
  console.log(
    `  ${"Route".padEnd(45)} ${"Gzip".padStart(8)}  Status`,
  );
  console.log("  " + "-".repeat(60));

  for (const p of pages) {
    let status;
    if (p.totalGzip > BUDGET_HARD) status = "OVER BUDGET";
    else if (p.totalGzip > BUDGET_TARGET) status = "warning";
    else status = "ok";

    console.log(
      `  ${p.route.padEnd(45)} ${formatKB(p.totalGzip).padStart(8)}  ${status}`,
    );
  }

  console.log("  " + "-".repeat(60));
  console.log(`  Budget: target ${formatKB(BUDGET_TARGET)} / hard limit ${formatKB(BUDGET_HARD)} (gzipped)`);
  console.log(`  Pages: ${pages.length} total, ${overBudget} over hard limit\n`);

  // Top 5 heaviest assets
  const allAssets = [...assetSizes.entries()].sort(
    (a, b) => b[1].gzip - a[1].gzip,
  );
  if (allAssets.length) {
    console.log("  Top assets by gzip size:");
    for (const [path, size] of allAssets.slice(0, 5)) {
      console.log(`    ${formatKB(size.gzip).padStart(8)}  ${path}`);
    }
    console.log();
  }

  if (strict && overBudget > 0) {
    console.error(`  ERROR: ${overBudget} page(s) exceed the ${formatKB(BUDGET_HARD)} hard limit.\n`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
