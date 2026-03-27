export type WorkstreamId =
  | "safety-security"
  | "reform-agenda"
  | "economic-growth"
  | "human-development";

export type PhaseId = "phase-1" | "phase-2" | "phase-3";

export type Scope = "national" | "provincial" | "municipal";

export interface Reform {
  id: string;
  workstream: WorkstreamId;
  phase: PhaseId;
  subgroup?: string;
  title: string;
  description: string;
  legislative?: string;
  cost?: string;
  scope?: Scope[];
}

export interface Workstream {
  id: WorkstreamId;
  title: string;
  shortTitle: string;
  vision: string;
  color: string;
  lightColor: string;
  phases: Phase[];
  totalInvestment?: string;
}

export interface Phase {
  id: PhaseId;
  label: string;
  years: string;
  priority: string;
  investment?: string;
}

export interface LegislativeItem {
  id: string;
  name: string;
  type: "new" | "amendment" | "constitutional";
  workstream: WorkstreamId;
  phase: PhaseId;
}

export interface Milestone {
  period: string;
  label: string;
  items: string[];
}

export interface CrossCuttingDigital {
  id: string;
  initiative: string;
  workstreams: string;
}

export interface StructuralPrinciple {
  title: string;
  examples: string;
}

export interface RaaricleElement {
  letter: string;
  name: string;
  question: string;
}

export interface FailurePattern {
  name: string;
  description: string;
}

// ── Workstreams ──────────────────────────────────────────────

export const workstreams: Workstream[] = [
  {
    id: "safety-security",
    title: "Safety and Security",
    shortTitle: "Safety",
    vision:
      "Transform South Africa's criminal justice system from a broken pipeline that haemorrhages cases at every stage into an integrated, accountable system that delivers safety, justice, and rehabilitation.",
    color: "#1B4965",
    lightColor: "#E0EBF2",
    phases: [
      {
        id: "phase-1",
        label: "Investigation & Prosecution Reform",
        years: "Years 1–3",
        priority: "Restore the investigative and prosecutorial foundations.",
        investment: "R8bn – R12bn",
      },
      {
        id: "phase-2",
        label: "Court Reform & Policing Restructuring",
        years: "Years 3–5",
        priority:
          "Build the institutional architecture for community justice and restructured policing.",
        investment: "R6bn – R10bn",
      },
      {
        id: "phase-3",
        label: "Full Structural Transformation",
        years: "Years 5–10",
        priority: "Nationwide rollout and system integration.",
        investment: "R15bn – R25bn",
      },
    ],
    totalInvestment: "R29bn – R47bn over 10 years",
  },
  {
    id: "reform-agenda",
    title: "Reform Agenda (Institutional Governance)",
    shortTitle: "Reform",
    vision:
      "Fix the structural governance failures that cause service delivery collapse — using the RAARICLE diagnostic framework to identify and resolve five failure patterns: Fragmentation, Misalignment, Absence, Conflation, and Inversion.",
    color: "#8B2232",
    lightColor: "#F0DEE2",
    phases: [
      {
        id: "phase-1",
        label: "Concurrent Function Clarity & Provincial Reform",
        years: "Years 1–3",
        priority:
          "Resolve the constitutional ambiguity in concurrent functions and address provincial performance failures.",
      },
      {
        id: "phase-2",
        label: "Municipal Service Delivery Reform",
        years: "Years 3–5",
        priority:
          "Fix the four core municipal services through structural separation and financial discipline.",
      },
      {
        id: "phase-3",
        label: "Capability Building & Systemic Integration",
        years: "Years 5–10",
        priority:
          "Build the professional capacity needed to sustain reforms.",
      },
    ],
  },
  {
    id: "economic-growth",
    title: "Economic Growth and Development",
    shortTitle: "Economy",
    vision:
      "Shift South Africa from a resource-dependent, consumption-driven economy to a diversified, innovation-led economy capable of generating inclusive growth through three engines: new venture creation, export diversification, and MSME financing.",
    color: "#7A5C1F",
    lightColor: "#F3EBDA",
    phases: [
      {
        id: "phase-1",
        label: "Foundation Building",
        years: "Years 1–3",
        priority:
          "Remove barriers and build the institutional infrastructure for growth.",
      },
      {
        id: "phase-2",
        label: "Engine Ignition",
        years: "Years 3–5",
        priority: "Activate the three engines of growth.",
      },
      {
        id: "phase-3",
        label: "Scaling & Sustaining Growth",
        years: "Years 5–10",
        priority:
          "Scale successful programmes and build self-sustaining growth ecosystems.",
      },
    ],
  },
  {
    id: "human-development",
    title: "Human Development",
    shortTitle: "People",
    vision:
      "Build a reinforcing cycle where health, education, and economic opportunity compound into sustained human capability — recognising that South Africa's development outcomes are worse than its income level would predict, indicating systemic institutional failure rather than resource scarcity.",
    color: "#553691",
    lightColor: "#E8E0F4",
    phases: [
      {
        id: "phase-1",
        label: "Stabilise the Foundations",
        years: "Years 1–3",
        priority: "Stop the bleeding in health and education outcomes.",
      },
      {
        id: "phase-2",
        label: "Build the Reinforcing Cycle",
        years: "Years 3–5",
        priority:
          "Connect health, education, and economic opportunity into a mutually reinforcing system.",
      },
      {
        id: "phase-3",
        label: "Sustain & Compound Gains",
        years: "Years 5–10",
        priority:
          "Ensure gains are self-reinforcing and intergenerational.",
      },
    ],
  },
];

