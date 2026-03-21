/**
 * generate-ss-articles.mjs
 *
 * Helper script for generating Safety & Security pillar articles via Claude Code.
 * Handles prompt extraction from docs/ss_article_series.md and writing generated
 * content back to article files — the actual article generation is done by
 * Claude Code in conversation.
 *
 * Usage:
 *   node scripts/generate-ss-articles.mjs <command> [options]
 *
 * Commands:
 *   list                          List all SS articles and their current status
 *   prompt <slug>                 Extract and print the full generation prompt for an article
 *   write <slug> [--status=S]    Read article body from stdin, write to file (default status: draft)
 *
 * Examples:
 *   # List all articles
 *   node scripts/generate-ss-articles.mjs list
 *
 *   # Extract prompt for an article (pipe to clipboard, file, etc.)
 *   node scripts/generate-ss-articles.mjs prompt ss-1-1-order-through-oppression
 *
 *   # Write generated content to an article file
 *   cat generated-body.md | node scripts/generate-ss-articles.mjs write ss-1-1-order-through-oppression
 *
 *   # Write with a specific status
 *   cat generated-body.md | node scripts/generate-ss-articles.mjs write ss-1-1-order-through-oppression --status=published
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const ARTICLES_DIR = join(PROJECT_ROOT, "src/content/articles");
const PROMPTS_FILE = join(PROJECT_ROOT, "docs/ss_article_series.md");
const KNOWLEDGE_BASE_FILE = join(PROJECT_ROOT, "docs/sa-law-and-order-project.md");

// ---------------------------------------------------------------------------
// Article registry (ordered by series)
// ---------------------------------------------------------------------------

const SS_ARTICLES = [
  { slug: "ss-1-1-order-through-oppression", part: 1, articleNumber: "1.1" },
  { slug: "ss-1-2-from-rainbow-nation-to-state-capture", part: 1, articleNumber: "1.2" },
  { slug: "ss-2-1-the-broken-pipeline", part: 2, articleNumber: "2.1" },
  { slug: "ss-2-2-policing-a-divided-country", part: 2, articleNumber: "2.2" },
  { slug: "ss-2-3-justice-delayed-rights-denied", part: 2, articleNumber: "2.3" },
  { slug: "ss-2-4-the-systems-most-catastrophic-failure", part: 2, articleNumber: "2.4" },
  { slug: "ss-2-5-the-private-security-paradox", part: 2, articleNumber: "2.5" },
  { slug: "ss-3-1-three-tier-policing-architecture", part: 3, articleNumber: "3.1" },
  { slug: "ss-3-2-independent-investigating-magistracy", part: 3, articleNumber: "3.2" },
  { slug: "ss-3-3-community-courts-and-restorative-justice", part: 3, articleNumber: "3.3" },
  { slug: "ss-3-4-sentencing-commission-and-structured-guidelines", part: 3, articleNumber: "3.4" },
  { slug: "ss-3-5-rehabilitation-as-constitutional-mandate", part: 3, articleNumber: "3.5" },
  { slug: "ss-4-1-sequencing-reform", part: 4, articleNumber: "4.1" },
  { slug: "ss-4-2-funding-the-delta", part: 4, articleNumber: "4.2" },
  { slug: "ss-4-3-measuring-progress", part: 4, articleNumber: "4.3" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readArticleStatus(slug) {
  const filePath = join(ARTICLES_DIR, `${slug}.md`);
  if (!existsSync(filePath)) return "missing";
  const content = readFileSync(filePath, "utf-8");
  const statusMatch = content.match(/^status:\s*"?([^"\n]+)"?/m);
  return statusMatch ? statusMatch[1] : "unknown";
}

function readArticleTitle(slug) {
  const filePath = join(ARTICLES_DIR, `${slug}.md`);
  if (!existsSync(filePath)) return "(file not found)";
  const content = readFileSync(filePath, "utf-8");
  const titleMatch = content.match(/^title:\s*"?([^"\n]+)"?/m);
  return titleMatch ? titleMatch[1].replace(/"/g, "") : "(no title)";
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Extract the generation prompt for a specific article from the prompts doc.
 */
