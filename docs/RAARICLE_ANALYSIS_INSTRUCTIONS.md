# RAARICLE Governance Analysis Generator

## Instructions for Claude Code

This document provides a reusable methodology for generating governance analyses of South African national, provincial and municipal functions using the RAARICLE framework. It can be used as a prompt template with Claude Code to produce diagnostic reports, reform blueprints and white papers for any public function.

---

## Quick start

```bash
# From your project directory, run:
claude "Using the RAARICLE methodology in RAARICLE_ANALYSIS_INSTRUCTIONS.md, 
        generate a full governance analysis for [FUNCTION NAME] 
        at the [national/provincial/municipal] level. 
        Output a Word document white paper."
```

---

## 1. The RAARICLE framework

RAARICLE is a governance design and diagnostic framework comprising eight mutually exclusive, collectively exhaustive elements. For any public function to succeed, all eight elements must be co-located in a single institutional chain or coherently aligned across institutions with binding coordination mechanisms.

| # | Element         | Core question                                    | Design test                                                                                     |
|---|-----------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------|
| 1 | **Responsibility**  | Who does the work?                               | Can you name one entity that owns the task end-to-end?                                          |
| 2 | **Accountability**  | Who answers for the outcome?                     | Is there one name on the performance contract?                                                  |
| 3 | **Authority**       | Who has the power to decide, act and change?     | Can the entity execute a decision within 30 days using only its own powers?                     |
| 4 | **Resources**       | Who controls the means (budget, people, assets)?  | Does revenue flow directly to the entity without passing through another's accounts?             |
| 5 | **Information**     | Who has visibility into performance?              | Can the entity see real-time performance data for everything it operates?                        |
| 6 | **Capability**      | Are the skills and systems present?               | Does every critical post have a professionally qualified incumbent?                              |
| 7 | **Legitimacy**      | Is the mandate recognised?                        | Does the entity's authority derive from a clear democratic or statutory chain?                    |
| 8 | **Enforcement**     | What are the consequences for failure or success? | Are triggers automatic and consequences pre-defined (not discretionary)?                         |

### Severity rating scale

When diagnosing each element, rate it on a five-point scale:

| Rating | Label              | Meaning                                                                      |
|--------|--------------------|------------------------------------------------------------------------------|
| 1      | Critical failure    | Element is absent or fundamentally broken; systemic collapse evident         |
| 2      | Severe gap          | Element exists on paper but fails in practice; major misalignment            |
| 3      | Moderate tension    | Element partially present but with significant friction or inconsistency     |
| 4      | Functional          | Element is present and largely effective; minor gaps remain                   |
| 5      | Well-aligned        | Element is fully co-located and operating as designed                         |

---

## 2. Scope: South African government functions

### 2.1 Constitutional allocation of functions

South Africa's Constitution allocates functions across three spheres. Use the relevant schedule to identify which sphere(s) are involved.

**Schedule 4 — Concurrent national and provincial competence:**

| Part A (legislative)                        | Part B (local government)                              |
|---------------------------------------------|--------------------------------------------------------|
| Education (all levels)                      | Water and sanitation services                          |
| Health services                             | Electricity and gas reticulation                       |
| Housing                                     | Municipal health services                              |
| Public transport                            | Municipal roads, stormwater                            |
| Environment                                 | Trading regulations, street trading                    |
| Agriculture                                 | Refuse removal, refuse dumps, solid waste              |
| Disaster management                         | Municipal public works                                 |
| Police (oversight)                          | Pontoons, ferries, jetties, piers, harbours            |
| Regional planning and development           | Local tourism, municipal airports                      |
| Urban and rural development                 | Building regulations, facilities for accommodation     |

**Schedule 5 — Exclusive provincial competence:**