// ── Reforms ──────────────────────────────────────────────────

export const reforms: Reform[] = [
  // ── Safety & Security: Phase 1 ──
  {
    id: "1.1",
    workstream: "safety-security",
    phase: "phase-1",
    title: "Investigating Magistracy Pilot",
    description:
      "Pilot Judicial Investigation Officers (JIOs) in 2–3 metropolitan areas. JIOs are magistrate-level officers with both investigative and preliminary judicial powers, directing SAPS detectives on serious and complex cases (Track C and Track D matters).",
    legislative: "New Investigating Magistracy Act; amendments to Criminal Procedure Act, 1977",
    cost: "R500m – R800m",
  },
  {
    id: "1.2",
    workstream: "safety-security",
    phase: "phase-1",
    title: "SAPS Detective Capacity Upgrade",
    description:
      "Ring-fenced detective recruitment, specialised training programmes, forensic capacity restoration.",
    legislative: "Amendments to South African Police Service Act, 1995",
    cost: "R3bn – R5bn",
  },
  {
    id: "1.3",
    workstream: "safety-security",
    phase: "phase-1",
    title: "NPA Restoration",
    description:
      "Restore prosecutorial capacity through depoliticised appointment processes, adequate resourcing, and specialised prosecution units.",
    legislative: "Amendments to National Prosecuting Authority Act, 1998",
    cost: "R2bn – R3bn",
  },
  {
    id: "1.4",
    workstream: "safety-security",
    phase: "phase-1",
    title: "Digital Case Management System",
    description:
      "Replace SAPS's broken Crime Administration System (CAS) with a modern digital case management platform — the foundation for the full Integrated Criminal Justice Information System (ICJS).",
    legislative: "Regulatory/procurement",
    cost: "R2bn – R4bn",
  },
  {
    id: "1.5",
    workstream: "safety-security",
    phase: "phase-1",
    title: "Case-Flow Triage System",
    description:
      "Classify every criminal matter within 72 hours of arrest into four tracks: Track A (summary/diversion, 90-day limit), Track B (standard criminal, 18-month limit), Track C (complex/serious, 24-month limit), Track D (national priority, 30-month limit).",
    legislative: "Amendments to Criminal Procedure Act, 1977",
    cost: "Included in 1.4",
  },
  // ── Safety & Security: Phase 2 ──
  {
    id: "2.1",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Municipal Community Justice Courts",
    description:
      "Establish community courts under amended Magistrates' Courts Act. Presided over by Community Justice Officers (CJOs) — a new para-legal profession. Handle summary offences with sentences up to two years. Integrate restorative justice and traditional justice processes within Track A.",
    legislative: "Amendments to Magistrates' Courts Act, 1944",
    cost: "R3bn – R5bn",
  },
  {
    id: "2.2",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Sentencing Commission",
    description:
      "Establish a permanent, independent South African Sentencing Commission to develop presumptive sentencing bands, maintain a national sentencing database, and publish real-time analytics dashboards for judicial officers.",
    legislative: "New Sentencing Reform Act",
    cost: "R200m – R400m",
  },
  {
    id: "2.3",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Three-Tier Policing Pilots",
    description:
      "Pilot the restructured policing architecture in 2–3 provinces. Tier 1 (National): Focused SAPS of 30,000–40,000 members covering serious/organised crime, counter-corruption, cybercrime, border security, and rapid response. Tier 2 (Provincial): Nine Provincial Police Services with operational independence and dedicated rural crime units. Tier 3 (Municipal): Metro police with full criminal investigation powers; community policing grids for smaller municipalities.",
    legislative: "Amendments to South African Police Service Act, 1995",
    cost: "R3bn – R5bn",
  },
  {
    id: "2.4",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Civilian Police Oversight",
    description:
      "Establish an independent Civilian Police Intelligence Oversight Council reporting to Parliament. Expand IPID with provincial offices.",
    legislative: "Amendments to IPID Act",
    cost: "Included in 2.3",
  },
  {
    id: "2.5",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Private Security Regulation",
    description:
      "Strengthen regulation of the private security industry to ensure alignment with constitutional policing standards.",
    legislative:
      "Amendments to Private Security Industry Regulation Act, 2001",
    cost: "Regulatory cost",
  },
  // ── Safety & Security: Phase 3 ──
  {
    id: "3.1",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Nationwide Three-Tier Policing",
    description:
      "Roll out the three-tier policing model to all nine provinces based on Phase 2 pilot evidence.",
    legislative: "Phase 2 legislation applies",
    cost: "R8bn – R15bn",
  },
  {
    id: "3.2",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Rehabilitation-Centred Corrections",
    description:
      "Transform the correctional system: mandate individual sentence plans for every inmate, establish minimum staffing ratios (1:6 staff-to-inmate), universal education and vocational training, evidence-based substance abuse treatment, mental health screening and services, and restructured parole boards. Transform Community Corrections from compliance monitoring to reintegration support.",
    legislative: "Amendments to Correctional Services Act, 1998",
    cost: "R5bn – R8bn",
  },
  {
    id: "3.3",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Structured Sentencing Guidelines",
    description:
      "Implement the Sentencing Commission's first set of structured guidelines across all courts.",
    legislative: "Phase 2 Sentencing Reform Act applies",
    cost: "Included in 3.2",
  },
  {
    id: "3.4",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Full ICJS Deployment",
    description:
      "Expand the digital case management system into the full Integrated Criminal Justice Information System — unified tracking from report through investigation, prosecution, adjudication, sentencing, incarceration, rehabilitation, parole, and post-release monitoring. Includes virtual remand hearing technology, AI-assisted court scheduling, and unified digital docket management.",
    legislative: "Regulatory/procurement",
    cost: "R2bn – R4bn",
  },
  {
    id: "3.5",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Criminal Justice Statistics Authority",
    description:
      "Establish an independent Criminal Justice Statistics Authority (division within Stats SA or standalone entity) to publish quarterly scorecard data and raw datasets.",
    legislative: "New enabling legislation",
    cost: "R100m – R200m",
  },

  // ── Reform Agenda: Phase 1 ──
  {
    id: "2A.1",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Education Reform",
    title: "Authority Consolidation",
    description:
      "Co-locate authority with accountability at provincial level. Provincial MECs for Education gain operational control over teacher employment, curriculum implementation flexibility, and infrastructure decisions.",
    scope: ["national", "provincial"],
  },
  {
    id: "2A.2",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Education Reform",
    title: "Responsibility Clarification",
    description:
      "Create a single entity responsible for the full delivery chain from district to classroom. Establish clear handoffs between DBE (policy), provinces (delivery), and schools (implementation).",
    scope: ["national", "provincial"],
  },
  {
    id: "2A.3",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Education Reform",
    title: "District Capacity Building",
    description:
      "Strengthen district support capacity with adequate subject advisors, reduce circuit manager student-to-teacher ratios, invest in real-time data systems at district level.",
    scope: ["provincial"],
  },
  {
    id: "2A.4",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Education Reform",
    title: "Automatic Intervention Triggers",
    description:
      "Establish automatic intervention when provinces underperform by defined thresholds, with mandatory consequences for persistent failure (Section 100 interventions).",
    scope: ["national"],
  },
  {
    id: "2B.1",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Primary Healthcare Reform",
    title: "Regulator-Provider Separation",
    description:
      "Separate the regulatory function from the operational function in healthcare delivery, following the WSA/WSP structural model.",
    scope: ["national", "provincial"],
  },
  {
    id: "2B.2",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Primary Healthcare Reform",
    title: "Facility Manager Authority",
    description:
      "Grant facility managers independent authority over procurement and staffing within defined parameters. Enable direct procurement rights for critical medicines above defined stock-out thresholds.",
    scope: ["provincial"],
  },
  {
    id: "2B.3",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Primary Healthcare Reform",
    title: "Financial Ring-Fencing",
    description:
      "Ring-fence PHC budget allocations within provincial budgets. Create dedicated funding streams for primary healthcare infrastructure separate from hospital funding.",
    scope: ["provincial"],
  },
  {
    id: "2B.4",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Primary Healthcare Reform",
    title: "NHI Implementation Alignment",
    description:
      "Ensure NHI consolidates rather than fragments responsibility. Create single accountability point: NHI as payer, provincial facilities as integrated provider.",
    scope: ["national"],
  },
  {
    id: "2C.1",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Human Settlements Reform",
    title: "End-to-End Responsibility",
    description:
      "Establish housing project management units at municipality level with full authority over land acquisition through title deed registration.",
    scope: ["municipal"],
  },
  {
    id: "2C.2",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Human Settlements Reform",
    title: "Level 2 Accreditation",
    description:
      "Amend the Housing Act to enable Level 2 accreditation in all capable municipalities (following Cape Town and Johannesburg model).",
    scope: ["national", "municipal"],
  },
  {
    id: "2C.3",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Human Settlements Reform",
    title: "Title Deed Backlog",
    description:
      "Create dedicated task team to clear 900,000+ title deed backlog within defined timeline. Establish automatic consequences for provinces failing to register title deeds.",
    scope: ["national", "provincial"],
  },
  {
    id: "2C.4",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Human Settlements Reform",
    title: "Unified Housing Database",
    description:
      "Establish a single, accurate, national database of housing demand with integrated project tracking from approval through title deed registration.",
    scope: ["national"],
  },
  {
    id: "2C.5",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Human Settlements Reform",
    title: "Subsidy Reform",
    description:
      "Increase subsidy quantum to reflect actual construction costs in high-cost areas. Implement performance-based developer selection. Create separate funding stream for bulk infrastructure independent of top-structure funding.",
    scope: ["national"],
  },

  // ── Reform Agenda: Phase 2 ──
  {
    id: "2D.1",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Water and Sanitation Reform",
    title: "WSA/WSP Separation",
    description:
      "Separate the Water Services Authority (regulator) from the Water Services Provider (operator). Appoint independent WSPs (Water Boards, municipal entities, or private operators) while municipality remains WSA. This is the single most important structural reform — resolving the conflation pattern where the same entity regulates and delivers.",
    scope: ["municipal"],
  },
  {
    id: "2D.2",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Water and Sanitation Reform",
    title: "Revenue Ring-Fencing",
    description:
      "Ring-fence all water revenue strictly for water operations and infrastructure maintenance. Mandate minimum 8% of water asset value allocation to maintenance (up from current 3%). Establish dedicated infrastructure maintenance reserve fund.",
    scope: ["municipal"],
  },
  {
    id: "2D.3",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Water and Sanitation Reform",
    title: "Non-Revenue Water Reduction",
    description:
      "Implement leak detection and repair programmes at district level. Establish billing accuracy improvements and meter installation targets. Create performance incentives for water loss reduction (current write-off rate: 47.4%).",
    scope: ["municipal"],
  },
  {
    id: "2D.4",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Water and Sanitation Reform",
    title: "Infrastructure Rehabilitation",
    description:
      "Address R400 billion maintenance backlog through phased capital programme with infrastructure rehabilitation grants separate from operational budgets.",
    scope: ["national", "municipal"],
  },
  {
    id: "2D.5",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Water and Sanitation Reform",
    title: "Regulatory Enforcement",
    description:
      "Strengthen DWS's regulatory capacity to enforce Blue Drop/Green Drop recommendations. Create automatic consequences for municipalities failing quality standards. Establish mandatory intervention protocols for critical failures.",
    scope: ["national"],
  },
  {
    id: "2E.1",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Electricity Reform",
    title: "Revenue Ring-Fencing",
    description:
      "Ring-fence electricity revenue strictly for electricity operations and infrastructure. End cross-subsidization of other municipal services through electricity revenue. Establish separate accounting and fund allocation.",
    scope: ["municipal"],
  },
  {
    id: "2E.2",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Electricity Reform",
    title: "IPP Procurement Authority",
    description:
      "Empower municipalities to procure from independent power producers directly, leveraging the Electricity Regulation Amendment Act (2024). Establish tariff-setting authority within NERSA framework with clearer municipal autonomy.",
    scope: ["national", "municipal"],
  },
  {
    id: "2E.3",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Electricity Reform",
    title: "Infrastructure Investment",
    description:
      "Address R32 billion maintenance backlog through dedicated capital programme. Require minimum 8% of electricity asset value on maintenance. Establish asset replacement cycles for aging distribution infrastructure (average 40 years old).",
    scope: ["municipal"],
  },
  {
    id: "2E.4",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Electricity Reform",
    title: "Distribution Loss Reduction",
    description:
      "Implement advanced metering infrastructure (AMI) to reduce non-technical losses. Establish legal meter theft penalties and enforcement. Create technical loss reduction through network optimisation (current average: 18% distribution losses).",
    scope: ["municipal"],
  },
  {
    id: "2E.5",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Electricity Reform",
    title: "Eskom Debt Resolution",
    description:
      "Address R110 billion municipality arrears to Eskom through structured payment plans. Link payment compliance to municipal grants/disbursements as enforcement mechanism.",
    scope: ["national", "municipal"],
  },
  {
    id: "2F.1",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Waste Management and Roads",
    title: "Authority Consolidation",
    description:
      "Consolidate fragmented waste management authority into single municipal function.",
    scope: ["municipal"],
  },
  {
    id: "2F.2",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Waste Management and Roads",
    title: "Revenue Ring-Fencing",
    description: "Ring-fence waste revenue for waste operations.",
    scope: ["municipal"],
  },
  {
    id: "2F.3",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Waste Management and Roads",
    title: "Service Standards Enforcement",
    description:
      "Establish enforcement mechanisms for failing waste service standards.",
    scope: ["municipal"],
  },
  {
    id: "2F.4",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Waste Management and Roads",
    title: "Roads Maintenance Budgeting",
    description:
      "Create integrated roads maintenance budgeting with clear performance metrics.",
    scope: ["municipal"],
  },

  // ── Reform Agenda: Phase 3 ──
  {
    id: "2G.1",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Municipal Capability Development",
    title: "Professional Cadre Development",
    description:
      "Establish municipal capability development programmes in engineering, financial management, and project management with professional development pathways.",
    scope: ["municipal"],
  },
  {
    id: "2G.2",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Municipal Capability Development",
    title: "Minimum Qualification Standards",
    description:
      "Implement minimum qualification standards for critical municipal positions.",
    scope: ["municipal"],
  },
  {
    id: "2G.3",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Municipal Capability Development",
    title: "Mentoring Programmes",
    description:
      "Create structured mentoring programmes between better-resourced and under-resourced municipalities.",
    scope: ["municipal"],
  },
  {
    id: "2G.4",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Municipal Capability Development",
    title: "Provincial Performance Management",
    description:
      "Strengthen provincial-national coordination mechanisms. Implement performance-based resource allocation for provinces.",
    scope: ["provincial"],
  },
  {
    id: "2H.1",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Constitutional and Legislative Clarity",
    title: "Constitutional vs Legislative Determination",
    description:
      "Clarify constitutional authority distribution — most reforms can be achieved through legislative amendment without constitutional change. Constitutional amendments only where Schedule 4 authority distribution requires modification.",
    scope: ["national"],
  },
  {
    id: "2H.2",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Constitutional and Legislative Clarity",
    title: "Binding Joint Accountability",
    description:
      "Create binding joint accountability frameworks across national, provincial, and municipal entities for concurrent functions.",
    scope: ["national"],
  },

  // ── Economic Growth: Phase 1 ──
  {
    id: "3A.1",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "MSME Ecosystem Restructuring",
    title: "Demand-Driven Support Integration",
    description:
      "Integrate fragmented MSME support agencies (SEDA, SEFA, dtic, NEF, IDC) into a single demand-responsive system. Shift from supply-driven to demand-driven support model — structured around what businesses actually need, not what agencies supply.",
  },
  {
    id: "3A.2",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "MSME Ecosystem Restructuring",
    title: "Regulatory Simplification",
    description:
      "Reduce compliance burden on small firms. Streamline business registration and licensing (target: 48 hours). Create simplified compliance pathways for businesses under defined revenue thresholds.",
  },
  {
    id: "3A.3",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "MSME Ecosystem Restructuring",
    title: "Digital Financial Inclusion",
    description:
      "Extend bank account access and payment systems to informal businesses. Support mobile money for unbanked MSME populations. Create digital financial inclusion infrastructure.",
  },
  {
    id: "3B.1",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "Credit and Financing Architecture",
    title: "Small Business Guarantee Fund",
    description:
      "Establish a South African Small Business Guarantee Fund modelled on the US SBA's 7(a) programme. Commercial banks provide credit; government guarantees 75–85% of default risk. Enables lending to early-stage ventures without government doing direct lending.",
  },
  {
    id: "3B.2",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "Credit and Financing Architecture",
    title: "Alternative Financing Mechanisms",
    description:
      "Expand supply chain financing, invoice discounting and factoring, microfinance, and peer-to-peer lending platforms.",
  },
  {
    id: "3B.3",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "Credit and Financing Architecture",
    title: "Venture Capital Mobilisation",
    description:
      "Establish tax incentives for angel investment and venture capital funds. Create venture capital matching funds (private + government). Support secondary market development for early-stage equity.",
  },

  // ── Economic Growth: Phase 2 ──
  {
    id: "3C.1",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "New Venture Creation",
    title: "Startup Ecosystems",
    description:
      "Following Chile's Start-Up Chile model: attract international entrepreneurs, provide seed funding, embed in local accelerators. Establish dedicated startup funding programmes with venture capital matching. Create incubator and accelerator networks in major metros.",
  },
  {
    id: "3C.2",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "New Venture Creation",
    title: "Township and Rural Enterprise",
    description:
      "Targeted programmes for township and rural enterprise development with adapted financing, mentoring, and market access support.",
  },
  {
    id: "3D.1",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Export Diversification",
    title: "Platinum Cluster",
    description:
      "Catalytic converters, fuel cell components, emission control systems — leveraging existing PGM processing capabilities into higher-value manufactured products.",
  },
  {
    id: "3D.2",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Export Diversification",
    title: "Automotive Cluster",
    description:
      "High-value components, aerospace components, rail rolling stock — building on APDP incentives and existing automotive manufacturing base.",
  },
  {
    id: "3D.3",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Export Diversification",
    title: "Agricultural Cluster",
    description:
      "Essential oils, fruit-based beverages, processed foods, botanical extracts — moving up the value chain from raw agricultural commodity exports.",
  },
  {
    id: "3D.4",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Export Diversification",
    title: "Services Cluster",
    description:
      "Fintech, insurtech, mining services consulting, edtech — leveraging South Africa's advanced financial sector and mining expertise into exportable services.",
  },
  {
    id: "3E.1",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Trade and Market Access",
    title: "Trade Agreement Optimisation",
    description:
      "Leverage existing agreements (APDP for automotive, agricultural trade agreements). Negotiate new agreements prioritising high-complexity product categories.",
  },
  {
    id: "3E.2",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Trade and Market Access",
    title: "AfCFTA Positioning",
    description:
      "Position South Africa as a services and manufacturing hub within the African Continental Free Trade Area.",
  },

  // ── Economic Growth: Phase 3 ──
  {
    id: "3F.1",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Metro-Level Economic Development",
    title: "Metro Economic Rankings",
    description:
      "Establish a metro economic performance ranking system across four pillars: Economic Development, Service Delivery, Governance and Finance, and Infrastructure and Sustainability — creating competitive benchmarking between South Africa's eight metropolitan municipalities.",
  },
  {
    id: "3F.2",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Metro-Level Economic Development",
    title: "Metro Growth Compacts",
    description:
      "Create binding growth compacts between national government and metropolitan municipalities with defined targets, incentives, and consequences.",
  },
  {
    id: "3G.1",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Institutional Quality for Growth",
    title: "Regulatory Quality",
    description:
      "Reduce regulatory complexity and improve policy predictability. Create regulatory impact assessments for all new business-affecting legislation.",
  },
  {
    id: "3G.2",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Institutional Quality for Growth",
    title: "Competition and Market Access",
    description:
      "Strengthen competition enforcement to reduce concentration and enable MSME market entry. Address barriers to entry in concentrated sectors.",
  },
  {
    id: "3G.3",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Institutional Quality for Growth",
    title: "Political Economy Management",
    description:
      "Address rent-seeking and patronage networks that distort resource allocation. Build coalitions for reform by demonstrating growth dividends.",
  },

  // ── Human Development: Phase 1 ──
  {
    id: "4A.1",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "Primary Healthcare Infrastructure",
    description:
      "Strengthen primary healthcare facility infrastructure, staffing, and supply chains (complementing Workstream 2B governance reforms).",
  },
  {
    id: "4A.2",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "Substance Abuse Treatment",
    description:
      "Expand evidence-based substance abuse treatment capacity at community level.",
  },
  {
    id: "4A.3",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "Mental Health Services",
    description:
      "Expand psychiatric and psychological services, implement universal screening.",
  },
  {
    id: "4A.4",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "GBV Prevention and Response",
    description:
      "Implement comprehensive gender-based violence prevention programmes and strengthen response systems.",
  },
  {
    id: "4A.5",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "Maternal and Child Health",
    description:
      "Strengthen antenatal care, nutrition programmes, and early childhood health interventions to break intergenerational disadvantage.",
  },
  {
    id: "4B.1",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Education Quality",
    title: "Teacher Development",
    description:
      "Professional development and support programmes focused on content knowledge and pedagogical skills — addressing the finding that many teachers cannot pass the assessments they set for their students.",
  },
  {
    id: "4B.2",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Education Quality",
    title: "Early Childhood Development",
    description:
      "Expand access to quality ECD programmes, recognising that the reinforcing cycle begins before formal schooling.",
  },
  {
    id: "4B.3",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Education Quality",
    title: "School Safety",
    description:
      "Address the 'learning in a war zone' crisis — schools in communities with high violence require specific safety interventions to enable learning.",
  },
  {
    id: "4B.4",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Education Quality",
    title: "Learning Infrastructure",
    description:
      "Provide essential learning infrastructure: libraries, laboratories, connectivity, and learning materials.",
  },

  // ── Human Development: Phase 2 ──
  {
    id: "4C.1",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Education-to-Employment Pipeline",
    title: "Skills-Labour Market Alignment",
    description:
      "Align skills training programmes with actual labour market demand, informed by economic growth engine priorities from Workstream 3.",
  },
  {
    id: "4C.2",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Education-to-Employment Pipeline",
    title: "Work-Seeking Support",
    description:
      "Structured support for work-seeking including job placement, career guidance, and labour market information.",
  },
  {
    id: "4C.3",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Education-to-Employment Pipeline",
    title: "Youth Employment Programmes",
    description:
      "Targeted programmes addressing the youth unemployment crisis through work experience, apprenticeships, and entrepreneur support.",
  },
  {
    id: "4D.1",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Social Protection",
    title: "Grant System Optimisation",
    description:
      "Ensure social grants effectively support human development outcomes rather than merely providing income transfers.",
  },
  {
    id: "4D.2",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Social Protection",
    title: "Nutrition Security",
    description:
      "Address food insecurity as a binding constraint on health and educational outcomes, particularly for children.",
  },

  // ── Human Development: Phase 3 ──
  {
    id: "4E.1",
    workstream: "human-development",
    phase: "phase-3",
    subgroup: "Development Within Constitutional Limits",
    title: "Development Rights Awareness",
    description:
      "Expand citizen understanding of constitutional development rights and how to claim them through existing mechanisms.",
  },
  {
    id: "4E.2",
    workstream: "human-development",
    phase: "phase-3",
    subgroup: "Development Within Constitutional Limits",
    title: "Community-Led Development",
    description:
      "Enable community-led development initiatives that complement institutional reforms.",
  },
  {
    id: "4E.3",
    workstream: "human-development",
    phase: "phase-3",
    subgroup: "Development Within Constitutional Limits",
    title: "Outcome Measurement",
    description:
      "Establish a Human Development Scorecard moving beyond GDP to measure health, education, and opportunity outcomes at district level.",
  },
];

