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

  scope?: Scope[];
  articleSlug?: string;
  dependsOn?: string[];
}

export interface Workstream {
  id: WorkstreamId;
  title: string;
  shortTitle: string;
  vision: string;
  color: string;
  lightColor: string;
  phases: Phase[];

}

export interface Phase {
  id: PhaseId;
  label: string;
  years: string;
  priority: string;

}

export interface LegislativeItem {
  id: string;
  name: string;
  type: "new" | "amendment" | "constitutional";
  workstream: WorkstreamId;
  phase: PhaseId;
  articleSlug: string;
}

export interface MilestoneItem {
  text: string;
  workstream: WorkstreamId;
}

export interface Milestone {
  period: string;
  label: string;
  items: MilestoneItem[];
}

export interface CrossCuttingDigital {
  id: string;
  initiative: string;
  workstreams: string;
}

export interface StructuralPrinciple {
  title: string;
  description: string;
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
  articleSlug: string;
}

export interface ScorecardOutcome {
  outcome: string;
  baseline?: string;
  year5?: string;
  year10?: string;
}

export interface CaptureVector {
  number: number;
  name: string;
  description: string;
  defences: string;
  articleSlug: string;
}

export interface CycleScorecardIndicator {
  indicator: string;
  source: string;
  threshold: string;
}

export interface CycleScorecardLink {
  id: "safety-growth" | "growth-development" | "development-safety";
  label: string;
  description: string;
  indicators: CycleScorecardIndicator[];
}

// ── Workstreams ──────────────────────────────────────────────