| Part A (legislative)                        | Part B (local government)                              |
|---------------------------------------------|--------------------------------------------------------|
| Ambulance services                          | Cemeteries, crematoria, funeral parlours               |
| Libraries (not national)                    | Cleansing, local amenities, public places              |
| Liquor licences                             | Fencing, fences, pounds                                |
| Provincial planning                         | Licensing of dogs, licensing and control of undertakings|
| Provincial roads and traffic                | Local sport facilities, parks, recreation              |
| Veterinary services                         | Markets, municipal abattoirs, noise pollution          |

### 2.2 Priority functions for analysis

The following functions are recommended starting points due to high service delivery impact and known governance fragmentation:

**National/Provincial concurrent:**
- Basic education (curriculum, teacher employment, school infrastructure)
- Primary healthcare (clinics, district health, emergency medical services)
- Human settlements / housing (subsidies, land, construction, title deeds)
- Public transport (buses, rail, minibus taxi regulation)
- Policing and community safety

**Local government:**
- Water and sanitation services
- Electricity reticulation
- Waste management (solid waste, refuse removal)
- Municipal roads and stormwater
- Land use management and spatial planning
- Public transport (municipal level)

---

## 3. Analysis methodology — step by step

For each function you want to analyse, follow these steps in sequence. Each step includes the prompt pattern to use with Claude Code.

### Step 3.1 — Map the institutional landscape

**Objective:** Identify every institution involved in delivering the function, their legal mandate, and their role in the value chain.

**Prompt pattern:**

```
Map the full institutional landscape for [FUNCTION] in South Africa.

For each institution involved, identify:
- Name and sphere of government
- Governing legislation
- Specific role in the value chain (policy, regulation, funding, delivery, oversight)
- Relationship to other institutions in the chain

Present as a value chain diagram showing how the function flows from policy 
to the citizen, noting every handoff point between institutions.

Use web search to find the latest institutional arrangements, 
legislation amendments and reform proposals (2024-2026).
```

**What to look for:**
- How many institutions are involved? (More than three is a fragmentation risk)
- Are there handoff points where one institution depends on another to act?
- Is the same entity both regulator and provider (WSA/WSP conflation pattern)?
- Are concurrent competences creating overlap between national and provincial?

### Step 3.2 — Diagnose each RAARICLE element

**Objective:** For each of the eight elements, assess the current state against the function's institutional landscape.

**Prompt pattern:**

```
Using the RAARICLE framework, diagnose the governance of [FUNCTION] in South Africa.

For each of the eight elements (Responsibility, Accountability, Authority, 
Resources, Information, Capability, Legitimacy, Enforcement):

1. State the core question for this element
2. Identify which institution(s) currently hold this element
3. Assess whether the element is co-located with the other elements 
   or fragmented across institutions
4. Rate the severity (1-5 scale: 1=critical failure, 5=well-aligned)
5. Provide specific evidence from recent reports, audits or assessments 
   (search for Auditor-General reports, departmental annual reports, 
   and sector-specific assessments from 2023-2026)
6. Identify the specific misalignment: what should change?

Present as a structured diagnostic with a current-state vs desired-state 
comparison for each element.
```

**Key evidence sources to search for each function:**

| Function              | Key data sources                                                        |
|-----------------------|-------------------------------------------------------------------------|
| Water services        | Blue/Green/No Drop Reports; DWS Annual Report; AG municipal audit outcomes |
| Education             | Matric results; DBE Annual Survey of Schools; AG Education audit; SACMEQ |
| Healthcare            | District Health Barometer; Ideal Clinic dashboard; AG Health audit       |
| Housing               | DHS delivery statistics; AG Human Settlements audit; Housing backlog data|
| Electricity           | NERSA compliance reports; Eskom distribution data; municipal audit outcomes|
| Waste management      | DEA waste management reports; AG municipal audit; State of Waste report  |
| Public transport      | DoT annual report; PRASA performance data; municipal IDP transport sections|
| Roads                 | SANRAL reports; provincial roads assessments; SAICE Infrastructure Report Card|

