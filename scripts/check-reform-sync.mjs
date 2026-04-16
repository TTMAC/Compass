#!/usr/bin/env node
// Detects when articles propose new institutions / statutes / mechanisms
// that are not yet reflected in src/data/reforms.ts (the source of truth
// for the Reform Roadmap page at /real-steps-to-reform).
//
// What it does
// ────────────
// 1. Compares mtimes — flags articles modified after reforms.ts.
// 2. Scans changed articles for proposal candidates:
//      - Named statutes        →  "X Act" / "X Bill" / "X Amendment Act"
//      - Named institutions    →  "X Office" / "Authority" / "Council" /
//                                 "Commission" / "Agency" / "Regulator" /
//                                 "Directorate" / "Tribunal" / "Board"
//      - Named frameworks      →  "X Framework" / "Architecture" / "Platform" /
//                                 "Mechanism" / "Protocol"
//      - Article-level headings (## / ###) that look like proposals
//        ("Component N:", "Defence N:", "Recommendation", "Reform N:")
// 3. For each candidate, checks whether it appears in reforms.ts.
//    Misses are reported as potential gaps.
//
// Usage
// ─────
//   node scripts/check-reform-sync.mjs              → human-readable report
//   node scripts/check-reform-sync.mjs --json       → JSON to stdout
//   node scripts/check-reform-sync.mjs --strict     → exit 1 if any gaps found
//   node scripts/check-reform-sync.mjs --since=ts   → override the staleness baseline
//
// Output: prints to stdout, also writes reviews/reform-sync.md

import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTICLES_DIR = join(ROOT, "src/content/articles");
const REFORMS_TS = join(ROOT, "src/data/reforms.ts");
const REVIEWS_DIR = join(ROOT, "reviews");
const REPORT_PATH = join(REVIEWS_DIR, "reform-sync.md");

const args = new Set(process.argv.slice(2));
const JSON_OUT = args.has("--json");
const STRICT = args.has("--strict");
const sinceArg = [...args].find((a) => a.startsWith("--since="));
const SINCE_OVERRIDE = sinceArg ? new Date(sinceArg.split("=")[1]).getTime() : null;

// Words too generic on their own — they only count as a candidate when prefixed
// with a Capitalised qualifier (regex enforces this).
const INSTITUTION_NOUNS = [
  "Office", "Authority", "Council", "Commission", "Agency", "Regulator",
  "Directorate", "Tribunal", "Board", "Unit", "Inspectorate",
];
const FRAMEWORK_NOUNS = [
  "Framework", "Architecture", "Platform", "Mechanism", "Protocol",
  "Standard", "Model", "Pipeline", "Programme",
];
// Statute suffixes — must follow a Capitalised name chain.
const STATUTE_SUFFIXES = ["Act", "Bill", "Amendment Act", "Amendment Bill"];

// "X Y Z Office" — at least one Capitalised word before the noun.
function buildPattern(nouns) {
  // (?:[A-Z][\w'-]+\s+){1,6}NOUN  — 1–6 leading Capitalised words
  const alt = nouns.map((n) => n.replace(/ /g, "\\s+")).join("|");
  return new RegExp(
    `\\b((?:[A-Z][\\w'’-]+(?:\\s+(?:of|the|and|for|on|in|to|de|la)\\s+|\\s+)){1,6}(?:${alt}))\\b`,
    "g",
  );
}

const INSTITUTION_RE = buildPattern(INSTITUTION_NOUNS);
const FRAMEWORK_RE = buildPattern(FRAMEWORK_NOUNS);
const STATUTE_RE = buildPattern(STATUTE_SUFFIXES);
const HEADING_PROPOSAL_RE =
  /^#{2,4}\s+(?:Component\s+\d+:|Defence\s+\d+:|Recommendation\s+\d+:?|Reform\s+\d+:?|Vector\s+\d+:|Phase\s+\d+:?|Step\s+\d+:?)\s*(.+)$/gm;

// Candidates we always ignore — generic, off-topic, or already programme-level.
const STOPLIST = new Set([
  "the Act", "this Act", "the Bill", "this Bill",
  "the Office", "the Authority", "the Council", "the Commission", "the Board",
  "the Programme", "the Framework", "the Platform",
  // Ignore self-references to the page concept.
  "Reform Programme",
].map((s) => s.toLowerCase()));

function listArticles() {
  return readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const path = join(ARTICLES_DIR, f);
      return { name: f, path, mtime: statSync(path).mtimeMs };
    });
}

function extractCandidates(text) {
  const candidates = new Map(); // normalisedKey -> { kind, raw, count }

  function add(kind, raw) {
    const cleaned = raw.replace(/\s+/g, " ").trim();
    // Drop trailing common stop words.
    const trimmed = cleaned.replace(/^(?:The|An?|This|That|Each|Every|Such)\s+/i, "");
    if (trimmed.length < 6) return;
    const key = trimmed.toLowerCase();
    if (STOPLIST.has(key)) return;
    // Discard candidates that are only the trailing noun (e.g. "Council").
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount < 2) return;
    const existing = candidates.get(key);
    if (existing) existing.count++;
    else candidates.set(key, { kind, raw: trimmed, count: 1 });
  }

  for (const m of text.matchAll(STATUTE_RE)) add("statute", m[1]);
  for (const m of text.matchAll(INSTITUTION_RE)) add("institution", m[1]);
  for (const m of text.matchAll(FRAMEWORK_RE)) add("framework", m[1]);
  for (const m of text.matchAll(HEADING_PROPOSAL_RE)) add("heading", m[1]);

  return [...candidates.values()].sort((a, b) => b.count - a.count);
}