export const workstreams: Workstream[] = [
  {
    id: "safety-security",
    title: "Citizen Safety and Security",
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
      },
      {
        id: "phase-2",
        label: "Court Reform & Policing Restructuring",
        years: "Years 3–5",
        priority:
          "Build the institutional architecture for community justice and restructured policing.",
      },
      {
        id: "phase-3",
        label: "Full Structural Transformation",
        years: "Years 5–10",
        priority: "Nationwide rollout and system integration.",
      },
    ],
  },
  {
    id: "reform-agenda",
    title: "Reform Agenda (Institutional Governance)",
    shortTitle: "Institutional",
    vision:
      "Fix the structural governance failures that cause service delivery collapse — using the RAARICLE™ diagnostic framework to identify and resolve five failure patterns: Fragmentation, Misalignment, Absence, Conflation, and Inversion.",
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
  // ── Citizen Safety & Security: Phase 1 ──
  {
    id: "1.1",
    workstream: "safety-security",
    phase: "phase-1",
    title: "Investigating Magistracy Pilot",
    description:
      "Pilot Judicial Investigation Officers (JIOs) in 2–3 metropolitan areas (i.e., Johannesburg, Cape Town, and eThekwini). JIOs are magistrate-level officers with both investigative and preliminary judicial powers, directing South African Police Service (SAPS) detectives on serious and complex cases (Track C and Track D matters).",
    legislative: "New Investigating Magistracy Act; amendments to Criminal Procedure Act, 1977",
    articleSlug: "ss-3-2-independent-investigating-magistracy",
  },
  {
    id: "1.2",
    workstream: "safety-security",
    phase: "phase-1",
    title: "SAPS Detective Capacity Upgrade",
    description:
      "Ring-fenced detective recruitment, specialised training programmes, forensic capacity restoration.",
    legislative: "Amendments to South African Police Service Act, 1995",
    articleSlug: "ss-2-2-policing-a-divided-country",
  },
  {
    id: "1.3",
    workstream: "safety-security",
    phase: "phase-1",
    title: "NPA Restoration",
    description:
      "Restore National Prosecuting Authority (NPA) capacity through depoliticised appointment processes, adequate resourcing, and specialised prosecution units (i.e., rebuilding units gutted during the state-capture era, such as the Directorate of Special Operations).",
    legislative: "Amendments to National Prosecuting Authority Act, 1998",
    articleSlug: "ss-2-3-justice-delayed-rights-denied",
  },
  {
    id: "1.4",
    workstream: "safety-security",
    phase: "phase-1",
    title: "Digital Case Management System",
    description:
      "Replace SAPS's broken Crime Administration System (CAS) with a modern digital case management platform — the foundation for the full Integrated Criminal Justice Information System (ICJS).",
    legislative: "Regulatory/procurement",
    articleSlug: "ss-4-1-sequencing-reform",
  },
  {
    id: "1.5",
    workstream: "safety-security",
    phase: "phase-1",
    title: "Case-Flow Triage System",
    description:
      "Classify every criminal matter within 72 hours of arrest into four tracks: Track A (summary/diversion, 90-day limit), Track B (standard criminal, 18-month limit), Track C (complex/serious, 24-month limit), Track D (national priority, 30-month limit).",
    legislative: "Amendments to Criminal Procedure Act, 1977",
    articleSlug: "ss-2-1-the-broken-pipeline",
  },
  // ── Citizen Safety & Security: Phase 2 ──
  {
    id: "2.1",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Municipal Community Justice Courts",
    description:
      "Establish community courts under amended Magistrates' Courts Act. Presided over by Community Justice Officers (CJOs) — a new para-legal profession. Handle summary offences with sentences up to two years. Integrate restorative justice and traditional justice processes within Track A.",
    legislative: "Amendments to Magistrates' Courts Act, 1944",
    articleSlug: "ss-3-3-community-courts-and-restorative-justice",
    dependsOn: ["1.5"],
  },
  {
    id: "2.2",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Sentencing Commission",
    description:
      "Establish a permanent, independent South African Sentencing Commission to develop presumptive sentencing bands, maintain a national sentencing database, and publish real-time analytics dashboards for judicial officers.",
    legislative: "New Sentencing Reform Act",
    articleSlug: "ss-3-4-sentencing-commission-and-structured-guidelines",
  },
  {
    id: "2.3",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Three-Tier Policing Pilots",
    description:
      "Pilot the restructured policing architecture in 2–3 provinces. Tier 1 (National): Focused SAPS of 30,000–40,000 members covering serious/organised crime, counter-corruption, cybercrime, border security, and rapid response. Tier 2 (Provincial): Nine Provincial Police Services with operational independence and dedicated rural crime units. Tier 3 (Municipal): Metro police with full criminal investigation powers; community policing grids for smaller municipalities.",
    legislative: "Amendments to South African Police Service Act, 1995",
    articleSlug: "ss-3-1-three-tier-policing-architecture",
  },
  {
    id: "2.4",
    workstream: "safety-security",
    phase: "phase-2",
    title: "Civilian Police Oversight",
    description:
      "Establish an independent Civilian Police Intelligence Oversight Council reporting to Parliament. Expand the Independent Police Investigative Directorate (IPID) with provincial offices.",
    legislative: "Amendments to IPID Act",
    articleSlug: "ss-2-2-policing-a-divided-country",
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
    articleSlug: "ss-2-5-the-private-security-paradox",
  },
  // ── Citizen Safety & Security: Phase 3 ──
  {
    id: "3.1",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Nationwide Three-Tier Policing",
    description:
      "Roll out the three-tier policing model to all nine provinces based on Phase 2 pilot evidence.",
    legislative: "Phase 2 legislation applies",
    articleSlug: "ss-3-1-three-tier-policing-architecture",
    dependsOn: ["2.3"],
  },
  {
    id: "3.2",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Rehabilitation-Centred Corrections",
    description:
      "Transform the correctional system: mandate individual sentence plans for every inmate, establish minimum staffing ratios (1:6 staff-to-inmate), universal education and vocational training, evidence-based substance abuse treatment, mental health screening and services, and restructured parole boards. Transform Community Corrections from compliance monitoring to reintegration support.",
    legislative: "Amendments to Correctional Services Act, 1998",
    articleSlug: "ss-3-5-rehabilitation-as-constitutional-mandate",
  },
  {
    id: "3.3",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Structured Sentencing Guidelines",
    description:
      "Implement the Sentencing Commission's first set of structured guidelines across all courts.",
    legislative: "Phase 2 Sentencing Reform Act applies",
    articleSlug: "ss-3-4-sentencing-commission-and-structured-guidelines",
    dependsOn: ["2.2"],
  },
  {
    id: "3.4",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Full ICJS Deployment",
    description:
      "Expand the digital case management system into the full Integrated Criminal Justice Information System — unified tracking from report through investigation, prosecution, adjudication, sentencing, incarceration, rehabilitation, parole, and post-release monitoring. Includes virtual remand hearing technology, AI-assisted court scheduling, and unified digital docket management.",
    legislative: "Regulatory/procurement",
    articleSlug: "ss-4-1-sequencing-reform",
    dependsOn: ["1.4"],
  },
  {
    id: "3.5",
    workstream: "safety-security",
    phase: "phase-3",
    title: "Criminal Justice Statistics Authority",
    description:
      "Establish an independent Criminal Justice Statistics Authority (division within Stats SA or standalone entity) to publish quarterly scorecard data and raw datasets.",
    legislative: "New enabling legislation",
    articleSlug: "ss-4-3-measuring-progress",
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
    articleSlug: "ra-2-1-fixing-basic-education",
  },
  {
    id: "2A.2",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Education Reform",
    title: "Responsibility Clarification",
    description:
      "Create a single entity responsible for the full delivery chain from district to classroom. Establish clear handoffs between the Department of Basic Education / DBE (policy), provinces (delivery), and schools (implementation).",
    scope: ["national", "provincial"],
    articleSlug: "ra-2-1-fixing-basic-education",
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
    articleSlug: "ra-2-1-fixing-basic-education",
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
    articleSlug: "ra-2-1-fixing-basic-education",
  },
  {
    id: "2B.1",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Primary Healthcare Reform",
    title: "Regulator-Provider Separation",
    description:
      "Separate the regulatory function from the operational function in healthcare delivery, following the Water Services Authority / Water Services Provider (WSA/WSP) structural model.",
    scope: ["national", "provincial"],
    articleSlug: "ra-2-2-fixing-primary-healthcare",
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
    articleSlug: "ra-2-2-fixing-primary-healthcare",
  },
  {
    id: "2B.3",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Primary Healthcare Reform",
    title: "Financial Ring-Fencing",
    description:
      "Ring-fence primary healthcare (PHC) budget allocations within provincial budgets. Create dedicated funding streams for primary healthcare infrastructure separate from hospital funding.",
    scope: ["provincial"],
    articleSlug: "ra-2-2-fixing-primary-healthcare",
  },
  {
    id: "2B.4",
    workstream: "reform-agenda",
    phase: "phase-1",
    subgroup: "Primary Healthcare Reform",
    title: "NHI Implementation Alignment",
    description:
      "Ensure the National Health Insurance (NHI) consolidates rather than fragments responsibility. Create single accountability point: NHI as payer, provincial facilities as integrated provider.",
    scope: ["national"],
    articleSlug: "ra-2-2-fixing-primary-healthcare",
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
    articleSlug: "ra-2-3-fixing-human-settlements",
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
    articleSlug: "ra-2-3-fixing-human-settlements",
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
    articleSlug: "ra-2-3-fixing-human-settlements",
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
    articleSlug: "ra-2-3-fixing-human-settlements",
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
    articleSlug: "ra-2-3-fixing-human-settlements",
  },

  // ── Reform Agenda: Phase 2 ──
  {
    id: "2D.1",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Water and Sanitation Reform",
    title: "WSA/WSP Separation",
    description:
      "Separate the Water Services Authority (regulator) from the Water Services Provider (operator). Appoint independent WSPs (Water Boards, municipal entities, or private operators) while municipality remains WSA (i.e., Johannesburg Water operating as a ring-fenced municipal entity under the City of Johannesburg as WSA). This is the single most important structural reform — resolving the conflation pattern where the same entity regulates and delivers.",
    scope: ["municipal"],
    articleSlug: "ra-4-1-fixing-water-and-sanitation",
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
    articleSlug: "ra-4-1-fixing-water-and-sanitation",
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
    articleSlug: "ra-4-1-fixing-water-and-sanitation",
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
    articleSlug: "ra-4-1-fixing-water-and-sanitation",
  },
  {
    id: "2D.5",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Water and Sanitation Reform",
    title: "Regulatory Enforcement",
    description:
      "Strengthen the Department of Water and Sanitation's (DWS) regulatory capacity to enforce Blue Drop/Green Drop recommendations. Create automatic consequences for municipalities failing quality standards. Establish mandatory intervention protocols for critical failures.",
    scope: ["national"],
    articleSlug: "ra-4-1-fixing-water-and-sanitation",
  },
  {
    id: "2D.6",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Water and Sanitation Reform",
    title: "Independent Water Services Economic Regulator",
    description:
      "Establish an independent economic regulator for water services through Section 76 amendment to the Water Services Act, separating economic regulation from the Department of Water and Sanitation's policy and operational mandate. Mirrors the NERSA model for electricity and removes the structural conflict in which the same department sets policy, operates infrastructure, and regulates compliance.",
    legislative: "Amendments to Water Services Act, 1997",
    scope: ["national"],
    articleSlug: "ra-5-1-constitutional-vs-legislative",
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
    articleSlug: "ra-4-2-fixing-electricity",
  },
  {
    id: "2E.2",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Electricity Reform",
    title: "IPP Procurement Authority",
    description:
      "Empower municipalities to procure from independent power producers (IPPs) directly, leveraging the Electricity Regulation Amendment Act (2024). Establish tariff-setting authority within the National Energy Regulator of South Africa (NERSA) framework with clearer municipal autonomy (i.e., the pathway Cape Town has been pursuing for utility-scale renewable procurement).",
    scope: ["national", "municipal"],
    articleSlug: "ra-4-2-fixing-electricity",
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
    articleSlug: "ra-4-2-fixing-electricity",
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
    articleSlug: "ra-4-2-fixing-electricity",
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
    articleSlug: "ra-4-2-fixing-electricity",
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
    articleSlug: "ra-4-3-fixing-waste-and-roads",
  },
  {
    id: "2F.2",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Waste Management and Roads",
    title: "Revenue Ring-Fencing",
    description: "Ring-fence waste revenue for waste operations.",
    scope: ["municipal"],
    articleSlug: "ra-4-3-fixing-waste-and-roads",
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
    articleSlug: "ra-4-3-fixing-waste-and-roads",
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
    articleSlug: "ra-4-3-fixing-waste-and-roads",
  },
  {
    id: "2J.1",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Anti-Capture Architecture",
    title: "Independent Appointment Verification",
    description:
      "No appointment to a prescribed senior technical post (municipal manager, CFO, head of infrastructure, head of supply chain) may be finalised until an independent professional body certifies that the candidate meets the prescribed minimum qualifications and experience requirements. Defends Vector 1 (political capture) by closing the gap between Municipal Systems Act competency rules and their non-enforcement.",
    legislative: "Amendments to Municipal Systems Act and Public Service Act",
    scope: ["national", "provincial", "municipal"],
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    id: "2J.2",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Anti-Capture Architecture",
    title: "Beneficial Ownership Disclosure at Tender Submission",
    description:
      "Every company bidding for government work must disclose its full beneficial ownership chain at the point of tender submission, verified against the CIPC beneficial ownership register and cross-referenced against the database of restricted suppliers. Defends Vector 2 (commercial capture) by eliminating the opacity that allows captured procurement to operate within formal compliance.",
    legislative: "Amendments to Public Procurement framework; integration with Companies Act, 2008",
    scope: ["national", "provincial", "municipal"],
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    id: "2J.3",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Anti-Capture Architecture",
    title: "National E-Procurement Platform with Open Contracting",
    description:
      "Mandatory transactional e-procurement platform — modelled on KONEPS (South Korea), ChileCompra (Chile), and ProZorro (Ukraine) — with automated price benchmarking, anomaly flagging, and publication of all procurement data in the Open Contracting Data Standard format. Replaces the current eTender portal's advertisement-only function with a full transactional platform that generates the data needed to detect collusion and commercial capture in real time.",
    legislative: "Public Procurement Bill / regulations under PFMA and MFMA",
    scope: ["national", "provincial", "municipal"],
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    id: "2J.4",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Anti-Capture Architecture",
    title: "Cooling-Off Periods (Revolving Door)",
    description:
      "Senior officials of regulated entities prohibited from taking positions at the regulator (and vice versa) for a prescribed period of two to five years, with disclosure requirements and penalties for non-compliance. Defends Vector 4 (regulatory capture) by reducing the incentive effects of the revolving door between regulators and regulated industries.",
    legislative: "New Regulator Independence Act or amendments to sector regulator statutes",
    scope: ["national"],
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    id: "2J.5",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Anti-Capture Architecture",
    title: "Whistleblower Protection Strengthening",
    description:
      "Strengthen the Protected Disclosures Act with anonymous reporting channels, independent investigation of disclosures, identity protection, and meaningful consequences for retaliation. Combines legal protection with institutional mechanisms that make it safe to report — addressing the practical reality that whistleblowers in South Africa frequently face dismissal, harassment, and physical threats.",
    legislative: "Amendments to Protected Disclosures Act, 2000",
    scope: ["national"],
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    id: "2J.6",
    workstream: "reform-agenda",
    phase: "phase-2",
    subgroup: "Anti-Capture Architecture",
    title: "Automated Data Pipelines (Bypass Management Filtering)",
    description:
      "Institutional information systems configured to transmit operational data automatically and directly to oversight platforms — financial system data to Treasury and council dashboards, healthcare stock data to district and provincial dashboards, water quality data to DWS — without the data passing through a management review and filtering process. Defends Vector 5 (information capture) by eliminating the ability of captured management to control what reaches oversight bodies.",
    legislative: "Regulatory; mSCOA, DHIS, and sector reporting standards",
    scope: ["national", "provincial", "municipal"],
    articleSlug: "ra-5-2-anti-capture-architecture",
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
    articleSlug: "ra-4-4-building-municipal-capability",
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
    articleSlug: "ra-4-4-building-municipal-capability",
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
    articleSlug: "ra-4-4-building-municipal-capability",
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
    articleSlug: "ra-3-1-provincial-performance-crisis",
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
    articleSlug: "ra-5-1-constitutional-vs-legislative",
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
    articleSlug: "ra-5-1-constitutional-vs-legislative",
  },
  {
    id: "2I.1",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Programme Architecture and Coordination",
    title: "Statutory Reform Coordination Office",
    description:
      "Establish a statutory Reform Coordination Office — building on and formalising the Operation Vulindlela model — with a legislated mandate, guaranteed budget, and defined authority. Located in the Presidency with joint reporting to National Treasury. Functions: legislative coordination of function-specific amendment bills, implementation tracking against milestones, cross-cutting problem resolution, and stakeholder coordination. The critical difference from Vulindlela is statutory authority — a future president would need to amend or repeal the Act through Parliament, not simply redirect executive attention.",
    legislative: "New Governance Reform Programme Act",
    scope: ["national"],
    articleSlug: "ra-5-3-the-integrated-reform-programme",
  },
  {
    id: "2I.2",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Programme Architecture and Coordination",
    title: "Protected Technical Appointments Framework",
    description:
      "Legislate a framework for protected technical appointments — prescribed posts in provincial departments and municipalities filled through merit-based processes with defined professional qualifications, from which incumbents cannot be removed except through prescribed disciplinary procedures. Covers: chief engineers, process controllers, town planners, CFOs (extending existing MFMA protection), heads of water and electricity services, district health managers, and school subject advisors.",
    legislative: "Component of Governance Reform Programme Act",
    scope: ["national", "provincial", "municipal"],
    articleSlug: "ra-5-3-the-integrated-reform-programme",
    dependsOn: ["2J.1"],
  },
  {
    id: "2I.3",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Programme Architecture and Coordination",
    title: "Automatic Enforcement Architecture",
    description:
      "Replace the discretionary Section 100 / Section 139 intervention models with a rules-based enforcement architecture. For each covered function: minister-defined performance thresholds gazetted and updated; a graduated response protocol that activates automatically (Tier 1 technical support, Tier 2 joint management, Tier 3 temporary administration); binding exit criteria preventing premature return to autonomy; and quarterly publication of every institution's enforcement status on the public dashboard.",
    legislative: "Component of Governance Reform Programme Act",
    scope: ["national", "provincial", "municipal"],
    articleSlug: "ra-5-3-the-integrated-reform-programme",
  },
  {
    id: "2I.4",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Programme Architecture and Coordination",
    title: "Coherence Assessment and Annual Parliamentary Report",
    description:
      "Annual report tabled in Parliament covering performance data, enforcement actions and outcomes, legislative progress, capability indicators for protected appointments, and a dedicated coherence assessment that applies the RAARICLE™ framework to the reform programme itself — testing whether components are interacting as designed or producing unintended consequences. Subject to debate in both the National Assembly and the NCOP.",
    legislative: "Component of Governance Reform Programme Act",
    scope: ["national"],
    articleSlug: "ra-5-3-the-integrated-reform-programme",
    dependsOn: ["2I.1"],
  },
  {
    id: "2I.5",
    workstream: "reform-agenda",
    phase: "phase-3",
    subgroup: "Programme Architecture and Coordination",
    title: "Cycle Management Mandate (Phase 4 Evolution)",
    description:
      "After Year 5, Parliament reviews and amends the Reform Coordination Office's mandate — expanding its statutory functions from reform coordination to ongoing cycle management. The Office becomes the permanent institution responsible for monitoring and managing the reinforcing cycle across safety, growth, and development, with reporting obligations expanding to include the Reinforcing Cycle Scorecard alongside RAARICLE™ compliance and function-specific performance data.",
    legislative: "Amendments to Governance Reform Programme Act",
    scope: ["national"],
    articleSlug: "ra-5-3-the-integrated-reform-programme",
    dependsOn: ["2I.1", "2I.4"],
  },

  // ── Economic Growth: Phase 1 ──
  {
    id: "3A.1",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "MSME Ecosystem Restructuring",
    title: "Demand-Driven Support Integration",
    description:
      "Integrate fragmented Micro, Small and Medium Enterprise (MSME) support agencies — i.e., the Small Enterprise Development Agency (SEDA), Small Enterprise Finance Agency (SEFA), the Department of Trade, Industry and Competition (the dtic), National Empowerment Fund (NEF), and Industrial Development Corporation (IDC) — into a single demand-responsive system. Shift from supply-driven to demand-driven support model — structured around what businesses actually need, not what agencies supply.",
    articleSlug: "eg-3-1-three-engines-of-growth",
  },
  {
    id: "3A.2",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "MSME Ecosystem Restructuring",
    title: "Regulatory Simplification",
    description:
      "Reduce compliance burden on small firms. Streamline business registration and licensing (target: 48 hours). Create simplified compliance pathways for businesses under defined revenue thresholds.",
    articleSlug: "eg-3-2-the-execution-machine",
  },
  {
    id: "3A.3",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "MSME Ecosystem Restructuring",
    title: "Digital Financial Inclusion",
    description:
      "Extend bank account access and payment systems to informal businesses. Support mobile money for unbanked MSME populations. Create digital financial inclusion infrastructure.",
    articleSlug: "eg-3-1-three-engines-of-growth",
  },
  {
    id: "3B.1",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "Credit and Financing Architecture",
    title: "Small Business Guarantee Fund",
    description:
      "Establish a South African Small Business Guarantee Fund modelled on the US Small Business Administration's (SBA) 7(a) programme. Commercial banks provide credit; government guarantees 75–85% of default risk. Enables lending to early-stage ventures without government doing direct lending.",
    articleSlug: "eg-3-1-three-engines-of-growth",
  },
  {
    id: "3B.2",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "Credit and Financing Architecture",
    title: "Alternative Financing Mechanisms",
    description:
      "Expand supply chain financing, invoice discounting and factoring, microfinance, and peer-to-peer lending platforms.",
    articleSlug: "eg-3-1-three-engines-of-growth",
  },
  {
    id: "3B.3",
    workstream: "economic-growth",
    phase: "phase-1",
    subgroup: "Credit and Financing Architecture",
    title: "Venture Capital Mobilisation",
    description:
      "Establish tax incentives for angel investment and venture capital funds. Create venture capital matching funds (private + government). Support secondary market development for early-stage equity.",
    articleSlug: "eg-3-1-three-engines-of-growth",
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
    articleSlug: "eg-3-1-three-engines-of-growth",
  },
  {
    id: "3C.2",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "New Venture Creation",
    title: "Township and Rural Enterprise",
    description:
      "Targeted programmes for township and rural enterprise development with adapted financing, mentoring, and market access support.",
    articleSlug: "eg-3-1-three-engines-of-growth",
  },
  {
    id: "3D.1",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Export Diversification",
    title: "Platinum Cluster",
    description:
      "Catalytic converters, fuel cell components, emission control systems — leveraging existing platinum group metals (PGM) processing capabilities into higher-value manufactured products (i.e., moving beyond exporting raw platinum concentrate toward finished autocatalysts).",
    articleSlug: "eg-2-1-resource-optimisation",
  },
  {
    id: "3D.2",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Export Diversification",
    title: "Automotive Cluster",
    description:
      "High-value components, aerospace components, rail rolling stock — building on Automotive Production and Development Programme (APDP) incentives and existing automotive manufacturing base (i.e., extending the East London and Gqeberha assembly-plant ecosystem into higher-complexity component export).",
    articleSlug: "eg-2-1-resource-optimisation",
  },
  {
    id: "3D.3",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Export Diversification",
    title: "Agricultural Cluster",
    description:
      "Essential oils, fruit-based beverages, processed foods, botanical extracts — moving up the value chain from raw agricultural commodity exports.",
    articleSlug: "eg-2-1-resource-optimisation",
  },
  {
    id: "3D.4",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Export Diversification",
    title: "Services Cluster",
    description:
      "Fintech, insurtech, mining services consulting, edtech — leveraging South Africa's advanced financial sector and mining expertise into exportable services.",
    articleSlug: "eg-2-1-resource-optimisation",
  },
  {
    id: "3E.1",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Trade and Market Access",
    title: "Trade Agreement Optimisation",
    description:
      "Leverage existing agreements (APDP for automotive, agricultural trade agreements). Negotiate new agreements prioritising high-complexity product categories.",
    articleSlug: "eg-3-2-the-execution-machine",
  },
  {
    id: "3E.2",
    workstream: "economic-growth",
    phase: "phase-2",
    subgroup: "Trade and Market Access",
    title: "AfCFTA Positioning",
    description:
      "Position South Africa as a services and manufacturing hub within the African Continental Free Trade Area.",
    articleSlug: "eg-3-2-the-execution-machine",
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
    articleSlug: "eg-4-1-the-municipal-performance-index",
  },
  {
    id: "3F.2",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Metro-Level Economic Development",
    title: "Metro Growth Compacts",
    description:
      "Create binding growth compacts between national government and metropolitan municipalities with defined targets, incentives, and consequences.",
    articleSlug: "eg-4-2-the-metro-rankings",
  },
  {
    id: "3G.1",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Institutional Quality for Growth",
    title: "Regulatory Quality",
    description:
      "Reduce regulatory complexity and improve policy predictability. Create regulatory impact assessments for all new business-affecting legislation.",
    articleSlug: "eg-3-2-the-execution-machine",
  },
  {
    id: "3G.2",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Institutional Quality for Growth",
    title: "Competition and Market Access",
    description:
      "Strengthen competition enforcement to reduce concentration and enable MSME market entry. Address barriers to entry in concentrated sectors.",
    articleSlug: "eg-3-2-the-execution-machine",
  },
  {
    id: "3G.3",
    workstream: "economic-growth",
    phase: "phase-3",
    subgroup: "Institutional Quality for Growth",
    title: "Political Economy Management",
    description:
      "Address rent-seeking and patronage networks that distort resource allocation. Build coalitions for reform by demonstrating growth dividends.",
    articleSlug: "eg-5-1-the-political-economy-of-growth",
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
    articleSlug: "hd-2-3-the-fiscal-arithmetic-of-health",
  },
  {
    id: "4A.2",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "Substance Abuse Treatment",
    description:
      "Expand evidence-based substance abuse treatment capacity at community level.",
    articleSlug: "hd-2-1-the-life-expectancy-deficit",
  },
  {
    id: "4A.3",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "Mental Health Services",
    description:
      "Expand psychiatric and psychological services, implement universal screening.",
    articleSlug: "hd-2-1-the-life-expectancy-deficit",
  },
  {
    id: "4A.4",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "GBV Prevention and Response",
    description:
      "Implement comprehensive gender-based violence (GBV) prevention programmes and strengthen response systems (i.e., scaling Thuthuzela Care Centres as the integrated one-stop response model).",
    articleSlug: "hd-2-2-violence-as-public-health-crisis",
  },
  {
    id: "4A.5",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Health System Strengthening",
    title: "Maternal and Child Health",
    description:
      "Strengthen antenatal care, nutrition programmes, and early childhood health interventions to break intergenerational disadvantage.",
    articleSlug: "hd-2-1-the-life-expectancy-deficit",
  },
  {
    id: "4B.1",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Education Quality",
    title: "Teacher Development",
    description:
      "Professional development and support programmes focused on content knowledge and pedagogical skills — addressing the finding that many teachers cannot pass the assessments they set for their students.",
    articleSlug: "hd-3-1-the-schooling-paradox",
  },
  {
    id: "4B.2",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Education Quality",
    title: "Early Childhood Development",
    description:
      "Expand access to quality early childhood development (ECD) programmes, recognising that the reinforcing cycle begins before formal schooling.",
    articleSlug: "hd-3-1-the-schooling-paradox",
  },
  {
    id: "4B.3",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Education Quality",
    title: "School Safety",
    description:
      "Address the 'learning in a war zone' crisis — schools in communities with high violence require specific safety interventions to enable learning.",
    articleSlug: "hd-3-2-learning-in-a-war-zone",
  },
  {
    id: "4B.4",
    workstream: "human-development",
    phase: "phase-1",
    subgroup: "Education Quality",
    title: "Learning Infrastructure",
    description:
      "Provide essential learning infrastructure: libraries, laboratories, connectivity, and learning materials.",
    articleSlug: "hd-3-1-the-schooling-paradox",
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
    articleSlug: "hd-3-3-from-classroom-to-paycheck",
  },
  {
    id: "4C.2",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Education-to-Employment Pipeline",
    title: "Work-Seeking Support",
    description:
      "Structured support for work-seeking including job placement, career guidance, and labour market information.",
    articleSlug: "hd-3-3-from-classroom-to-paycheck",
  },
  {
    id: "4C.3",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Education-to-Employment Pipeline",
    title: "Youth Employment Programmes",
    description:
      "Targeted programmes addressing the youth unemployment crisis through work experience, apprenticeships, and entrepreneur support.",
    articleSlug: "hd-3-3-from-classroom-to-paycheck",
  },
  {
    id: "4D.1",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Social Protection",
    title: "Grant System Optimisation",
    description:
      "Ensure social grants effectively support human development outcomes rather than merely providing income transfers.",
    articleSlug: "hd-4-2-south-africas-broken-cycle",
  },
  {
    id: "4D.2",
    workstream: "human-development",
    phase: "phase-2",
    subgroup: "Social Protection",
    title: "Nutrition Security",
    description:
      "Address food insecurity as a binding constraint on health and educational outcomes, particularly for children.",
    articleSlug: "hd-4-2-south-africas-broken-cycle",
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
    articleSlug: "hd-5-1-your-development-rights",
  },
  {
    id: "4E.2",
    workstream: "human-development",
    phase: "phase-3",
    subgroup: "Development Within Constitutional Limits",
    title: "Community-Led Development",
    description:
      "Enable community-led development initiatives that complement institutional reforms.",
    articleSlug: "hd-5-2-building-the-cycle",
  },
  {
    id: "4E.3",
    workstream: "human-development",
    phase: "phase-3",
    subgroup: "Development Within Constitutional Limits",
    title: "Outcome Measurement",
    description:
      "Establish a Human Development Scorecard moving beyond GDP to measure health, education, and opportunity outcomes at district level.",
    articleSlug: "hd-1-2-south-africas-report-card",
  },
];

