#!/usr/bin/env node
// Automated editorial audit for Item 34.
// Checks word count, frontmatter integrity, series linkage, emoji, forbidden terms.
// Outputs a report to reviews/automated-pass.md.

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTICLES_DIR = join(ROOT, "src/content/articles");
const REVIEWS_DIR = join(ROOT, "reviews");
const WORD_MIN = 4500;

// Whitelist ™ (trademark) — used legitimately on the RAARICLE™ framework name.
const EMOJI_ALLOW = new Set(["™", "®", "©"]);
const EMOJI_RE = /\p{Extended_Pictographic}/u;
function isDisallowedEmoji(ch) { return !EMOJI_ALLOW.has(ch); }
const FORBIDDEN_TERMS = [
  { term: "blog post", re: /\bblog posts?\b/gi, severity: "blocker", note: "domain: use 'article'" },
  { term: "blog", re: /\bblogs?\b/gi, severity: "should-fix", note: "domain: use 'series' or 'article'" },
  // "users" removed — every hit across the corpus was legitimate domain usage
  // (service users, user fees/charges/tariffs, data tool users, "users of financial statements").
  // Re-introduce only if a narrower pattern emerges for reader/citizen drift.
  // "tier" removed — all 125 corpus hits were legitimate domain usage (policing tiers,
  // MPI performance tiers, court tiers, "tier of institutions" category usage, or the
  // explanatory "spheres not tiers" framing from Section 40(1)).
  // "section (series)" removed — all 3 hits were intra-article navigation to ## headings,
  // not cross-series Part references.
  { term: "level of government", re: /\blevels? of government\b/gi, severity: "should-fix", note: "domain: 'sphere of government'" },
];

const SERIES_BATCHES = {
  "Core Series (Parts 1–5)": (s) => /^[1-5]-\d+-/.test(s),
  "Economic Growth & Development": (s) => s.startsWith("eg-"),
  "Human Development": (s) => s.startsWith("hd-"),
  "Reform Agenda": (s) => s.startsWith("ra-"),
  "Safety & Security": (s) => s.startsWith("ss-"),
};

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: null, body: src, raw: "" };
  const raw = m[1];
  const body = src.slice(m[0].length);
  const fm = {};
  const lines = raw.split("\n");
  let key = null;
  let nested = null;
  for (const line of lines) {
    const topMatch = line.match(/^([a-zA-Z_][\w]*): ?(.*)$/);
    const nestedMatch = line.match(/^ {2}([a-zA-Z_][\w]*): ?(.*)$/);
    if (topMatch) {
      key = topMatch[1];
      const val = topMatch[2].trim();
      if (val === "") {
        fm[key] = {};
        nested = key;
      } else {
        fm[key] = stripQuotes(val);
        nested = null;
      }
    } else if (nestedMatch && nested) {
      fm[nested][nestedMatch[1]] = stripQuotes(nestedMatch[2].trim());
    }
  }
  return { fm, body, raw };
}

function stripQuotes(v) {
  if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1);
  if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1);
  if (v === "null") return null;
  return v;
}

function countWords(body) {
  const stripped = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_>\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return stripped ? stripped.split(" ").length : 0;
}

function findEmoji(body) {
  const hits = [];
  body.split("\n").forEach((line, i) => {
    const matches = line.match(/\p{Extended_Pictographic}/gu) || [];
    const disallowed = matches.filter(isDisallowedEmoji);
    if (disallowed.length) {
      hits.push({ line: i + 1, text: line.trim().slice(0, 120), ch: disallowed.join(" ") });
    }
  });
  return hits;
}

function stripUrls(body) {
  // Strip markdown link targets and bare URLs so forbidden-term scans don't match URL params.
  return body
    .replace(/\]\([^)]*\)/g, "]()")
    .replace(/https?:\/\/\S+/g, " ");
}

