#!/usr/bin/env node

/**
 * Generates PWA icons (192×192 and 512×512) from the same compass-green
 * "G + needle" motif used by the favicon and apple-touch-icon.
 *
 * The SVG is drawn in a 180-unit coordinate space and scaled to the
 * output size, preserving the safe-area padding so the icon looks fine
 * when rendered as either "any" or "maskable".
 */

import sharp from "sharp";
import { resolve } from "node:path";

const SIZES = [192, 512];

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" fill="#355E3B"/>

  <!-- Letter G as a thick arc -->
  <path d="M 130,95 L 130,90 A 52,52 0 1,0 115,42"
        fill="none" stroke="white" stroke-width="14" stroke-linecap="round"/>
  <line x1="90" y1="95" x2="130" y2="95"
        stroke="white" stroke-width="14" stroke-linecap="round"/>

  <!-- Compass needle -->
  <polygon points="90,42 85,90 90,82 95,90" fill="white" opacity="0.95"/>
  <polygon points="90,138 95,90 90,98 85,90" fill="#C8A951" opacity="0.9"/>

  <!-- Pivot -->
  <circle cx="90" cy="90" r="5" fill="white"/>
  <circle cx="90" cy="90" r="2.5" fill="#355E3B"/>

  <!-- Cardinal ticks -->
  <line x1="90" y1="30" x2="90" y2="36" stroke="white" stroke-width="2" opacity="0.5"/>
  <line x1="90" y1="144" x2="90" y2="150" stroke="white" stroke-width="2" opacity="0.5"/>
  <line x1="30" y1="90" x2="36" y2="90" stroke="white" stroke-width="2" opacity="0.5"/>
  <line x1="144" y1="90" x2="150" y2="90" stroke="white" stroke-width="2" opacity="0.5"/>
</svg>
`;

for (const size of SIZES) {
  const outPath = resolve(`public/icon-${size}.png`);
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log(`Generated ${outPath} (${size}×${size})`);
}
