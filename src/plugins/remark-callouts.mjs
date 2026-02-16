import { visit } from "unist-util-visit";

const CALLOUT_TYPES = ["expert", "takeaway", "framework"];

const STYLES = {
  expert:
    "border-l-4 border-[#1B6B4A] bg-[#E8F5EE] p-4 rounded-r-lg my-6",
  takeaway:
    "border-l-4 border-[#C8A951] bg-[#F8F8F8] p-4 rounded-r-lg my-6",
  framework:
    "border-2 border-dashed border-[#1B6B4A] p-4 rounded-lg my-6",
};

const LABELS = {
  expert: "Expert note",
  takeaway: "Key takeaway",
  framework: "Framework",
};

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" &&
        CALLOUT_TYPES.includes(node.name)
      ) {
        const type = node.name;
        const data = node.data || (node.data = {});

        data.hName = "aside";
        data.hProperties = {
          class: STYLES[type],
          role: "note",
          "aria-label": LABELS[type],
          "data-callout": type,
        };

        // Add label as first child
        node.children.unshift({
          type: "paragraph",
          data: {
            hName: "p",
            hProperties: {
              class:
                "font-heading text-xs font-semibold text-[#4A4A4A] uppercase tracking-wide mb-2",
              style:
                "font-family: Inter, system-ui, sans-serif; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; color: #4A4A4A;",
            },
          },
          children: [{ type: "text", value: LABELS[type] }],
        });
      }
    });
  };
}