function findForbidden(body) {
  const scanBody = stripUrls(body);
  const hits = {};
  for (const f of FORBIDDEN_TERMS) {
    const matches = scanBody.match(f.re);
    if (matches) hits[f.term] = { count: matches.length, severity: f.severity, note: f.note };
  }
  return hits;
}

function batchOf(slug) {
  for (const [name, fn] of Object.entries(SERIES_BATCHES)) if (fn(slug)) return name;
  return "Unknown";
}

function main() {
  const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md")).sort();
  const articles = {};
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const src = readFileSync(join(ARTICLES_DIR, file), "utf8");
    const { fm, body } = parseFrontmatter(src);
    articles[slug] = {
      slug,
      batch: batchOf(slug),
      fm,
      body,
      wordCount: countWords(body),
      emoji: findEmoji(body),
      forbidden: findForbidden(body),
      fmIssues: [],
      linkIssues: [],
    };
  }

  // Frontmatter validation
  for (const a of Object.values(articles)) {
    if (!a.fm) {
      a.fmIssues.push("missing frontmatter");
      continue;
    }
    const required = ["title", "subtitle", "part", "articleNumber", "description", "publishDate", "readingTime", "status", "series"];
    for (const k of required) if (a.fm[k] === undefined) a.fmIssues.push(`missing ${k}`);
    if (a.fm.description && typeof a.fm.description === "string") {
      const len = a.fm.description.length;
      if (len < 150) a.fmIssues.push(`description ${len} chars (<150)`);
      if (len > 160) a.fmIssues.push(`description ${len} chars (>160)`);
    }
    if (!a.fm.sphere && !a.fm.pillar) a.fmIssues.push("missing sphere/pillar");
  }

  // Series linkage integrity (per-batch)
  const byBatch = {};
  for (const a of Object.values(articles)) (byBatch[a.batch] ||= []).push(a);
  for (const [batch, list] of Object.entries(byBatch)) {
    list.sort((x, y) => x.slug.localeCompare(y.slug));
    for (const a of list) {
      const prev = a.fm?.series?.prev;
      const next = a.fm?.series?.next;
      if (prev && !articles[prev]) a.linkIssues.push(`prev→${prev} missing`);
      if (next && !articles[next]) a.linkIssues.push(`next→${next} missing`);
      if (prev && articles[prev] && articles[prev].fm?.series?.next !== a.slug) {
        a.linkIssues.push(`prev (${prev}) does not point back`);
      }
      if (next && articles[next] && articles[next].fm?.series?.prev !== a.slug) {
        a.linkIssues.push(`next (${next}) does not point back`);
      }
    }
  }

  // Build report
  const lines = [];
  lines.push("# Automated Editorial Audit — Item 34 Pass 1");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Articles scanned: ${files.length}`);
  lines.push(`Word minimum: ${WORD_MIN}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");

  const all = Object.values(articles);
  const underWord = all.filter((a) => a.wordCount < WORD_MIN);
  const withFmIssues = all.filter((a) => a.fmIssues.length);
  const withLinkIssues = all.filter((a) => a.linkIssues.length);
  const withEmoji = all.filter((a) => a.emoji.length);
  const withForbidden = all.filter((a) => Object.keys(a.forbidden).length);

  lines.push(`- **Word count < ${WORD_MIN}:** ${underWord.length}`);
  lines.push(`- **Frontmatter issues:** ${withFmIssues.length}`);
  lines.push(`- **Series linkage issues:** ${withLinkIssues.length}`);
  lines.push(`- **Emoji in body:** ${withEmoji.length}`);
  lines.push(`- **Forbidden-term hits (any severity):** ${withForbidden.length}`);
  lines.push("");

  // Per-batch breakdown
  lines.push("## Per-Batch Breakdown");
  lines.push("");
  for (const [batch, list] of Object.entries(byBatch)) {
    list.sort((x, y) => x.slug.localeCompare(y.slug));
    const u = list.filter((a) => a.wordCount < WORD_MIN).length;
    const fm = list.filter((a) => a.fmIssues.length).length;
    const lk = list.filter((a) => a.linkIssues.length).length;
    const em = list.filter((a) => a.emoji.length).length;
    const fb = list.filter((a) => Object.keys(a.forbidden).length).length;
    lines.push(`### ${batch} (${list.length} articles)`);
    lines.push("");
    lines.push(`Under ${WORD_MIN} words: **${u}** | Frontmatter issues: **${fm}** | Linkage issues: **${lk}** | Emoji: **${em}** | Forbidden-term hits: **${fb}**`);
    lines.push("");
    lines.push("| Slug | Words | < min | FM | Links | Emoji | Forbidden |");
    lines.push("|---|---:|:-:|:-:|:-:|:-:|:-:|");
    for (const a of list) {
      const under = a.wordCount < WORD_MIN ? "❌" : "✓";
      const fmMark = a.fmIssues.length ? "❌" : "✓";
      const lkMark = a.linkIssues.length ? "❌" : "✓";
      const emMark = a.emoji.length ? "❌" : "✓";
      const fbCount = Object.values(a.forbidden).reduce((s, x) => s + x.count, 0);
      const fbMark = fbCount ? `${fbCount}` : "✓";
      lines.push(`| ${a.slug} | ${a.wordCount} | ${under} | ${fmMark} | ${lkMark} | ${emMark} | ${fbMark} |`);
    }
    lines.push("");
  }

  // Detailed findings
  lines.push("## Detailed Findings");
  lines.push("");

  if (underWord.length) {
    lines.push(`### Word Count Below ${WORD_MIN}`);
    lines.push("");
    lines.push("| Slug | Words | Deficit |");
    lines.push("|---|---:|---:|");
    for (const a of underWord.sort((x, y) => x.wordCount - y.wordCount)) {
      lines.push(`| ${a.slug} | ${a.wordCount} | ${WORD_MIN - a.wordCount} |`);
    }
    lines.push("");
  }

  if (withFmIssues.length) {
    lines.push("### Frontmatter Issues");
    lines.push("");
    for (const a of withFmIssues) {
      lines.push(`- **${a.slug}** — ${a.fmIssues.join("; ")}`);
    }
    lines.push("");
  }

  if (withLinkIssues.length) {
    lines.push("### Series Linkage Issues");
    lines.push("");
    for (const a of withLinkIssues) {
      lines.push(`- **${a.slug}** — ${a.linkIssues.join("; ")}`);
    }
    lines.push("");
  }

  if (withEmoji.length) {
    lines.push("### Emoji in Body");
    lines.push("");
    for (const a of withEmoji) {
      lines.push(`- **${a.slug}** — ${a.emoji.length} line(s):`);
      for (const h of a.emoji.slice(0, 5)) {
        lines.push(`  - L${h.line} \`${h.ch}\`: ${h.text}`);
      }
    }
    lines.push("");
  }

  if (withForbidden.length) {
    lines.push("### Forbidden-Term Hits");
    lines.push("");
    lines.push("_Note: many of these are false positives (e.g. 'three-tier policing' is legitimate). Manual triage required._");
    lines.push("");
    lines.push("| Slug | Term | Count | Severity | Note |");
    lines.push("|---|---|---:|---|---|");
    for (const a of withForbidden) {
      for (const [term, info] of Object.entries(a.forbidden)) {
        lines.push(`| ${a.slug} | ${term} | ${info.count} | ${info.severity} | ${info.note} |`);
      }
    }
    lines.push("");
  }

  if (!existsSync(REVIEWS_DIR)) mkdirSync(REVIEWS_DIR, { recursive: true });
  const out = join(REVIEWS_DIR, "automated-pass.md");
  writeFileSync(out, lines.join("\n"));
  console.log(`Wrote ${out}`);
  console.log(`\nSummary: ${files.length} articles | ${underWord.length} under ${WORD_MIN} words | ${withFmIssues.length} fm issues | ${withLinkIssues.length} link issues | ${withEmoji.length} with emoji | ${withForbidden.length} with forbidden terms`);
}

main();