### Step 3.3 — Identify the structural root cause

**Objective:** Synthesise the eight-element diagnosis into a clear statement of what is structurally wrong.

**Prompt pattern:**

```
Based on the RAARICLE diagnosis of [FUNCTION], identify the structural root cause 
of governance failure.

Answer these questions:
1. Which elements are most severely misaligned? (Rate all eight, identify the 
   critical failures)
2. Is the root cause primarily:
   a. Fragmentation (too many entities, no end-to-end ownership)?
   b. Misalignment (elements assigned to different spheres)?
   c. Absence (elements missing entirely, e.g. no enforcement)?
   d. Conflation (regulator and provider are the same entity)?
   e. A combination?
3. What is the single most important structural fix that would address 
   the root cause?
4. Does this fix require constitutional amendment, legislative change, 
   or can it be done through regulation/policy?

Be specific. Name the institutions, the legislation, and the exact 
misalignment. Avoid generic recommendations.
```

### Step 3.4 — Design the reform blueprint

**Objective:** Propose a new institutional architecture that co-locates all eight RAARICLE elements.

**Prompt pattern:**

```
Design a RAARICLE-aligned reform blueprint for [FUNCTION] in South Africa.

For each of the eight elements, specify:
1. Current state (from the diagnosis)
2. Proposed design (how this element will work in the reformed architecture)
3. Binding design rule (a testable rule that ensures the element stays aligned)

The blueprint must address:
- Institutional architecture: What entity delivers? What entity regulates? 
  What entity provides democratic oversight?
- The 30-day authority test: Can the delivery entity execute a decision 
  within 30 days using only its own powers?
- Resource ring-fencing: Does revenue flow directly to the delivery entity?
- Information architecture: Is there real-time operational visibility?
- Enforcement triggers: Are consequences automatic and pre-defined?
- Anti-capture protections against five vectors:
  1. Political capture (patronage, cadre deployment, tariff suppression)
  2. Commercial capture (procurement fraud, contractor collusion)
  3. Labour capture (resistance to performance management, bloated headcount)
  4. Regulatory capture (weak enforcement, revolving doors)
  5. Information capture (management filtering data to oversight bodies)

Include an implementation pathway in three phases:
- Phase 1: Legal foundation (what legislation needs to change)
- Phase 2: Pilot (where to start, how to demonstrate results)
- Phase 3: National rollout (how to scale)
```

### Step 3.5 — Generate the output document

**Objective:** Package the analysis into a professional deliverable.

**Prompt pattern for a white paper:**

```
Package the RAARICLE analysis of [FUNCTION] as a reform white paper in .docx format.

Structure:
1. Executive summary (1-2 pages)
2. The problem: current institutional landscape and scale of failure
3. The RAARICLE framework (brief explanation)
4. Current state diagnostic (all eight elements with severity ratings)
5. Structural root cause analysis
6. Reform blueprint (element-by-element design)
7. Anti-capture architecture (five vectors with structural safeguards)
8. Implementation pathway (three phases)
9. Constitutional and legislative requirements
10. Conclusion

Formatting: Professional document with table of contents, headers/footers, 
tables for comparative data, and consistent styling. 
Use the docx skill for generation.
```

**Alternative output formats:**

```
# For a briefing memo (shorter, for executives):
"Package the RAARICLE analysis of [FUNCTION] as a 4-page executive briefing memo. 
 Lead with the problem, the root cause, and the top 3 reform recommendations. 
 Include one summary table showing all eight elements rated 1-5."

# For a presentation deck:
"Package the RAARICLE analysis of [FUNCTION] as a 15-slide PowerPoint presentation. 
 Use the pptx skill. Include: title slide, problem statement, institutional map, 
 RAARICLE diagnostic (one slide per element), reform blueprint overview, 
 anti-capture summary, implementation timeline, and conclusion."

# For a comparative analysis across functions:
"Compare the RAARICLE diagnoses of [FUNCTION A], [FUNCTION B] and [FUNCTION C]. 
 Present as a matrix showing all eight elements rated 1-5 for each function. 
 Identify common structural patterns and cross-cutting reforms."
```

