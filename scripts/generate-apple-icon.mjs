#!/usr/bin/env node

/**
 * Generates the 180×180 apple-touch-icon PNG from an inline SVG.
 * Design: Letter "G" integrated with a compass needle on compass-green background.
 */

import sharp from "sharp";
import { resolve } from "node:path";

const SIZE = 180;

// The "G" forms the outer ring; a compass needle sits in the center.
// Colors: compass-green bg (#355E3B), white G, green/gold needle matching favicon.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    <clipPath id="rounded">
      <rect width="${SIZE}" height="${SIZE}" rx="36" ry="36"/>
    </clipPath>
  </defs>

  <g clip-path="url(#rounded)">
    <!-- Background -->
    <rect width="${SIZE}" height="${SIZE}" fill="#355E3B"/>

    <!-- Letter G as a thick arc with a horizontal bar -->
    <!-- Outer arc: nearly full circle, gap at ~1 o'clock to ~4 o'clock (30° to 120° opening) -->
    <path d="
      M 130,95
      L 130,90
      A 52,52 0 1,0 115,42
    " fill="none" stroke="white" stroke-width="14" stroke-linecap="round"/>

    <!-- G crossbar: horizontal line from center to right -->
    <line x1="90" y1="95" x2="130" y2="95" stroke="white" stroke-width="14" stroke-linecap="round"/>

    <!-- Compass needle — north (white, pointing up) -->
    <polygon points="90,42 85,90 90,82 95,90" fill="white" opacity="0.95"/>

    <!-- Compass needle — south (gold, pointing down) -->
    <polygon points="90,138 95,90 90,98 85,90" fill="#C8A951" opacity="0.9"/>

    <!-- Center pivot dot -->
    <circle cx="90" cy="90" r="5" fill="white"/>
    <circle cx="90" cy="90" r="2.5" fill="#355E3B"/>

    <!-- Small cardinal tick marks -->
    <line x1="90" y1="30" x2="90" y2="36" stroke="white" stroke-width="2" opacity="0.5"/>
    <line x1="90" y1="144" x2="90" y2="150" stroke="white" stroke-width="2" opacity="0.5"/>
    <line x1="30" y1="90" x2="36" y2="90" stroke="white" stroke-width="2" opacity="0.5"/>
    <line x1="144" y1="90" x2="150" y2="90" stroke="white" stroke-width="2" opacity="0.5"/>
  </g>
</svg>
`;

const outPath = resolve("public/apple-touch-icon.png");

await sharp(Buffer.from(svg))
  .resize(SIZE, SIZE)
  .png()
  .toFile(outPath);

console.log(`Generated ${outPath} (${SIZE}×${SIZE})`);