// ── Legislative Programme ────────────────────────────────────

export const legislativeItems: LegislativeItem[] = [
  // New statutes
  { id: "L.1", name: "Investigating Magistracy Act", type: "new", workstream: "safety-security", phase: "phase-1", articleSlug: "ss-3-2-independent-investigating-magistracy" },
  { id: "L.2", name: "Sentencing Reform Act", type: "new", workstream: "safety-security", phase: "phase-2", articleSlug: "ss-3-4-sentencing-commission-and-structured-guidelines" },
  { id: "L.3", name: "Small Business Guarantee Fund Act", type: "new", workstream: "economic-growth", phase: "phase-1", articleSlug: "eg-3-1-three-engines-of-growth" },
  // Amendments
  { id: "L.4", name: "Criminal Procedure Act, 1977", type: "amendment", workstream: "safety-security", phase: "phase-1", articleSlug: "ss-2-1-the-broken-pipeline" },
  { id: "L.5", name: "National Prosecuting Authority Act, 1998", type: "amendment", workstream: "safety-security", phase: "phase-1", articleSlug: "ss-2-3-justice-delayed-rights-denied" },
  { id: "L.6", name: "South African Police Service Act, 1995", type: "amendment", workstream: "safety-security", phase: "phase-1", articleSlug: "ss-3-1-three-tier-policing-architecture" },
  { id: "L.7", name: "Magistrates' Courts Act, 1944", type: "amendment", workstream: "safety-security", phase: "phase-2", articleSlug: "ss-3-3-community-courts-and-restorative-justice" },
  { id: "L.8", name: "Correctional Services Act, 1998", type: "amendment", workstream: "safety-security", phase: "phase-3", articleSlug: "ss-3-5-rehabilitation-as-constitutional-mandate" },
  { id: "L.9", name: "Private Security Industry Regulation Act, 2001", type: "amendment", workstream: "safety-security", phase: "phase-2", articleSlug: "ss-2-5-the-private-security-paradox" },
  { id: "L.10", name: "Housing Act", type: "amendment", workstream: "reform-agenda", phase: "phase-1", articleSlug: "ra-2-3-fixing-human-settlements" },
  { id: "L.11", name: "Water Services Act", type: "amendment", workstream: "reform-agenda", phase: "phase-2", articleSlug: "ra-4-1-fixing-water-and-sanitation" },
  { id: "L.12", name: "Municipal Finance Management Act", type: "amendment", workstream: "reform-agenda", phase: "phase-2", articleSlug: "ra-4-4-building-municipal-capability" },
  { id: "L.13", name: "Electricity Regulation Amendment Act, 2024", type: "amendment", workstream: "reform-agenda", phase: "phase-2", articleSlug: "ra-4-2-fixing-electricity" },
  { id: "L.15", name: "Governance Reform Programme Act", type: "new", workstream: "reform-agenda", phase: "phase-3", articleSlug: "ra-5-3-the-integrated-reform-programme" },
  { id: "L.16", name: "Public Procurement Bill (Open Contracting & Beneficial Ownership)", type: "new", workstream: "reform-agenda", phase: "phase-2", articleSlug: "ra-5-2-anti-capture-architecture" },
  { id: "L.17", name: "Water Services Act, 1997 (Independent Economic Regulator)", type: "amendment", workstream: "reform-agenda", phase: "phase-2", articleSlug: "ra-5-1-constitutional-vs-legislative" },
  { id: "L.18", name: "Protected Disclosures Act, 2000 (Whistleblower Strengthening)", type: "amendment", workstream: "reform-agenda", phase: "phase-2", articleSlug: "ra-5-2-anti-capture-architecture" },
  // Constitutional
  { id: "L.14", name: "Schedule 4 concurrent function clarity", type: "constitutional", workstream: "reform-agenda", phase: "phase-3", articleSlug: "ra-5-1-constitutional-vs-legislative" },
];

