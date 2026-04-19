#!/usr/bin/env node
// Regenerate the three Advocacy Playbook PDFs from their .docx sources so that
// every top-level section heading starts on a new page. Requires: pandoc in
// PATH, and the playwright npm package (already a dev-dep for E2E tests).

import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const playbooks = [
  {
    source: "docs/CSO_JCPS_Reform_Playbook.docx",
    output: "public/downloads/JCPS_Reform_Advocacy_Playbook.pdf",
    title: "Voices for Justice — JCPS Reform Playbook",
    accent: "#1B6B4A",
  },
  {
    source: "docs/CSO_Education_Reform_Advocacy_Playbook.docx",
    output: "public/downloads/Education_Reform_Advocacy_Playbook.pdf",
    title: "Education Reform Advocacy Playbook",
    accent: "#2563EB",
  },
  {
    source: "docs/JHB_Advocacy_Playbook.docx",
    output: "public/downloads/Johannesburg_Metro_Reform_Playbook.pdf",
    title: "Johannesburg Metro Reform Playbook",
    accent: "#D97706",
  },
];

// Patterns that identify top-level section headings. These get page breaks.
const SECTION_PATTERNS = [
  /^Foreword\b/i,
  /^Preface\b/i,
  /^Introduction\b/i,
  /^Acknowledgements?\b/i,
  /^\d+\.\s+[A-Z]/,            // "1. Organisation"
  /^\d+\s+[A-Z]{3,}/,           // "1 COALITION ORGANISATION"
  /^Appendix\s+[A-Z0-9]/i,
  /^Closing\s+[Ww]ord/i,
  /^Conclusion\b/i,
  /^Glossary\b/i,
];

// Subsection patterns — become <h2> with no page break.
const SUBSECTION_PATTERNS = [
  /^\d+\.\d+(\.\d+)?\s+[A-Za-z]/, // "1.1 Architecture" or "1.1.1 ..."
];

function isSection(text) {
  return SECTION_PATTERNS.some((re) => re.test(text.trim()));
}
function isSubsection(text) {
  return SUBSECTION_PATTERNS.some((re) => re.test(text.trim()));
}

// Convert the pandoc HTML: promote recognised <p><strong>...</strong></p>
// paragraphs into <h1>/<h2>. Everything else passes through unchanged.
function promoteHeadings(html) {
  return html.replace(
    /<p><strong>([^<]+?)<\/strong><\/p>/g,
    (match, inner) => {
      const text = inner.trim();
      if (isSection(text)) {
        return `<h1 class="section">${inner}</h1>`;
      }
      if (isSubsection(text)) {
        return `<h2 class="subsection">${inner}</h2>`;
      }
      return match;
    },
  );
}

function wrapDocument({ body, title, accent }) {
  return `<!doctype html>
<html lang="en-ZA">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>
  @page { size: A4; margin: 20mm 18mm; }

  * { box-sizing: border-box; }
  html, body {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11pt;
    line-height: 1.55;
    color: #1f2937;
  }
  body { margin: 0; }

  h1.section {
    page-break-before: always;
    break-before: page;
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: 22pt;
    font-weight: 700;
    color: ${accent};
    margin: 0 0 18pt 0;
    padding-bottom: 8pt;
    border-bottom: 2pt solid ${accent};
  }
  h1.section:first-of-type {
    page-break-before: always;
    break-before: page;
  }

  h2.subsection {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: 14pt;
    font-weight: 600;
    color: #111827;
    margin: 18pt 0 8pt;
  }

  p { margin: 0 0 8pt; orphans: 3; widows: 3; }
  p strong { color: #111827; }
  em { color: #374151; }

  ul, ol { margin: 0 0 10pt 20pt; padding: 0; }
  li { margin-bottom: 3pt; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0 14pt;
    font-size: 9.5pt;
    page-break-inside: auto;
  }
  tr { page-break-inside: avoid; }
  thead { display: table-header-group; }
  th, td {
    border: 0.5pt solid #d1d5db;
    padding: 5pt 7pt;
    vertical-align: top;
    text-align: left;
  }
  thead th, tr:first-child td {
    background: ${accent}15;
    font-weight: 600;
    color: #111827;
  }

  blockquote {
    border-left: 3pt solid ${accent};
    margin: 10pt 0;
    padding: 2pt 0 2pt 12pt;
    color: #374151;
    font-style: italic;
  }

  /* Cover: everything before the first h1 */
  .cover {
    text-align: center;
    padding: 30mm 10mm 0;
    page-break-after: always;
  }
  .cover p { margin: 6pt 0; }
  .cover p:first-child strong {
    display: block;
    font-size: 28pt;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: ${accent};
    letter-spacing: 0.5pt;
  }
</style>
</head>
<body>
${body}
</body>
</html>`;
}

// Wrap the pre-first-section paragraphs in a <div class="cover"> so they render
// on a proper cover page. This relies on the first <h1 class="section"> marker.
function wrapCover(html) {
  const idx = html.indexOf('<h1 class="section"');
  if (idx === -1) return html;
  return `<div class="cover">${html.slice(0, idx)}</div>\n${html.slice(idx)}`;
}

async function renderPdf(htmlPath, outPath) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: outPath,
    format: "A4",
    margin: { top: "20mm", right: "18mm", bottom: "20mm", left: "18mm" },
    printBackground: true,
  });
  await browser.close();
}

async function main() {
  const tmp = join(tmpdir(), `playbook-pdfs-${Date.now()}`);
  mkdirSync(tmp, { recursive: true });

  for (const p of playbooks) {
    const src = resolve(repoRoot, p.source);
    const out = resolve(repoRoot, p.output);

    console.log(`\n→ ${p.source}`);

    const rawHtml = execSync(
      `pandoc ${JSON.stringify(src)} -t html --wrap=none`,
      { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
    );

    const promoted = promoteHeadings(rawHtml);
    const withCover = wrapCover(promoted);
    const full = wrapDocument({
      body: withCover,
      title: p.title,
      accent: p.accent,
    });

    const htmlPath = join(tmp, `${p.title.replace(/\W+/g, "_")}.html`);
    writeFileSync(htmlPath, full, "utf8");

    const sectionCount = (promoted.match(/<h1 class="section"/g) || []).length;
    const subCount = (promoted.match(/<h2 class="subsection"/g) || []).length;
    console.log(`   ${sectionCount} sections, ${subCount} subsections`);

    await renderPdf(htmlPath, out);
    console.log(`   → ${p.output}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