// ── Legislative Programme ────────────────────────────────────

export const legislativeItems: LegislativeItem[] = [
  // New statutes
  { id: "L.1", name: "Investigating Magistracy Act", type: "new", workstream: "safety-security", phase: "phase-1" },
  { id: "L.2", name: "Sentencing Reform Act", type: "new", workstream: "safety-security", phase: "phase-2" },
  { id: "L.3", name: "Small Business Guarantee Fund Act", type: "new", workstream: "economic-growth", phase: "phase-1" },
  // Amendments
  { id: "L.4", name: "Criminal Procedure Act, 1977", type: "amendment", workstream: "safety-security", phase: "phase-1" },
  { id: "L.5", name: "National Prosecuting Authority Act, 1998", type: "amendment", workstream: "safety-security", phase: "phase-1" },
  { id: "L.6", name: "South African Police Service Act, 1995", type: "amendment", workstream: "safety-security", phase: "phase-1" },
  { id: "L.7", name: "Magistrates' Courts Act, 1944", type: "amendment", workstream: "safety-security", phase: "phase-2" },
  { id: "L.8", name: "Correctional Services Act, 1998", type: "amendment", workstream: "safety-security", phase: "phase-3" },
  { id: "L.9", name: "Private Security Industry Regulation Act, 2001", type: "amendment", workstream: "safety-security", phase: "phase-2" },
  { id: "L.10", name: "Housing Act", type: "amendment", workstream: "reform-agenda", phase: "phase-1" },
  { id: "L.11", name: "Water Services Act", type: "amendment", workstream: "reform-agenda", phase: "phase-2" },
  { id: "L.12", name: "Municipal Finance Management Act", type: "amendment", workstream: "reform-agenda", phase: "phase-2" },
  { id: "L.13", name: "Electricity Regulation Amendment Act, 2024", type: "amendment", workstream: "reform-agenda", phase: "phase-2" },
  // Constitutional
  { id: "L.14", name: "Schedule 4 concurrent function clarity", type: "constitutional", workstream: "reform-agenda", phase: "phase-3" },
];