// ── Milestones ───────────────────────────────────────────────

export const milestones: Milestone[] = [
  {
    period: "Year 1",
    label: "Quick Wins",
    items: [
      { text: "Case-flow triage system design and pilot", workstream: "safety-security" },
      { text: "MSME ecosystem integration audit", workstream: "economic-growth" },
      { text: "RAARICLE™ diagnostic assessments across concurrent functions", workstream: "reform-agenda" },
      { text: "Revenue ring-fencing legislation drafted", workstream: "reform-agenda" },
      { text: "Integrated Governance Performance Platform (IGPP) live, aggregating AGSA, Treasury, DPME data", workstream: "reform-agenda" },
      { text: "MFMA regulations mandating ring-fenced revenue for municipal trading services", workstream: "reform-agenda" },
      { text: "Conditional grants shifted from input-based to outcome-based via DORA", workstream: "reform-agenda" },
      { text: "Teacher development programme launch", workstream: "human-development" },
      { text: "District-level human development baseline", workstream: "human-development" },
      { text: "Business registration simplification (48-hour target)", workstream: "economic-growth" },
      { text: "Title deed backlog task team established", workstream: "reform-agenda" },
    ],
  },
  {
    period: "Year 5",
    label: "Medium-Term Milestones",
    items: [
      { text: "Investigating Magistracy operational in pilot areas", workstream: "safety-security" },
      { text: "Community courts operational", workstream: "safety-security" },
      { text: "Three-tier policing piloted in 2–3 provinces", workstream: "safety-security" },
      { text: "WSA/WSP separation implemented", workstream: "reform-agenda" },
      { text: "Statutory Reform Coordination Office operational with legislated mandate", workstream: "reform-agenda" },
      { text: "Governance Reform Programme Act passed; coordinated function-specific bills introduced", workstream: "reform-agenda" },
      { text: "National e-procurement platform live with Open Contracting Data Standard publication", workstream: "reform-agenda" },
      { text: "Small Business Guarantee Fund lending at scale", workstream: "economic-growth" },
      { text: "First export cluster products entering international markets", workstream: "economic-growth" },
      { text: "Reinforcing cycle measurable in bundled intervention districts", workstream: "human-development" },
      { text: "Revenue ring-fencing in effect for water and electricity", workstream: "reform-agenda" },
    ],
  },
  {
    period: "Year 10",
    label: "Long-Term Outcomes",
    items: [
      { text: "Nationwide three-tier policing operational", workstream: "safety-security" },
      { text: "Rehabilitation-centred corrections system functional", workstream: "safety-security" },
      { text: "Integrated Criminal Justice Information System fully deployed", workstream: "safety-security" },
      { text: "Municipal service delivery structurally reformed", workstream: "reform-agenda" },
      { text: "Reform Coordination Office mandate expanded to permanent cycle management (Phase 4)", workstream: "reform-agenda" },
      { text: "Reinforcing Cycle Scorecard published annually as part of parliamentary report", workstream: "reform-agenda" },
      { text: "Diversified export base reducing commodity dependence", workstream: "economic-growth" },
      { text: "Self-sustaining venture ecosystems", workstream: "economic-growth" },
      { text: "Measurable intergenerational human development gains", workstream: "human-development" },
      { text: "All 13 Law and Order Scorecard outcomes tracked quarterly", workstream: "safety-security" },
    ],
  },
];