---

## 4. Function-specific guidance

### 4.1 Basic education

**Value chain:** National (DBE: curriculum, policy, funding norms) → Provincial (PED: school management, teacher employment, infrastructure) → District (circuit offices: school support, monitoring) → School (principal, SGB: delivery)

**Known RAARICLE misalignments:**
- **Authority:** Provincial MECs accountable for matric results but cannot determine teacher employment conditions (Employment of Educators Act is national; SACE is national; salary bargaining is at Education Labour Relations Council, national)
- **Resources:** School funding norms set nationally; provincial equitable share not ring-fenced for education; infrastructure grants conditional
- **Capability:** Persistent vacancy of subject advisors and circuit managers in rural districts
- **Enforcement:** Section 100 interventions in provincial education departments (e.g. Limpopo, Eastern Cape) have mixed track records

**Key search terms:** `"DBE annual report" site:education.gov.za`, `"matric results" provincial breakdown`, `"Auditor-General education" 2024 2025`, `"school infrastructure backlog"`

### 4.2 Primary healthcare

**Value chain:** National (NDoH: policy, norms, conditional grants) → Provincial (PHD: hospital and clinic management, staffing, budgets) → District (DHS: PHC delivery, community health workers) → Facility (clinic manager: daily operations)

**Known RAARICLE misalignments:**
- **Responsibility:** PHC delivery assigned to provinces but community health workers managed through different contractual arrangements (some through NPOs, some direct employment)
- **Authority:** Facility managers cannot procure essential medicines independently (provincial pharmaceutical depot controls supply chain)
- **Information:** District Health Information System (DHIS) provides data but often with significant lags; Ideal Clinic monitoring dashboard helps but coverage is incomplete
- **Enforcement:** No automatic consequence for clinics that consistently fail Ideal Clinic standards

**Key search terms:** `"District Health Barometer"`, `"Ideal Clinic" dashboard results`, `"NHI" implementation`, `"Auditor-General health" 2024 2025`

### 4.3 Electricity reticulation

**Value chain:** National (DMRE: policy; NERSA: regulation) → Eskom (generation, transmission, some distribution) → Municipality (reticulation to consumers, billing, maintenance)

**Known RAARICLE misalignments:**
- **Resources:** Municipal electricity surpluses historically cross-subsidise other functions; ring-fencing is voluntary
- **Authority:** Municipalities cannot set tariffs freely (NERSA approves Eskom tariffs; municipal tariffs bounded by guidelines); cannot procure independent power without complex regulatory approvals
- **Capability:** Many municipalities lack qualified electrical engineers; infrastructure maintenance is neglected
- **Enforcement:** Similar pattern to water — non-compliance has no automatic consequences

**Key search terms:** `"NERSA municipal tariff" 2025`, `"electricity distribution" municipal performance`, `"Eskom unbundling"`, `"municipal electricity losses"`

### 4.4 Human settlements / housing

**Value chain:** National (DHS: policy, subsidy framework, conditional grants) → Provincial (PHD: project approval, developer appointment, beneficiary lists) → Municipality (land identification, bulk infrastructure, building plan approval) → Developer/Contractor (construction) → Beneficiary (occupation, title deed)

**Known RAARICLE misalignments:**
- **Responsibility:** Fragmented across at least four entities per project with no single point of end-to-end ownership
- **Authority:** Municipalities identify land but provinces approve projects and appoint developers; municipalities provide bulk infrastructure but provinces fund top structures
- **Information:** Beneficiary lists are notoriously inaccurate; no single national housing demand database
- **Enforcement:** Developers who deliver substandard houses face minimal consequences; title deed registration backlogs persist for years