// ── Milestones ───────────────────────────────────────────────

export const milestones: Milestone[] = [
  {
    period: "Year 1",
    label: "Quick Wins",
    items: [
      "Case-flow triage system design and pilot",
      "MSME ecosystem integration audit",
      "RAARICLE diagnostic assessments across concurrent functions",
      "Revenue ring-fencing legislation drafted",
      "Teacher development programme launch",
      "District-level human development baseline",
      "Business registration simplification (48-hour target)",
      "Title deed backlog task team established",
    ],
  },
  {
    period: "Year 5",
    label: "Medium-Term Milestones",
    items: [
      "Investigating Magistracy operational in pilot areas",
      "Community courts operational",
      "Three-tier policing piloted in 2–3 provinces",
      "WSA/WSP separation implemented",
      "Small Business Guarantee Fund lending at scale",
      "First export cluster products entering international markets",
      "Reinforcing cycle measurable in bundled intervention districts",
      "Revenue ring-fencing in effect for water and electricity",
    ],
  },
  {
    period: "Year 10",
    label: "Long-Term Outcomes",
    items: [
      "Nationwide three-tier policing operational",
      "Rehabilitation-centred corrections system functional",
      "Integrated Criminal Justice Information System fully deployed",
      "Municipal service delivery structurally reformed",
      "Diversified export base reducing commodity dependence",
      "Self-sustaining venture ecosystems",
      "Measurable intergenerational human development gains",
      "All 13 Law and Order Scorecard outcomes tracked quarterly",
    ],
  },
];

