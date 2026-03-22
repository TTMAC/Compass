export interface PillarPart {
  number: number;
  title: string;
  description: string;
}

export interface PillarConfig {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  lightColor: string;
  filterDimension: "sphere" | "tags";
  order: number;
  parts: PillarPart[];
}

export const pillars: PillarConfig[] = [
  {
    slug: "government-structure",
    title: "Government Structure",
    shortTitle: "Government",
    description:
      "How South Africa's government is structured across three spheres — who does what, where the money goes, and how to hold them accountable.",
    color: "#1B6B4A",
    lightColor: "#E8F5EE",
    filterDimension: "sphere",
    order: 1,
    parts: [
      {
        number: 1,
        title: "The Architecture",
        description:
          "How South Africa's government is structured across three spheres.",
      },
      {
        number: 2,
        title: "The Money",
        description:
          "How public money flows from Treasury to service delivery.",
      },
      {
        number: 3,
        title: "The Accountability",
        description: "How oversight works — and where it breaks down.",
      },
      {
        number: 4,
        title: "The Participation",
        description:
          "How citizens can meaningfully engage with government.",
      },
      {
        number: 5,
        title: "The Assessment",
        description:
          "How to evaluate government performance using public data.",
      },
    ],
  },
  {
    slug: "safety-security",
    title: "Safety & Security",
    shortTitle: "Safety",
    description:
      "How South Africa's criminal justice system works — policing, courts, corrections, and what reform looks like.",
    color: "#0369A1",
    lightColor: "#E0F2FE",
    filterDimension: "tags",
    order: 2,
    parts: [
      {
        number: 1,
        title: "The Inheritance",
        description:
          "How apartheid policing, democratic transition, and state capture created today's crisis.",
      },
      {
        number: 2,
        title: "The Broken System",
        description:
          "What the criminal justice pipeline looks like today — and who it fails most.",
      },
      {
        number: 3,
        title: "The Blueprint",
        description:
          "What a constitutional, effective safety system could look like.",
      },
      {
        number: 4,
        title: "The Bridge",
        description:
          "What it takes to get from here to there — law, money, politics, and measurement.",
      },
    ],
  },
  {
    slug: "economic-growth",
    title: "Economic Growth & Development",
    shortTitle: "Economy",
    description:
      "How economic policy is made, who benefits, and what structural change requires.",
    color: "#D97706",
    lightColor: "#FEF3C7",
    filterDimension: "tags",
    order: 3,
    parts: [
      {
        number: 1,
        title: "The Inheritance",
        description:
          "Where South Africa's economy stands and how it got here.",
      },
      {
        number: 2,
        title: "The Growth Strategy",
        description:
          "A staged path from $7,000 to $50,000 GDP per capita.",
      },
      {
        number: 3,
        title: "The Enablers",
        description:
          "Cross-cutting growth engines, execution machinery, and monitoring.",
      },
      {
        number: 4,
        title: "The Scorecard",
        description:
          "Measuring municipal performance and infrastructure delivery.",
      },
      {
        number: 5,
        title: "The Bridge",
        description:
          "Political economy, implementation roadmap, and economic citizenship.",
      },
    ],
  },
  {
    slug: "human-development",
    title: "Human Development",
    shortTitle: "Human Dev",
    description:
      "How government structure, safety, and economic growth form a reinforcing feedback loop that shapes human outcomes.",
    color: "#7C3AED",
    lightColor: "#EDE9FE",
    filterDimension: "tags",
    order: 4,
    parts: [],
  },
];

export function getPillarBySlug(slug: string): PillarConfig | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getPillarColor(slug: string): string {
  return getPillarBySlug(slug)?.color ?? "#1B6B4A";
}