**Key search terms:** `"human settlements delivery" statistics 2024 2025`, `"title deed backlog"`, `"Auditor-General human settlements"`, `"housing subsidy" reform`

### 4.5 Waste management

**Value chain:** National (DFFE: policy, norms, licensing) → Provincial (environmental departments: waste management licensing) → Municipality (collection, transport, disposal, landfill management)

**Known RAARICLE misalignments:**
- **Resources:** Waste collection funded from general rates/tariffs, not ring-fenced; landfill management chronically underfunded
- **Capability:** Many municipalities lack waste management officers with required qualifications
- **Information:** Waste information system (SAWIS) has incomplete reporting; many municipalities do not report
- **Enforcement:** Unlicensed landfills operate with minimal consequences; compliance monitoring is weak

**Key search terms:** `"State of Waste" report South Africa`, `"DFFE waste management"`, `"municipal landfill compliance"`, `"Auditor-General environmental" 2024 2025`

---

## 5. Cross-cutting analysis patterns

### 5.1 Comparative RAARICLE matrix

To compare governance alignment across multiple functions:

```
Generate a comparative RAARICLE matrix for the following South African 
government functions: [LIST FUNCTIONS].

For each function, rate all eight elements on the 1-5 severity scale.
Present as a heatmap-style table with functions as rows and RAARICLE 
elements as columns.

Identify:
1. Which elements are consistently weak across all functions? 
   (These indicate systemic design flaws, not function-specific problems)
2. Which functions are most severely misaligned overall?
3. What cross-cutting reforms would improve multiple functions simultaneously?
```

### 5.2 Sphere-level analysis

To analyse all functions within a single sphere:

```
Analyse all major functions assigned to [national/provincial/municipal] 
government in South Africa using the RAARICLE framework.

For each function within this sphere:
1. Rate all eight RAARICLE elements (1-5)
2. Identify the primary misalignment pattern 
   (fragmentation, absence, conflation, or cross-sphere misalignment)

Then synthesise:
- What structural features of this sphere create recurring misalignment?
- What institutional reforms at the sphere level (not function-specific) 
  would address the systemic patterns?
- Are there functions currently in this sphere that should be reassigned 
  to a different sphere based on RAARICLE analysis?
```

### 5.3 Anti-capture audit

To assess capture risk for any existing or proposed institution:

```
Conduct a RAARICLE anti-capture audit of [INSTITUTION NAME].

For each of the five capture vectors (political, commercial, labour, 
regulatory, information):

1. Assess the current structural vulnerability (high/medium/low)
2. Identify specific evidence of capture risk or actual capture 
   (search for AG reports, SIU investigations, media reporting)
3. Assess whether existing safeguards are adequate
4. Propose structural reforms to reduce capture risk

Rate the institution's overall capture resilience on a 1-5 scale 
and compare to the RAARICLE anti-capture design standards.
```

---

## 6. Output quality checklist

Before finalising any RAARICLE analysis, verify:

- [ ] **All eight elements diagnosed:** No element is skipped or treated superficially
- [ ] **Severity ratings justified:** Each rating is supported by specific evidence, not assertion
- [ ] **Institutions named:** Analysis references specific institutions, not generic "government"
- [ ] **Legislation cited:** Relevant Acts and sections are identified
- [ ] **Current data used:** Evidence is from 2023-2026 where possible (search the web)
- [ ] **Root cause identified:** Analysis goes beyond symptoms to structural misalignment
- [ ] **Reform is specific:** Blueprint names the entity, the authority, the funding mechanism
- [ ] **30-day test applied:** Proposed authority arrangements pass the operational tempo test
- [ ] **Anti-capture addressed:** All five vectors are structurally safeguarded
- [ ] **Implementation phased:** Reforms are sequenced with dependencies identified
- [ ] **Constitutional feasibility assessed:** Whether amendments are required is stated clearly
- [ ] **No RAARICLE element left behind:** The proposed design is checked against all eight elements to confirm co-location