// ── Cross-Cutting ────────────────────────────────────────────

export const digitalInfrastructure: CrossCuttingDigital[] = [
  { id: "CC.1", initiative: "Integrated Criminal Justice Information System (ICJS)", workstreams: "Citizen Safety and Security" },
  { id: "CC.2", initiative: "Unified Housing Demand Database", workstreams: "Reform Agenda" },
  { id: "CC.3", initiative: "Real-Time Education Data Systems", workstreams: "Reform Agenda, Human Development" },
  { id: "CC.4", initiative: "Digital Financial Inclusion Infrastructure", workstreams: "Economic Growth" },
  { id: "CC.5", initiative: "Municipal Service Performance Dashboards", workstreams: "Reform Agenda" },
  { id: "CC.6", initiative: "Integrated Governance Performance Platform (IGPP)", workstreams: "Reform Agenda (cross-pillar — aggregates AGSA, Treasury, DPME, sector data)" },
  { id: "CC.7", initiative: "National E-Procurement Platform (Open Contracting Data Standard)", workstreams: "Reform Agenda, Economic Growth" },
];

export const structuralPrinciples: StructuralPrinciple[] = [
  { title: "Separation of Regulator from Provider", description: "The entity that sets standards and monitors compliance must be independent from the entity that delivers the service. Combining both roles creates a conflict of interest where providers effectively regulate themselves.", examples: "Water (Water Services Authority vs. Provider, WSA/WSP), Electricity (municipality vs. independent power producer, IPP), Healthcare (regulator vs. facility), Policing (oversight vs. operational)" },
  { title: "Revenue Ring-Fencing", description: "Revenue collected for a specific service must be spent on that service. When funds are pooled into general municipal budgets, essential infrastructure maintenance is raided to cover unrelated expenditure.", examples: "Water revenue for water, electricity revenue for electricity, healthcare funding for healthcare" },
  { title: "Consolidation of End-to-End Responsibility", description: "A single entity must own the full delivery chain for a given outcome. When responsibility is fragmented across multiple departments or spheres of government, no one is accountable when the system fails.", examples: "Housing, education, healthcare, criminal justice pipeline" },
  { title: "Automatic Enforcement Triggers", description: "Intervention mechanisms must activate automatically when defined thresholds are breached. Relying on political discretion to trigger intervention means failing institutions are left to deteriorate until crises force action.", examples: "Provincial intervention thresholds, municipal service failure protocols, court case-flow time limits" },
  { title: "Performance-Based Accountability", description: "Every institution must be measured against clear, published performance standards with real consequences for sustained failure. Without transparent metrics and enforced accountability, underperformance becomes entrenched.", examples: "Scorecards, rankings, and consequences at every level" },
  { title: "Structured Autonomy", description: "The entity closest to delivery holds operational authority, within outcome standards set by the entity with the broader mandate, with automatic enforcement when outcomes fall short. Legislated as a binding design standard for all concurrent functions: every institutional arrangement must pass the structured autonomy test or fail it.", examples: "Provincial education delivery within national outcome standards; municipal water provision within DWS quality regulation; district PHC operations within provincial oversight" },
];