function extractPrompt(promptsDoc, articleNumber) {
  const pattern = new RegExp(
    `### Article ${articleNumber.replace(".", "\\.")}:([\\s\\S]*?)(?=\\n---\\n|\\n## |$)`,
  );
  const match = promptsDoc.match(pattern);
  if (!match) return null;

  const section = match[0];
  const promptLines = [];
  let inPrompt = false;

  for (const line of section.split("\n")) {
    if (line.startsWith("> ")) {
      inPrompt = true;
      promptLines.push(line.slice(2));
    } else if (line === ">") {
      promptLines.push("");
    } else if (inPrompt && !line.startsWith(">")) {
      if (line.trim() === "" && promptLines.length > 0) {
        // gap between prompt blocks
      } else {
        inPrompt = false;
      }
    }
  }

  return promptLines.join("\n").trim() || null;
}

/**
 * Update frontmatter status field.
 */
function updateFrontmatterStatus(content, newStatus) {
  return content.replace(
    /^(status:\s*)"?[^"\n]+"?/m,
    `$1"${newStatus}"`,
  );
}

/**
 * Replace article body (everything after frontmatter closing ---).
 */
function replaceArticleBody(content, newBody) {
  const match = content.match(/^(---\n[\s\S]*?\n---)\n?/);
  if (!match) {
    throw new Error("Could not find frontmatter in article file");
  }
  return `${match[1]}\n\n${newBody}\n`;
}

/**
 * Read all of stdin as a string.
 */
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

/**
 * Find an article entry by slug.
 */
function findArticle(slug) {
  return SS_ARTICLES.find((a) => a.slug === slug);
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function cmdList() {
  console.log("Safety & Security Articles — Status Overview\n");
  console.log("Part  Article  Status        Words   Slug");
  console.log("─".repeat(85));

  for (const article of SS_ARTICLES) {
    const status = readArticleStatus(article.slug);
    const statusPadded = status.padEnd(13);

    // Count body words
    const filePath = join(ARTICLES_DIR, `${article.slug}.md`);
    let bodyWords = 0;
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, "utf-8");
      const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)$/);
      if (bodyMatch) bodyWords = wordCount(bodyMatch[1]);
    }

    const wordsPadded = bodyWords > 0 ? String(bodyWords).padStart(5) : "    -";

    console.log(
      `  ${article.part}    ${article.articleNumber.padEnd(5)}   ${statusPadded} ${wordsPadded}   ${article.slug}`,
    );
  }

  console.log("\nTotal:", SS_ARTICLES.length, "articles");
  const statuses = SS_ARTICLES.map((a) => readArticleStatus(a.slug));
  const counts = {};
  for (const s of statuses) counts[s] = (counts[s] || 0) + 1;
  for (const [status, count] of Object.entries(counts)) {
    console.log(`  ${status}: ${count}`);
  }
}

