#!/usr/bin/env python3
"""Generate OG/hero images for GovCompass articles using Pillow.

Each image is 1200x630px with compass-green background,
article title, subtitle, and GovCompass branding.

Also updates each article's frontmatter with the ogImage path
so images display as hero banners and in social sharing previews.

Usage:
    python scripts/generate-og-images.py

Requires:
    pip install Pillow PyYAML
"""

import os
import re
import textwrap
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow not installed. Run: pip install Pillow")
    exit(1)

try:
    import yaml
except ImportError:
    print("PyYAML not installed. Run: pip install PyYAML")
    exit(1)

# Constants
WIDTH = 1200
HEIGHT = 630
BG_COLOR = (27, 107, 74)  # #1B6B4A compass-green
TEXT_COLOR = (255, 255, 255)
GOLD_COLOR = (200, 169, 81)  # #C8A951 compass-gold

ARTICLES_DIR = Path(__file__).parent.parent / "src" / "content" / "articles"
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "og"


def extract_frontmatter(filepath: Path) -> dict:
    """Extract YAML frontmatter from markdown file."""
    content = filepath.read_text(encoding="utf-8")
    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return {}
    return yaml.safe_load(match.group(1))


def update_frontmatter_og_image(filepath: Path, og_image_path: str):
    """Insert or update the ogImage field in article frontmatter."""
    content = filepath.read_text(encoding="utf-8")
    match = re.match(r"^(---\s*\n)(.*?)(\n---)", content, re.DOTALL)
    if not match:
        return

    pre, fm_text, post = match.group(1), match.group(2), match.group(3)
    body = content[match.end():]

    # Replace existing ogImage or insert it under seo:
    if re.search(r"^\s+ogImage:", fm_text, re.MULTILINE):
        fm_text = re.sub(
            r"(^\s+ogImage:).*$",
            f'  ogImage: "{og_image_path}"',
            fm_text,
            count=1,
            flags=re.MULTILINE,
        )
    elif re.search(r"^seo:", fm_text, re.MULTILINE):
        fm_text = re.sub(
            r"(^seo:\s*\n)",
            f'seo:\n  ogImage: "{og_image_path}"\n',
            fm_text,
            count=1,
            flags=re.MULTILINE,
        )
    else:
        fm_text += f'\nseo:\n  ogImage: "{og_image_path}"'

    filepath.write_text(pre + fm_text + post + body, encoding="utf-8")
    print(f"  Updated frontmatter: {filepath.name}")


def generate_og_image(title: str, subtitle: str, article_number: str, output_path: Path):
    """Generate a single OG image."""
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Use default font (Pillow built-in) since we can't guarantee custom fonts
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        font_subtitle = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
        font_brand = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
        font_number = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
    except (OSError, IOError):
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_brand = ImageFont.load_default()
        font_number = ImageFont.load_default()

    # Article number badge
    draw.text((80, 80), f"Article {article_number}", fill=GOLD_COLOR, font=font_number)

    # Title (word-wrapped)
    wrapped_title = textwrap.fill(title, width=30)
    draw.multiline_text((80, 130), wrapped_title, fill=TEXT_COLOR, font=font_title, spacing=8)

    # Subtitle
    wrapped_subtitle = textwrap.fill(subtitle, width=50)
    y_subtitle = 130 + (wrapped_title.count("\n") + 1) * 56 + 20
    draw.multiline_text(
        (80, min(y_subtitle, 380)),
        wrapped_subtitle,
        fill=(255, 255, 255, 200),
        font=font_subtitle,
        spacing=4,
    )

    # Bottom bar
    draw.rectangle([(0, HEIGHT - 60), (WIDTH, HEIGHT)], fill=(20, 80, 55))

    # Brand
    draw.text((80, HEIGHT - 48), "COMPASS", fill=GOLD_COLOR, font=font_brand)
    draw.text(
        (260, HEIGHT - 44),
        "Making SA's governance system legible",
        fill=(200, 200, 200),
        font=font_number,
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"Generated: {output_path}")


def main():
    """Generate OG images for all articles."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for md_file in sorted(ARTICLES_DIR.glob("*.md")):
        frontmatter = extract_frontmatter(md_file)
        if not frontmatter:
            continue

        slug = md_file.stem
        title = frontmatter.get("title", "Untitled")
        subtitle = frontmatter.get("subtitle", "")
        article_number = frontmatter.get("articleNumber", "")

        output_path = OUTPUT_DIR / f"{slug}.png"
        og_image_url = f"/og/{slug}.png"
        generate_og_image(title, subtitle, article_number, output_path)
        update_frontmatter_og_image(md_file, og_image_url)

    # Generate default OG image
    generate_og_image(
        "GovCompass",
        "Making South Africa's governance system legible to ordinary citizens",
        "",
        OUTPUT_DIR / "default.png",
    )


if __name__ == "__main__":
    main()