// ── RAARICLE™ Framework ───────────────────────────────────────

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
  { name: "Fragmentation", description: "Responsibility scattered across multiple entities (housing, education, healthcare)", articleSlug: "ra-1-2-why-institutions-fail" },
  { name: "Misalignment", description: "Wrong entity holds the wrong governance element (education authority at wrong level)", articleSlug: "ra-2-1-fixing-basic-education" },
  { name: "Absence", description: "Critical RAARICLE™ element does not exist (no enforcement triggers)", articleSlug: "ra-3-3-when-provinces-fail" },
  { name: "Conflation", description: "Incompatible functions combined in same entity (WSA = WSP, regulator = provider)", articleSlug: "ra-4-1-fixing-water-and-sanitation" },
  { name: "Inversion", description: "Wrong entity makes the decision (national deciding provincial operational matters)", articleSlug: "ra-3-2-making-concurrent-functions-work" },
];

// ── Scorecard ────────────────────────────────────────────────

export const scorecardOutcomes: Record<WorkstreamId, ScorecardOutcome[]> = {
  "safety-security": [
    { outcome: "Crime Suppression and Deterrence" },
    { outcome: "Detection and Rapid Response" },
    { outcome: "Investigation Quality" },
    { outcome: "Lawful Arrest and Secure Pre-Trial Custody" },
    { outcome: "Intelligence Production and Threat Assessment" },
    { outcome: "Public Order and Stability Management" },
    { outcome: "Prosecutorial Effectiveness and Case Conversion" },
    { outcome: "Judicial Efficiency and Access to Justice" },
    { outcome: "Sentencing Integrity and Proportionality" },
    { outcome: "Secure and Humane Incarceration" },
    { outcome: "Rehabilitation and Skills Development" },
    { outcome: "Reintegration and Recidivism Reduction" },
    { outcome: "Victim Justice, Reparation, and Restoration" },
  ],
  "reform-agenda": [
    { outcome: "Audit Outcome Improvement Across Municipalities" },
    { outcome: "Irregular Expenditure Reduction" },
    { outcome: "Revenue Collection Rates at Municipal Level" },
    { outcome: "Public Service Vacancy Rate Reduction" },
    { outcome: "Citizen Satisfaction With Government Services" },
    { outcome: "Transparency and Open Data Publication Compliance" },
    { outcome: "Anti-Corruption Case Finalisation Rate" },
    { outcome: "Intergovernmental Dispute Resolution Timeliness" },
    { outcome: "SOE Financial Sustainability and Governance Scores" },
    { outcome: "Electoral and Political Party Funding Transparency" },
    { outcome: "Legislative Turnaround Time for Priority Bills" },
    { outcome: "Public Participation Rate in Governance Processes" },
  ],
  "economic-growth": [
    { outcome: "GDP Growth Rate (Real, Annual)" },
    { outcome: "Fixed Investment as Percentage of GDP" },
    { outcome: "Ease of Doing Business Ranking Improvement" },
    { outcome: "Formal Employment Creation (Net New Jobs Per Quarter)" },
    { outcome: "SMME Registration and Survival Rates" },
    { outcome: "Energy Availability Factor (Eskom and IPPs)" },
    { outcome: "Logistics Performance and Port Efficiency" },
    { outcome: "Broadband Penetration and Digital Access" },
    { outcome: "Export Diversification Index" },
    { outcome: "Youth Unemployment Rate Reduction" },
    { outcome: "Special Economic Zone Investment and Job Outputs" },
    { outcome: "Private Sector Confidence Index" },
  ],
  "human-development": [
    { outcome: "Life Expectancy at Birth" },
    { outcome: "Under-Five Mortality Rate" },
    { outcome: "Maternal Mortality Ratio" },
    { outcome: "HIV Treatment Cascade Completion Rate" },
    { outcome: "TB Case Detection and Treatment Success Rate" },
    { outcome: "Grade 4 Reading Proficiency Rate" },
    { outcome: "Matric Pass Rate and Bachelor Eligibility Rate" },
    { outcome: "NEET Rate (Youth Not in Education, Employment, or Training)" },
    { outcome: "Stunting Prevalence in Children Under Five" },
    { outcome: "Early Childhood Development Programme Enrolment" },
    { outcome: "TVET and Artisan Qualification Completion Rates" },
    { outcome: "Access to Clean Water and Sanitation" },
    { outcome: "Social Grant Reach and Adequacy" },
  ],
};