function cmdPrompt(slug) {
  const article = findArticle(slug);
  if (!article) {
    console.error(`Error: Unknown slug "${slug}".`);
    console.error("Available slugs:");
    for (const a of SS_ARTICLES) console.error(`  ${a.slug}`);
    process.exit(1);
  }

  if (!existsSync(PROMPTS_FILE)) {
    console.error(`Error: Prompts file not found: ${PROMPTS_FILE}`);
    process.exit(1);
  }

  const promptsDoc = readFileSync(PROMPTS_FILE, "utf-8");
  const prompt = extractPrompt(promptsDoc, article.articleNumber);

  if (!prompt) {
    console.error(`Error: No prompt found for article ${article.articleNumber}`);
    process.exit(1);
  }

  const title = readArticleTitle(slug);

  // Output the full context: article meta + prompt + editorial rules
  const output = `# Article Generation: ${article.articleNumber} — ${title}

## Slug: ${slug}

## Editorial Rules

- Write at least 5,000 words of flowing, accessible prose
- British English spelling throughout
- Use "you" to address the reader directly
- NO bullet points in article prose — write in flowing paragraphs
- O'Reilly conversational register: authoritative but never academic or corporate
- Rigorously non-partisan — this is analysis, not political commentary
- Avoid hype words like "revolutionary" or "game-changing"
- Do NOT include the article title as an H1 — start with your first H2 heading
- Use ## for main sections and ### for subsections
- Cross-reference other articles using markdown links: [Title](/articles/slug)
- Include 2-3 expert blocks using the :::expert callout directive
- Include 2-3 takeaway blocks using the :::takeaway callout directive
- Conclude with a practical toolkit/guide section as specified in the prompt
- Do NOT fabricate expert names, publications, or institutional affiliations
- Use institutional sources (ISS, CSVR, APCOF, etc.) when specific experts cannot be verified
- Output ONLY the article body content in markdown — no frontmatter, no metadata

## Callout Format

:::expert
Expert analysis text here, attributed to a verified institution or researcher.
:::

:::takeaway
Key takeaway text here.
:::

## Generation Prompt

${prompt}

## Knowledge Base

Reference file: docs/sa-law-and-order-project.md
(Read this file for the analytical framework, structural proposals, and systems theory framing.)
`;

  console.log(output);
}

async function cmdWrite(slug) {
  const article = findArticle(slug);
  if (!article) {
    console.error(`Error: Unknown slug "${slug}".`);
    process.exit(1);
  }

  const filePath = join(ARTICLES_DIR, `${slug}.md`);
  if (!existsSync(filePath)) {
    console.error(`Error: Article file not found: ${filePath}`);
    process.exit(1);
  }

  // Parse --status flag
  const statusFlag = process.argv.find((a) => a.startsWith("--status="));
  const targetStatus = statusFlag ? statusFlag.split("=")[1] : "draft";

  // Read body content from stdin
  const newBody = await readStdin();

  if (!newBody.trim()) {
    console.error("Error: No content received on stdin.");
    process.exit(1);
  }

  const words = wordCount(newBody);
  console.log(`Received: ${words} words`);

  if (words < 2000) {
    console.warn(
      `Warning: Content is only ${words} words (target: 5,000+). Proceeding anyway.`,
    );
  }

  // Read current file, replace body, update status
  const content = readFileSync(filePath, "utf-8");
  let updated = replaceArticleBody(content, newBody.trim());
  updated = updateFrontmatterStatus(updated, targetStatus);

  writeFileSync(filePath, updated, "utf-8");

  console.log(`Written to: ${filePath}`);
  console.log(`Status updated to: ${targetStatus}`);
  console.log(`Word count: ${words}`);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const command = process.argv[2];

switch (command) {
  case "list":
    await cmdList();
    break;

  case "prompt": {
    const slug = process.argv[3];
    if (!slug) {
      console.error("Usage: generate-ss-articles.mjs prompt <slug>");
      process.exit(1);
    }
    cmdPrompt(slug);
    break;
  }

  case "write": {
    const slug = process.argv[3];
    if (!slug) {
      console.error("Usage: generate-ss-articles.mjs write <slug>");
      process.exit(1);
    }
    await cmdWrite(slug);
    break;
  }

  default:
    console.log(`Usage: generate-ss-articles.mjs <command> [options]

Commands:
  list                        List all SS articles and their current status
  prompt <slug>               Extract and print the full generation prompt
  write <slug> [--status=S]   Read article body from stdin, write to file

npm scripts:
  npm run ss:list             List articles
  npm run ss:prompt -- SLUG   Extract prompt
`);
    if (command) {
      console.error(`Unknown command: "${command}"`);
      process.exit(1);
    }
}