// ── Cross-Cutting ────────────────────────────────────────────

export const digitalInfrastructure: CrossCuttingDigital[] = [
  { id: "CC.1", initiative: "Integrated Criminal Justice Information System (ICJS)", workstreams: "Safety and Security" },
  { id: "CC.2", initiative: "Unified Housing Demand Database", workstreams: "Reform Agenda" },
  { id: "CC.3", initiative: "Real-Time Education Data Systems", workstreams: "Reform Agenda, Human Development" },
  { id: "CC.4", initiative: "Digital Financial Inclusion Infrastructure", workstreams: "Economic Growth" },
  { id: "CC.5", initiative: "Municipal Service Performance Dashboards", workstreams: "Reform Agenda" },
];

export const structuralPrinciples: StructuralPrinciple[] = [
  { title: "Separation of Regulator from Provider", examples: "Water (WSA/WSP), Electricity (municipality/IPP), Healthcare (regulator/facility), Policing (oversight/operational)" },
  { title: "Revenue Ring-Fencing", examples: "Water revenue for water, electricity revenue for electricity, healthcare funding for healthcare" },
  { title: "Consolidation of End-to-End Responsibility", examples: "Housing, education, healthcare, criminal justice pipeline" },
  { title: "Automatic Enforcement Triggers", examples: "Provincial intervention thresholds, municipal service failure protocols, court case-flow time limits" },
  { title: "Performance-Based Accountability", examples: "Scorecards, rankings, and consequences at every level" },
];