// ── Capture Vectors (Anti-Capture Architecture) ──────────────

export const captureVectors: CaptureVector[] = [
  {
    number: 1,
    name: "Political Capture",
    description:
      "Political authority over technical appointments and pricing decisions is exercised to install loyalists, displace technical professionals, and suppress tariffs to below cost-recovery levels — destroying institutional capability and financial sustainability.",
    defences:
      "Independent appointment verification; protected tenure for technical staff; separation of tariff-setting from the political cycle; independent boards for service entities; transparency of all appointments and tariff decisions.",
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    number: 2,
    name: "Commercial Capture",
    description:
      "Public procurement is redirected to serve private interests through bid rigging, specification manipulation, emergency procurement bypasses, contract variations, and beneficial-ownership opacity. Most damaging forms operate within the formal rules.",
    defences:
      "E-procurement with automated price benchmarking; Open Contracting Data Standard publication; mandatory beneficial-ownership disclosure at tender; automatic flagging of procurement anomalies; contract management and payment verification.",
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    number: 3,
    name: "Labour Capture",
    description:
      "Organised labour's institutional power is redirected from protecting workers' legitimate interests to protecting arrangements that serve union leadership and connected members at the expense of service delivery — through resistance to performance management, bloated non-technical headcount, and procedural complexity that defeats discipline.",
    defences:
      "Outcome-based performance contracts for senior officials; right-sizing linked to service delivery benchmarks; separation of national salary bargaining from operational conditions; transparent staffing data; streamlined disciplinary processes with time limits.",
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    number: 4,
    name: "Regulatory Capture",
    description:
      "A regulator established to oversee an industry instead operates in the regulated entity's interest — through the revolving door, information asymmetry, and political pressure. NERSA's tariff record and DWS's Blue Drop / Green Drop suspension are South African examples.",
    defences:
      "Automatic enforcement triggers tied to published performance data; cooling-off periods for regulator/industry movement; separate regulator funding (industry levies); mandatory publication of all regulatory decisions and underlying data; independent technical capacity inside the regulator.",
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
  {
    number: 5,
    name: "Information Capture",
    description:
      "Senior management controls what information reaches oversight bodies — through filtered reports, delayed reporting, and narrative management. The gap between management reports and AGSA findings is the most systematic evidence in South Africa.",
    defences:
      "Automated data pipelines that bypass management; mandatory real-time publication of key performance indicators; direct data access for oversight bodies; independent verification of service delivery data; whistleblower protection with anonymous reporting and consequences for retaliation.",
    articleSlug: "ra-5-2-anti-capture-architecture",
  },
];

// ── Reinforcing Cycle Scorecard (Phase 4: Cycle Management) ──

export const reinforcingCycleScorecard: CycleScorecardLink[] = [
  {
    id: "safety-growth",
    label: "Link 1: Safety → Growth",
    description:
      "Whether the safety reforms are creating the security conditions that investors, businesses, and infrastructure operators need to commit capital and create employment.",
    indicators: [
      { indicator: "Homicide rate per 100,000", source: "SAPS crime statistics", threshold: "Below 30 (from ~45)" },
      { indicator: "Business crime victimisation rate", source: "Stats SA Victims of Crime Survey", threshold: "Below 10%" },
      { indicator: "Infrastructure theft losses (Eskom, Transnet, Telkom)", source: "SOE annual reports", threshold: "Below R3 billion" },
      { indicator: "FDI inflows as % of GDP", source: "SARB quarterly bulletin", threshold: "Above 2%" },
      { indicator: "Small business formation rate", source: "CIPC registrations / Stats SA QLFS", threshold: "Year-on-year increase" },
    ],
  },
  {
    id: "growth-development",
    label: "Link 2: Growth → Development",
    description:
      "Whether economic growth is generating the fiscal space needed to fund education, health, and social investment in real terms — and whether that funding is reaching the front line rather than being captured by debt service.",
    indicators: [
      { indicator: "Real GDP per capita growth", source: "Stats SA / SARB", threshold: "Above 1.5%" },
      { indicator: "Real per-learner education spending", source: "National Treasury ENE", threshold: "Year-on-year increase" },
      { indicator: "Real per-capita health spending", source: "National Treasury ENE", threshold: "Year-on-year increase" },
      { indicator: "Debt service as % of revenue", source: "National Treasury", threshold: "Below 15%" },
      { indicator: "Expanded unemployment rate", source: "Stats SA QLFS", threshold: "Below 35% (from ~42%)" },
    ],
  },
  {
    id: "development-safety",
    label: "Link 3: Development → Safety",
    description:
      "Whether human development outcomes — learning, employment, health, equality — are producing the capable, employed, healthy population that closes the cycle by reinforcing safety and reducing the conditions that drive crime.",
    indicators: [
      { indicator: "Grade 4 reading proficiency (PIRLS)", source: "DBE / IEA", threshold: "Above 40% (from ~19%)" },
      { indicator: "Youth unemployment (15–34)", source: "Stats SA QLFS", threshold: "Below 45% (from ~60%)" },
      { indicator: "Childhood stunting rate", source: "DHS / NDoH", threshold: "Below 20% (from ~27%)" },
      { indicator: "Life expectancy at birth", source: "Stats SA mid-year estimates", threshold: "Above 68 years" },
      { indicator: "IHDI (Inequality-adjusted HDI)", source: "UNDP HDR", threshold: "Above 0.55 (from ~0.468)" },
    ],
  },
];