function findInReforms(reformsText, raw) {
  // Substring match (case-insensitive) — articleSlug references and free text.
  const needle = raw.toLowerCase();
  const haystack = reformsText.toLowerCase();
  if (haystack.includes(needle)) return true;
  // Try without trailing noun (institution may appear with synonym).
  const stripped = needle.replace(
    /\s+(office|authority|council|commission|agency|regulator|framework|architecture|platform|mechanism|protocol|act|bill)$/,
    "",
  );
  if (stripped !== needle && stripped.length > 8 && haystack.includes(stripped)) {
    return true;
  }
  return false;
}

function deriveSlug(filename) {
  return filename.replace(/\.md$/, "");
}

function fmt(ms) {
  return new Date(ms).toISOString().slice(0, 16).replace("T", " ");
}

function main() {
  if (!existsSync(REFORMS_TS)) {
    console.error(`reforms.ts not found at ${REFORMS_TS}`);
    process.exit(2);
  }
  const reformsTs = readFileSync(REFORMS_TS, "utf8");
  const reformsMtime = SINCE_OVERRIDE ?? statSync(REFORMS_TS).mtimeMs;

  const articles = listArticles();
  const stale = articles.filter((a) => a.mtime > reformsMtime);

  const findings = [];
  for (const article of stale) {
    const slug = deriveSlug(article.name);
    const text = readFileSync(article.path, "utf8");
    // Strip frontmatter so we don't pick up tags/keywords as proposals.
    const body = text.replace(/^---[\s\S]*?---/, "");
    const candidates = extractCandidates(body);

    // Article slug already wired into reforms.ts? (just for context)
    const slugReferenced = reformsTs.includes(slug);

    const missing = candidates.filter(
      (c) =>
        !findInReforms(reformsTs, c.raw) &&
        // Drop noisy heading captures that are basically descriptive sentences.
        c.raw.split(/\s+/).length <= 8,
    );

    findings.push({
      slug,
      file: article.name,
      mtime: article.mtime,
      slugReferenced,
      candidateCount: candidates.length,
      missing,
    });
  }

  const totalMissing = findings.reduce((sum, f) => sum + f.missing.length, 0);

  if (JSON_OUT) {
    const out = {
      reformsTsModified: fmt(reformsMtime),
      staleArticleCount: stale.length,
      totalMissingCandidates: totalMissing,
      findings,
    };
    console.log(JSON.stringify(out, null, 2));
  } else {
    renderHumanReport({ reformsMtime, stale, findings, totalMissing });
  }

  if (STRICT && totalMissing > 0) process.exit(1);
}

function renderHumanReport({ reformsMtime, stale, findings, totalMissing }) {
  const lines = [];
  const push = (s = "") => lines.push(s);

  push(`# Reform Roadmap Sync Report`);
  push();
  push(`_Generated ${new Date().toISOString().slice(0, 16).replace("T", " ")}_`);
  push();
  push(`- \`src/data/reforms.ts\` last modified: **${fmt(reformsMtime)}**`);
  push(`- Articles modified since: **${stale.length}**`);
  push(`- Candidate proposals not found in reforms.ts: **${totalMissing}**`);
  push();

  if (stale.length === 0) {
    push(`✓ No articles have been modified since reforms.ts. The Reform Roadmap data is up to date with article mtimes.`);
  } else {
    push(`## Stale articles (modified after reforms.ts)`);
    push();
    push(`| Article | Modified | Wired? | Candidates | Unmatched |`);
    push(`|---|---|---|---|---|`);
    for (const f of findings) {
      push(
        `| \`${f.file}\` | ${fmt(f.mtime)} | ${f.slugReferenced ? "✓" : "✗"} | ${f.candidateCount} | ${f.missing.length} |`,
      );
    }
    push();

    const withMissing = findings.filter((f) => f.missing.length > 0);
    if (withMissing.length > 0) {
      push(`## Potential gaps`);
      push();
      push(
        `Candidate proposals (named statutes, institutions, frameworks, or numbered components) found in articles but not present anywhere in \`reforms.ts\`. **Review each — many will be passing references rather than new proposals.**`,
      );
      push();
      for (const f of withMissing) {
        push(`### \`${f.file}\``);
        push();
        const grouped = { statute: [], institution: [], framework: [], heading: [] };
        for (const c of f.missing) grouped[c.kind].push(c);
        for (const kind of ["statute", "institution", "framework", "heading"]) {
          if (grouped[kind].length === 0) continue;
          push(`**${kind}**`);
          for (const c of grouped[kind].slice(0, 20)) {
            push(`- ${c.raw}${c.count > 1 ? ` _(×${c.count})_` : ""}`);
          }
          if (grouped[kind].length > 20) {
            push(`- _… and ${grouped[kind].length - 20} more_`);
          }
          push();
        }
      }
    } else {
      push(`✓ No unmatched candidates — every named proposal in the changed articles is referenced somewhere in reforms.ts.`);
    }
  }

  push();
  push(`---`);
  push();
  push(
    `_Heuristic scan — false positives expected. Manual review required to decide what belongs in \`reforms.ts\`. False negatives are also possible (a renamed proposal will not be flagged)._`,
  );

  const report = lines.join("\n") + "\n";
  if (!existsSync(REVIEWS_DIR)) mkdirSync(REVIEWS_DIR, { recursive: true });
  writeFileSync(REPORT_PATH, report);
  console.log(report);
  console.error(`\nReport written to ${REPORT_PATH}`);
}

main();
