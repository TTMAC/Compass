/**
 * rehype-article-images.mjs
 *
 * Transforms <img> elements in article content into <figure> elements
 * with <figcaption> containing caption text and Unsplash attribution.
 *
 * Alt text convention: "Caption text | Photo by Name on Unsplash"
 * The pipe delimiter separates the visible caption from the attribution line.
 *
 * Adds loading="lazy" and decoding="async" to all article images.
 */

import { visit } from "unist-util-visit";

export default function rehypeArticleImages() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "img" || !parent || index == null) return;

      // Only transform images in /images/articles/ (our sourced images)
      const src = node.properties?.src || "";
      if (!src.includes("/images/articles/")) return;

      const alt = node.properties?.alt || "";

      // Add performance attributes
      node.properties.loading = "lazy";
      node.properties.decoding = "async";
      node.properties.width = 680;
      node.properties.height = 450;

      // Parse alt text: "Caption | Photo by Name on Unsplash"
      const parts = alt.split(" | ");
      const caption = parts[0]?.trim() || "";
      const attribution = parts.slice(1).join(" | ").trim();

      // Set clean alt text (just the caption, for screen readers)
      node.properties.alt = caption;

      // Add class for styling
      node.properties.className = ["article-image"];

      // Build figcaption children
      const figcaptionChildren = [];

      if (caption) {
        figcaptionChildren.push({
          type: "element",
          tagName: "span",
          properties: { className: ["article-caption-text"] },
          children: [{ type: "text", value: caption }],
        });
      }

      if (attribution) {
        if (caption) {
          figcaptionChildren.push({ type: "text", value: " " });
        }

        // Parse "Photo by Name on Unsplash" into a link
        const nameMatch = attribution.match(/Photo by (.+) on Unsplash/);
        if (nameMatch) {
          figcaptionChildren.push({
            type: "element",
            tagName: "span",
            properties: { className: ["article-attribution"] },
            children: [
              { type: "text", value: "Photo by " },
              {
                type: "element",
                tagName: "a",
                properties: {
                  href: `https://unsplash.com/@${encodeURIComponent(nameMatch[1].toLowerCase().replace(/\s+/g, ""))}?utm_source=govcompass&utm_medium=referral`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                children: [{ type: "text", value: nameMatch[1] }],
              },
              { type: "text", value: " on " },
              {
                type: "element",
                tagName: "a",
                properties: {
                  href: "https://unsplash.com/?utm_source=govcompass&utm_medium=referral",
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                children: [{ type: "text", value: "Unsplash" }],
              },
            ],
          });
        } else {
          figcaptionChildren.push({
            type: "element",
            tagName: "span",
            properties: { className: ["article-attribution"] },
            children: [{ type: "text", value: attribution }],
          });
        }
      }

      // Build the <figure> element
      const figure = {
        type: "element",
        tagName: "figure",
        properties: { className: ["article-figure"] },
        children: [
          node,
          ...(figcaptionChildren.length > 0
            ? [
                {
                  type: "element",
                  tagName: "figcaption",
                  properties: { className: ["article-figcaption"] },
                  children: figcaptionChildren,
                },
              ]
            : []),
        ],
      };

      // Replace the <img> with the <figure> in the parent
      parent.children[index] = figure;
    });
  };
}