// ── RAARICLE Framework ───────────────────────────────────────

export const raaricleElements: RaaricleElement[] = [
  { letter: "R", name: "Responsibility", question: "Is there a single, identifiable entity responsible for the outcome?" },
  { letter: "A", name: "Accountability", question: "Can that entity be held to account for success or failure?" },
  { letter: "A", name: "Authority", question: "Does the responsible entity have the power to act?" },
  { letter: "R", name: "Resources", question: "Are adequate financial and human resources available?" },
  { letter: "I", name: "Information", question: "Does the entity have the data needed to make decisions?" },
  { letter: "C", name: "Capability", question: "Does the entity have the skills and systems to deliver?" },
  { letter: "L", name: "Legitimacy", question: "Does the entity have the democratic mandate and public trust to act?" },
  { letter: "E", name: "Enforcement", question: "Are there automatic consequences for failure?" },
];

export const failurePatterns: FailurePattern[] = [
  { name: "Fragmentation", description: "Responsibility scattered across multiple entities (housing, education, healthcare)" },
  { name: "Misalignment", description: "Wrong entity holds the wrong governance element (education authority at wrong level)" },
  { name: "Absence", description: "Critical RAARICLE element does not exist (no enforcement triggers)" },
  { name: "Conflation", description: "Incompatible functions combined in same entity (WSA = WSP, regulator = provider)" },
  { name: "Inversion", description: "Wrong entity makes the decision (national deciding provincial operational matters)" },
];

// ── Scorecard ────────────────────────────────────────────────

export const scorecardOutcomes: string[] = [
  "Crime Suppression and Deterrence",
  "Detection and Rapid Response",
  "Investigation Quality",
  "Lawful Arrest and Secure Pre-Trial Custody",
  "Intelligence Production and Threat Assessment",
  "Public Order and Stability Management",
  "Prosecutorial Effectiveness and Case Conversion",
  "Judicial Efficiency and Access to Justice",
  "Sentencing Integrity and Proportionality",
  "Secure and Humane Incarceration",
  "Rehabilitation and Skills Development",
  "Reintegration and Recidivism Reduction",
  "Victim Justice, Reparation, and Restoration",
];