---

## 7. Reference: key South African governance data sources

When running analyses, search for the latest versions of these:

| Source                                      | What it covers                                    | Typical URL pattern                              |
|---------------------------------------------|---------------------------------------------------|--------------------------------------------------|
| Auditor-General (AGSA)                      | Municipal and departmental audit outcomes          | `agsa.co.za`                                     |
| National Treasury                           | Budget allocations, grant frameworks, fiscal data  | `treasury.gov.za`                                |
| Stats SA                                    | Census, community survey, service delivery stats   | `statssa.gov.za`                                 |
| DWS Drop Reports                            | Water quality, losses, wastewater compliance       | `ws.dws.gov.za`                                  |
| SAICE Infrastructure Report Card            | Engineering assessment of national infrastructure  | `saice.org.za`                                   |
| Operation Vulindlela                        | Structural reform progress tracker                 | `vulindlela.gov.za` / `treasury.gov.za`          |
| Parliamentary Monitoring Group (PMG)        | Committee proceedings, departmental briefings      | `pmg.org.za`                                     |
| DPME (Planning, Monitoring, Evaluation)     | Government-wide M&E, MTSF indicators              | `dpme.gov.za`                                    |
| Municipal Demarcation Board                 | Municipal boundaries, capacity assessments         | `demarcation.org.za`                              |
| SALGA                                       | Local government research, municipal profiles      | `salga.org.za`                                   |
| NERSA                                       | Energy regulation, municipal tariff decisions      | `nersa.org.za`                                   |
| District Health Barometer                   | PHC performance data by district                   | `hst.org.za`                                     |

---

## 8. Worked example: single prompt for a complete analysis

Here is a single comprehensive prompt that generates a full RAARICLE analysis end-to-end:

```
I need a complete RAARICLE governance analysis for basic education in South Africa.

## Step 1: Research
Search the web for:
- The latest Auditor-General education audit outcomes (2024-2025)
- Recent matric results and provincial breakdowns
- DBE Annual Performance Plan and budget allocations
- Any Operation Vulindlela education reforms
- Recent Section 100 interventions in provincial education departments
- Teacher vacancy rates and subject advisor capacity

## Step 2: Institutional mapping
Map every institution involved in basic education from national policy 
to classroom delivery. Include DBE, provincial education departments, 
district offices, SACE, ELRC, National Treasury (education grants), 
DPWI (school infrastructure), and SGBs.

## Step 3: RAARICLE diagnosis
For each of the eight elements (Responsibility, Accountability, Authority, 
Resources, Information, Capability, Legitimacy, Enforcement):
- Rate severity 1-5
- Provide specific evidence
- Identify the structural misalignment

## Step 4: Root cause
Identify whether the primary failure pattern is fragmentation, 
cross-sphere misalignment, absence, conflation, or a combination.

## Step 5: Reform blueprint
Design a RAARICLE-aligned institutional architecture that co-locates 
all eight elements. Include the 30-day authority test, resource 
ring-fencing, enforcement triggers, and anti-capture protections 
(political, commercial, labour, regulatory, information).

## Step 6: Implementation
Propose a three-phase implementation pathway with legislative requirements.

## Step 7: Output
Generate a professional Word document (.docx) white paper with:
- Executive summary
- Full diagnostic
- Reform blueprint with element-by-element comparison tables
- Anti-capture architecture
- Implementation pathway
- Constitutional and legislative requirements analysis

Use professional formatting with table of contents, headers/footers, 
and consistent styling.
```

---

## Licence and attribution

The RAARICLE framework (Responsibility, Accountability, Authority, Resources, Information, Capability, Legitimacy, Enforcement) was developed through governance analysis of South African water services as a diagnostic and design tool for public sector institutional architecture. It is offered for free use in governance reform, policy analysis, academic research and public interest work. Attribution is appreciated but not required.
