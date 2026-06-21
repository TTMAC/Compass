/**
 * test-resend.mjs
 *
 * Read-only diagnostic for the Resend connection. Reads RESEND_* values from
 * .env (never prints the secret key) and reports:
 *   - whether the API key authenticates
 *   - which sending domains exist and whether they are verified
 *   - which audiences exist (so you can confirm RESEND_AUDIENCE_ID)
 *   - whether the configured RESEND_AUDIENCE_ID resolves
 *
 * Usage:
 *   node scripts/test-resend.mjs
 *
 * This script makes no changes — it does not add contacts or send email.
 */

import { config } from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env") });

const API = "https://api.resend.com";
const KEY = process.env.RESEND_API_KEY;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM = process.env.RESEND_FROM;

function line() {
  console.log("─".repeat(60));
}

async function get(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${KEY}` },
  });
  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, ok: res.ok, body };
}

async function main() {
  console.log("Resend connection diagnostic");
  line();

  if (!KEY) {
    console.error("✗ RESEND_API_KEY is not set in .env");
    console.error("  Add it to .env, then re-run this script.");
    process.exit(1);
  }
  console.log(`✓ RESEND_API_KEY found (${KEY.slice(0, 6)}…, length ${KEY.length})`);
  console.log(`  RESEND_FROM:        ${FROM || "(not set)"}`);
  console.log(`  RESEND_AUDIENCE_ID: ${AUDIENCE_ID || "(not set)"}`);
  line();

  // 1. Authenticate by listing domains
  console.log("Domains:");
  const domains = await get("/domains");
  if (domains.status === 401 || domains.status === 403) {
    console.error("  ✗ Key rejected (401/403). The API key is invalid or revoked.");
    process.exit(1);
  }
  if (!domains.ok) {
    console.error(`  ✗ Unexpected status ${domains.status}`);
    console.error(`    ${JSON.stringify(domains.body)}`);
    process.exit(1);
  }
  console.log("  ✓ API key authenticates");
  const domainList = domains.body?.data || [];
  if (domainList.length === 0) {
    console.log("  ⚠ No sending domains yet — add and verify govcompass.co.za");
  } else {
    for (const d of domainList) {
      const mark = d.status === "verified" ? "✓" : "⚠";
      console.log(`  ${mark} ${d.name} — status: ${d.status} (region: ${d.region})`);
    }
  }
  line();

  // 2. List audiences
  console.log("Audiences:");
  const audiences = await get("/audiences");
  if (audiences.ok) {
    const list = audiences.body?.data || [];
    if (list.length === 0) {
      console.log("  ⚠ No audiences yet — create one and set RESEND_AUDIENCE_ID");
    } else {
      for (const a of list) {
        const here = a.id === AUDIENCE_ID ? "  ← matches RESEND_AUDIENCE_ID" : "";
        console.log(`  • ${a.name}: ${a.id}${here}`);
      }
    }
  } else {
    console.log(`  (could not list audiences: status ${audiences.status})`);
  }
  line();

  // 3. Resolve the configured audience id
  if (AUDIENCE_ID) {
    const aud = await get(`/audiences/${AUDIENCE_ID}`);
    if (aud.ok) {
      console.log(`✓ RESEND_AUDIENCE_ID resolves: "${aud.body?.name}"`);
    } else {
      console.log(`✗ RESEND_AUDIENCE_ID does not resolve (status ${aud.status})`);
    }
  } else {
    console.log("⚠ RESEND_AUDIENCE_ID not set — pick an id from the list above");
  }

  line();
  const domainVerified = domainList.some((d) => d.status === "verified");
  console.log("Summary:");
  console.log(`  Auth:             ✓`);
  console.log(`  Domain verified:  ${domainVerified ? "✓" : "⚠ not yet"}`);
  console.log(`  Audience set:     ${AUDIENCE_ID ? "✓" : "⚠ not yet"}`);
  console.log(`  From address:     ${FROM ? "✓" : "⚠ not set"}`);
  console.log(
    domainVerified && AUDIENCE_ID && FROM
      ? "\n✓ Ready: the submission-created function has everything it needs."
      : "\n⚠ Almost there — resolve the ⚠ items above, then re-run.",
  );
}

main().catch((err) => {
  console.error("Diagnostic failed:", err.message);
  process.exit(1);
});
