import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ARTICLES_DIR = join(process.cwd(), "src", "content", "articles");

async function main() {
  const now = new Date();
  console.log(`[scheduled-publish] Checking for scheduled articles at ${now.toISOString()}`);

  let files;
  try {
    files = (await readdir(ARTICLES_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    console.log("[scheduled-publish] No articles directory found, skipping.");
    return;
  }

  let promoted = 0;

  for (const file of files) {
    const filePath = join(ARTICLES_DIR, file);
    const content = await readFile(filePath, "utf-8");

    // Extract frontmatter
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) continue;

    const frontmatter = match[1];

    // Check if status is scheduled
    const statusMatch = frontmatter.match(/^status:\s*["']?scheduled["']?\s*$/m);
    if (!statusMatch) continue;

    // Extract scheduledPublishDate
    const dateMatch = frontmatter.match(/^scheduledPublishDate:\s*["']?(.+?)["']?\s*$/m);
    if (!dateMatch) continue;

    const scheduledDate = new Date(dateMatch[1]);
    if (isNaN(scheduledDate.getTime())) {
      console.log(`[scheduled-publish] WARNING: Invalid date in ${file}: ${dateMatch[1]}`);
      continue;
    }

    if (scheduledDate > now) {
      console.log(`[scheduled-publish] ${file}: scheduled for ${scheduledDate.toISOString()}, not yet due.`);
      continue;
    }

    // Promote: change status to published
    let updated = frontmatter.replace(
      /^status:\s*["']?scheduled["']?\s*$/m,
      'status: "published"',
    );

    // Update publishDate to the scheduled date (YYYY-MM-DD)
    const publishDateStr = scheduledDate.toISOString().split("T")[0];
    updated = updated.replace(
      /^publishDate:\s*.+$/m,
      `publishDate: ${publishDateStr}`,
    );

    // Remove scheduledPublishDate line
    updated = updated.replace(/^scheduledPublishDate:\s*.+\n?/m, "");

    const newContent = content.replace(match[1], updated);
    await writeFile(filePath, newContent, "utf-8");

    promoted++;
    console.log(`[scheduled-publish] PROMOTED: ${file} (scheduled for ${scheduledDate.toISOString()})`);
  }

  console.log(`[scheduled-publish] Done. ${promoted} article(s) promoted.`);
}

main().catch((err) => {
  console.error("[scheduled-publish] Error:", err);
  process.exit(1);
});
