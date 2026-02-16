# MARKET REQUIREMENTS DOCUMENT

## 0 → 1 New Product Creation

### Compass — A Political Literacy Blog for South Africa's Missing Middle

---

| Field | Detail |
|-------|--------|
| **Document Owner** | Tshepo Machele — Product, Engineering, Design, Business/GTM Lead |
| **Version** | 0.1 |
| **Created Date** | 2026-02-15 |
| **Status** | Draft |
| **Target Launch** | Q3 2026 |
| **Platform** | Web (built with Claude Code + Tshepo Machele) |

---

## Table of Contents

1. Executive Summary
2. Market Opportunity Validation
3. Job Executor Profile
4. Job Map & Desired Outcomes
5. Forces of Progress Analysis
6. Hypothesis Log
7. Competitive Positioning
8. Minimum Viable Product Definition
9. Success Metrics & Milestones
10. Out of Scope

---

## 1. Executive Summary

### 1.1 Problem Hypothesis

Approximately 38 million South Africans in the "missing middle" (household income R3,500–R29,000/month) are locked out of meaningful civic participation — not because they don't care, but because the political system is structurally opaque. The Constitution divides power across three spheres, money flows through arcane intergovernmental fiscal mechanisms, and oversight institutions produce reports no ordinary citizen knows how to find or read. This information asymmetry is not accidental — it is the single largest enabler of accountability failure. Meanwhile, trust in Parliament has collapsed from 65% (2004) to 21% (2024), 85% of South Africans say the country is going in the wrong direction, and 35% of registered voters say no political party represents their views. These citizens are not apathetic — they are uninformed and underserved. No credible, accessible, non-partisan resource exists that teaches this segment how South Africa's government actually works, where their tax money goes, and how to hold their specific sphere of government accountable using publicly available data.

### 1.2 Target Job Executor

The primary job executor is a working-age South African (25–45) in the urban middle segment (household income deciles 5–8, approximately R8,000–R29,000/month). They are formally employed or running a small business, primarily based in Gauteng metros. They pay rates and taxes, experience service delivery failures daily (water, electricity, roads, safety), and are frustrated with government — but cannot distinguish whether their ward councillor, their provincial MEC, or a national minister is responsible. They have a smartphone, access news primarily via social media and WhatsApp (88% penetration), and consume content in English. They are not politically aligned to any party with conviction — 44% of Black ANC voters have fluctuated between voting, abstaining, or switching in recent cycles. They want to understand the system well enough to make informed decisions and hold the right people accountable.

### 1.3 Proposed Value Proposition

Compass is a free, long-form political education blog that makes South Africa's governance system legible to ordinary citizens. It translates the Constitution, the Division of Revenue Act, Auditor-General reports, and DPME performance data into plain-language, O'Reilly-style articles that answer the question every frustrated citizen asks: "Who is actually responsible for this, and how do I know if they're doing their job?" The blog is structured as a 15-article series across five parts — foundational framework, national government, provincial government, municipal government, and a citizen's toolkit — designed to be read sequentially or accessed as standalone references. Each article is at least 5,000 words, written in a conversational register, anchored in real data, and concludes with practical tools the reader can use immediately.

### 1.4 Success Criteria

The product will be considered successful if, within 12 months of launch, it achieves the following measurable outcomes. First, at least 10,000 unique monthly readers engaging with content beyond a single page view, indicating genuine interest rather than drive-by traffic. Second, an average time-on-page of 8+ minutes for long-form articles, demonstrating that readers are consuming the substantive content rather than bouncing. Third, measurable WhatsApp sharing activity (tracked via UTM-tagged share links), confirming organic distribution through the primary channel the target segment uses. Fourth, at least 2,000 email subscribers who have opted in for new article notifications, establishing a direct relationship with readers independent of social media algorithms. Fifth, qualitative evidence (comments, emails, social media mentions) that readers have used Compass content to identify responsible government entities, locate performance data, or engage with oversight mechanisms.

### 1.5 Investment Ask

The product requires one person (Tshepo Machele) working with Claude Code as the primary development partner. The technical stack will be a static site or lightweight CMS deployable at minimal hosting cost (estimated R500–R2,000/month). The primary investment is Tshepo's time over approximately 6–8 months: 2 months for platform development and design, 4–6 months for content production (15 articles at 5,000+ words each, requiring research, writing, fact-checking, and expert sourcing). Key milestones are platform MVP live by end of Q2 2026, first four foundational articles published by end of Q3 2026, and full series complete by end of Q1 2027.

---

## 2. Market Opportunity Validation

### 2.1 Core Job Statement

**Evaluate government performance and identify accountable officials** when experiencing service delivery failures or making electoral decisions, in order to direct complaints, votes, and civic energy toward the correct sphere, department, or individual.

> ⚠️ Note: This job statement is solution-agnostic. It does not reference a blog, a website, or any specific medium. The job exists regardless of whether Compass exists — citizens are trying to accomplish this job today using inadequate tools.

### 2.2 Evidence of Struggle

| Evidence Type | Finding | Source |
|---------------|---------|--------|
| **Trust collapse** | Trust in Parliament dropped from 65% to 21% (2004–2024); trust in national government from 69% to 23%. 85% say country is going in wrong direction. | Afrobarometer Rounds 8–9; HSRC Social Attitudes Survey |
| **Accountability confusion** | South Africa's three-sphere system (national, provincial, municipal) with concurrent powers in Schedule 4 creates systematic confusion about who is responsible for what. Citizens routinely blame national government for municipal failures and vice versa. | Constitution of RSA, 1996 (Chapter 3, Schedules 4–5); Public Affairs Research Institute (PARI) research on cooperative governance friction |
| **Information asymmetry** | Government produces extensive performance data (AGSA audit reports, DPME evaluations, National Treasury ENE, StatsSA publications) but fewer than 30 of 257 municipalities achieve clean audits, and citizens have no practical guide to finding or interpreting this data. | Auditor-General MFMA Reports (2022/23); DPME MTSF Progress Reports |
| **Behavioral signals** | 23.5 million eligible South Africans did not vote in 2024 (59.1% of voting-age population). Youth registration is catastrophically low: 27.1% of 18–19 year olds. Non-voting is not apathy — Afrobarometer data shows frustration with all available options and a sense that participation is futile without information. | IEC 2024 Official Results; Afrobarometer 2024 Pre-Election Survey |
| **Competitive gaps** | No existing South African publication provides a systematic, structured, plain-language guide to how the three spheres of government work, how money flows between them, and how citizens can evaluate performance using public data. News media covers events; academic publications are inaccessible; government communications are self-serving. | Environmental scan (see Section 7) |
| **WhatsApp information demand** | 77% of South Africans access news primarily via social media; WhatsApp (88%) is the dominant platform. Political information circulates in WhatsApp groups but is overwhelmingly unstructured, unreliable, and partisan. Demand for credible, shareable explainer content is unmet. | Reuters Institute Digital News Report SA; Social Research Foundation |

### 2.3 Market Size Estimate

| Market Tier | Definition | Estimate & Rationale |
|-------------|------------|----------------------|
| **TAM** | All South Africans trying to evaluate government performance and identify accountable officials | ~24.8 million voting-age adults in the middle 60% (deciles 3–8), plus ~13 million in the top 20% who also consume political analysis — approximately 38 million people with some version of this job |
| **SAM** | English-literate, smartphone-equipped, urban South Africans who consume long-form digital content | Estimated 8–12 million — urban population with smartphone access (81.5% of household expenditure is urban), English-literate (English is primary business/media language despite being L1 for only 8.1%), and willing to read articles >2,000 words |
| **SOM** | Realistic readership achievable in 24 months through organic and WhatsApp-driven distribution in Gauteng metros | 50,000–100,000 unique readers — based on comparable South African independent media properties (Daily Maverick achieved ~2M monthly uniques at scale; GroundUp reaches ~500K; a niche political education blog targeting a specific segment can realistically reach 50K–100K within two years through WhatsApp sharing and SEO) |

> Note: This is a content product, not a SaaS product. "Market size" is measured in addressable readership, not revenue. Monetization is explicitly out of scope for v1 (see Section 10).

---

## 3. Job Executor Profile

### 3.1 Primary Job Executor

The primary job executor is a Black South African aged 25–45, living in a Gauteng metro (Johannesburg, Tshwane, or Ekurhuleni), earning a household income of R8,000–R29,000/month (deciles 5–8). They are formally employed — working as a technician, nurse, teacher, mid-level public servant, retail manager, security supervisor, administrative clerk, or small business owner. They have completed Matric and may have a diploma or certificate but are unlikely to have a university degree (only 7–8% of Black South Africans have post-secondary education). They own a smartphone, have mobile data (likely prepaid), consume news on WhatsApp and Facebook, and read in English even though it is not their home language. They pay municipal rates and service charges. They experience the consequences of government failure directly — load shedding (before the recent reprieve), water interruptions, potholed roads, unsafe public spaces, under-resourced clinics, and schools where their children receive instruction from overwhelmed teachers.

Politically, they are dealigned. They may have voted ANC in previous elections but are disillusioned by corruption, state capture, and economic stagnation. They are suspicious of the DA ("white party" perception persists), uninterested in the EFF's radicalism, and view MK as a Zuma personality vehicle. They represent the 44% of Black ANC voters who have fluctuated between voting, abstaining, or switching — and the 35% of registered voters who say no party represents their views. They want competent, corruption-free governance but lack the framework to evaluate which government entities are performing and which are failing.

### 3.2 Circumstances of Struggle

The job executor struggles most acutely in three recurring moments. The first is the **"who do I blame?" moment** — when a service fails (water outage, pothole, clinic stockout, school crisis) and the citizen does not know whether the responsible entity is their municipality, their provincial government, or a national department. South Africa's cooperative governance model, with its concurrent powers and shared mandates, makes this genuinely difficult even for informed observers. The citizen's frustration is real, but it is misdirected because they cannot trace the accountability chain.

The second is the **"election decision" moment** — when a national or local election approaches and the citizen must choose between parties without a framework for evaluating incumbent performance. They hear promises and accusations but cannot independently verify claims about budgets, audit outcomes, spending patterns, or service delivery metrics — all of which are publicly available but practically inaccessible.

The third is the **"is this normal?" moment** — when the citizen encounters a government failure and cannot tell whether it reflects systemic dysfunction (a municipality in financial distress with a disclaimer audit) or an isolated incident. Without benchmarks, they cannot calibrate their expectations or their anger.

### 3.3 Current Alternatives (Solutions "Hired" Today)

| Alternative | What It Does Well | Where It Falls Short | Estimated % Using |
|-------------|-------------------|----------------------|-------------------|
| **Do nothing / accept confusion** | No effort required; emotional coping through cynicism or disengagement | Problem persists; frustration compounds; leads to abstention or protest voting without information | ~60% |
| **Mainstream news media** (News24, eNCA, SABC, Daily Maverick) | Covers events, scandals, and politics in real time; some investigative journalism | Event-driven, not structural; rarely explains how the system works; assumes knowledge readers don't have; paywalled (Daily Maverick) or low-quality (SABC); does not provide practical tools for citizen action | ~25% |
| **WhatsApp group discussions** | Peer-to-peer, trusted social context; high engagement; reaches the target segment | Unstructured, unreliable, often partisan or conspiratorial; no fact-checking; amplifies misinformation; emotionally driven rather than analytically useful | ~40% |
| **Academic publications** (journals, university research) | Rigorous, evidence-based, structurally deep | Written for academics, not citizens; behind paywalls; jargon-heavy; not actionable; no practical "what you can do" framing | ~2% |
| **Government communications** (GCIS, departmental websites) | Official source; sometimes contains useful data | Self-serving framing; hard to navigate; no critical analysis; deliberately obscures poor performance; not trusted (23% trust in national government) | ~5% |
| **Civil society reports** (PARI, Section27, Equal Education, Corruption Watch) | Issue-specific depth; advocacy-oriented; sometimes accessible | Siloed by issue area; not comprehensive or systematic; often aimed at policymakers rather than general public; irregular publication | ~5% |

---

## 4. Job Map & Desired Outcomes

### 4.1 Universal Job Map

| Step | Definition | Customer Activities | Top Desired Outcomes |
|------|------------|--------------------|-----------------------|
| **1. DEFINE** | Determine what I need to know about government performance | Citizen encounters a service failure or election and asks "what's going on?" | Minimize the time it takes to identify which sphere of government is responsible for a given service |
| **2. LOCATE** | Find relevant information about government performance | Searches news, asks peers, checks government websites | Minimize the effort required to find credible, up-to-date performance data for a specific government entity |
| **3. PREPARE** | Build context to interpret the information | Tries to understand the system (three spheres, fiscal flows, oversight bodies) | Minimize the prerequisite knowledge needed to understand a government performance report |
| **4. CONFIRM** | Verify that the information is reliable and relevant | Cross-checks sources, assesses credibility | Minimize the likelihood of acting on inaccurate or misleading information about government performance |
| **5. EXECUTE** | Evaluate government performance and form a judgment | Compares targets to outcomes, reads audit results, assesses spending | Minimize the time it takes to form a well-grounded assessment of a government entity's performance |
| **6. MONITOR** | Track performance over time | Follows up on previous assessments; checks whether things improved | Minimize the effort required to track changes in government performance across reporting periods |
| **7. MODIFY** | Adjust understanding as new information emerges | Updates assessment based on new audit reports, budget data, evaluations | Minimize the likelihood of holding an outdated view of a government entity's performance |
| **8. CONCLUDE** | Take civic action based on assessment | Decides how to vote, where to complain, what to advocate for | Minimize the gap between understanding a problem and knowing what civic action to take |

### 4.2 Prioritized Outcome Statements

Importance (IMP) and Satisfaction (SAT) scores below are estimated based on the market research reviewed (Afrobarometer, HSRC, Social Research Foundation) and will require validation through direct user research post-launch.

| # | Desired Outcome Statement | IMP | SAT | OPP |
|---|---------------------------|-----|-----|-----|
| 1 | Minimize the time it takes to identify which sphere of government (national, provincial, or municipal) is responsible for a specific service failure | 9 | 2 | 16 |
| 2 | Minimize the effort required to find and interpret Auditor-General audit outcomes for a specific municipality or department | 9 | 2 | 16 |
| 3 | Minimize the prerequisite knowledge needed to understand how tax revenue flows from national government to provinces and municipalities | 8 | 1 | 15 |
| 4 | Minimize the likelihood of misdirecting a complaint to the wrong sphere of government | 9 | 3 | 15 |
| 5 | Minimize the time it takes to assess whether a national department is hitting its Annual Performance Plan targets | 8 | 2 | 14 |
| 6 | Maximize the ability to distinguish between output metrics ("houses built") and outcome metrics ("quality of human settlement") when evaluating government claims | 8 | 2 | 14 |
| 7 | Minimize the effort required to understand what a "qualified audit," "disclaimer," or "clean audit" means for a government entity | 8 | 2 | 14 |
| 8 | Minimize the time it takes to determine whether a municipality is in financial distress | 8 | 2 | 14 |
| 9 | Minimize the gap between encountering a service failure and knowing the correct formal complaint or recourse mechanism | 8 | 3 | 13 |
| 10 | Maximize confidence in making an informed voting decision based on incumbent performance data rather than party rhetoric | 9 | 3 | 15 |

> All scores >12 indicate high opportunity. Every outcome in this table represents an extreme or high opportunity — confirming that the job is massively underserved.

### 4.3 Emotional & Social Jobs

| Emotional Jobs (How they want to FEEL) | Social Jobs (How they want to be PERCEIVED) |
|-----------------------------------------|---------------------------------------------|
| Feel empowered rather than helpless when government fails them | Be seen as an informed citizen who understands how the system works, not just someone who complains |
| Feel confident that their frustration is directed at the right entity, not wasted | Demonstrate credibility in WhatsApp group and community discussions about politics and governance |
| Feel that their participation (voting, complaining, engaging) actually matters and is targeted effectively | Be perceived as someone who thinks independently rather than blindly following a party |
| Reduce the anxiety of not knowing whether a situation is "normal" dysfunction or a sign of crisis | Gain respect from peers for bringing facts and data to political conversations rather than just opinions |
| Feel a sense of agency — that the information exists and they can access it | Be seen as a responsible taxpayer who holds government accountable rather than a passive recipient |

---

## 5. Forces of Progress Analysis

### 5.1 Forces Diagram

**FORCES PROMOTING THE SWITCH →**

| PUSH: Pain with Current Situation | PULL: Attraction to New Solution |
|-----------------------------------|----------------------------------|
| Cannot identify which sphere of government is responsible for a service failure — frustration is real but misdirected | A clear, structured explanation of who is responsible for what — the "mental model" for navigating the system |
| News media covers scandals but never explains how the system actually works — citizen remains structurally ignorant after years of news consumption | Long-form, O'Reilly-style content that builds understanding from first principles — not just "what happened" but "how it works" |
| Audit reports, budget documents, and performance data exist but are impenetrable to non-specialists — citizen knows the information is "out there" but cannot access it | Plain-language translation of AGSA reports, DORA, ENE, APPs, and MTSF data with practical "here's what to look for" guidance |
| Election decisions feel like guesswork — no framework for evaluating incumbent performance beyond "are things better or worse?" | A structured evaluation framework — "citizen's toolkit" — with step-by-step instructions for assessing any government entity |
| WhatsApp political discussions are emotionally charged but informationally empty — participating feels futile | Shareable, credible, well-sourced content that arms the reader for WhatsApp discussions with facts rather than feelings |

**← FORCES HINDERING THE SWITCH**

| ANXIETY: Concerns About Change | HABIT: Comfort with Status Quo |
|--------------------------------|--------------------------------|
| "This will be too complicated — I'm not a policy expert" — fear that the content will be academic or over their head | Current coping mechanism (cynicism, disengagement, "they're all the same") requires zero effort and provides emotional closure |
| "Is this site pushing a political agenda?" — suspicion that any political content platform has hidden partisan motives | Familiar habit of consuming event-driven news (scandals, elections, protests) rather than structural analysis — easier and more emotionally stimulating |
| "What can I actually do with this information?" — anxiety that understanding the system better will just increase frustration without providing actionable outlets | Existing social identity around political disengagement — "I don't do politics" as a self-protective stance that would need to be abandoned |
| "Who is behind this?" — in a low-trust environment, unfamiliar sources face credibility hurdles | The effort cost of reading 5,000+ word articles is high relative to scrolling WhatsApp or watching a 2-minute news clip |

### 5.2 Switching Trigger Events

The following events or circumstances cause the target job executor to actively seek understanding of the governance system, creating receptivity windows for Compass content:

1. **Personal service delivery crisis** — a prolonged water outage, extended load shedding, a potholed road that damages their vehicle, a clinic visit where medication is unavailable — triggers the question "who is responsible for this?"

2. **Election season** — national elections (next: 2029) and local government elections (next: 2026) force a choice and create demand for evaluative frameworks. The 2026 local elections in Gauteng metros are the nearest high-salience trigger.

3. **Auditor-General or corruption revelations** — media coverage of audit disclaimers, irregular expenditure, or corruption cases triggers curiosity about the oversight system and whether it works.

4. **Municipal financial crisis** — news of a municipality being placed under Section 139 administration, or owing Eskom billions, or facing a court-ordered dissolution (as with Makana) triggers the question "how did this happen and what can be done?"

5. **Community WhatsApp debate** — a heated political discussion in a WhatsApp group where the reader feels uninformed and wants to "do their homework" before the next round.

---

## 6. Hypothesis Log

| ID | Hypothesis (What must be true) | Confidence | Validation Method | Status |
|----|-------------------------------|------------|-------------------|--------|
| H1 | **Problem: The target segment cannot identify which sphere of government is responsible for specific services** — and this confusion leads to misdirected complaints, uninformed voting, and civic disengagement | High (>70%) | Post-launch reader survey; comment analysis; Afrobarometer data on institutional knowledge | Testing |
| H2 | **Value: The target segment will read 5,000+ word articles** if the content is conversational, practical, and directly relevant to their lived experience — despite the prevailing assumption that "people don't read long-form" | Medium (30–70%) | Time-on-page analytics; scroll depth tracking; completion rates for articles | Testing |
| H3 | **Distribution: WhatsApp sharing will be the primary distribution channel**, and articles structured with shareable insights and practical tools will achieve organic spread through existing WhatsApp groups | Medium (30–70%) | UTM-tagged WhatsApp share links; referral source analytics; reader survey on discovery channel | Testing |
| H4 | **Feasibility: A single person with Claude Code can build and maintain a quality blog platform** including responsive design, SEO, analytics, email capture, and WhatsApp share integration | High (>70%) | Build the MVP and assess quality, speed, and maintenance burden | Testing |
| H5 | **Content: The 15-article series structure (foundational → national → provincial → municipal → toolkit) provides comprehensive coverage** without requiring the reader to have any prior knowledge of SA governance | High (>70%) | Editorial review; reader feedback on gaps; expert review of completeness | Testing |
| H6 | **Trust: A non-partisan, data-driven, transparently-sourced blog can build credibility with a segment that trusts almost no institution** (21% trust Parliament, 23% trust national government, 25% trust ruling party) | Medium (30–70%) | Reader trust survey; qualitative feedback; return visit rates; email subscription as trust proxy | Testing |
| H7 | **Timing: The 2026 local government elections create a natural demand spike** for municipal governance content, making the municipal articles (Part 4) especially timely and the overall series relevant | High (>70%) | Traffic patterns around election season; comparison of pre-election vs. baseline readership | Testing |
| H8 | **Viability: Compass can sustain itself without monetization in v1** — and if successful, can explore sustainable revenue models (sponsorship, donations, premium content, consulting) in v2 | Medium (30–70%) | Operating cost tracking; reader willingness-to-pay survey at 12 months; partnership interest from CSOs and foundations | Not yet testing |

---

## 7. Competitive Positioning

### 7.1 Outcome-Based Competitive Analysis

| Top Desired Outcome | Do Nothing | Mainstream News Media | WhatsApp Groups | Academic Publications | **Compass (Our Goal)** |
|----------------------|------------|----------------------|-----------------|----------------------|------------------------|
| Identify responsible sphere of government | ☐ Not addressed | ★ Partially (assumes knowledge) | ☐ Not addressed | ★★ Well addressed (but inaccessible) | ★★★ Excellently addressed |
| Find and interpret AG audit outcomes | ☐ Not addressed | ★ Partially (reports on headlines only) | ☐ Not addressed | ★★ Well addressed (but inaccessible) | ★★★ Excellently addressed |
| Understand intergovernmental fiscal flows | ☐ Not addressed | ☐ Not addressed | ☐ Not addressed | ★★ Well addressed (but inaccessible) | ★★★ Excellently addressed |
| Distinguish output vs. outcome metrics | ☐ Not addressed | ☐ Not addressed | ☐ Not addressed | ★★★ Excellently addressed (but inaccessible) | ★★★ Excellently addressed |
| Know correct complaint/recourse mechanism | ☐ Not addressed | ★ Partially (ad hoc coverage) | ★ Partially (peer advice, often wrong) | ☐ Not addressed | ★★★ Excellently addressed |
| Make informed voting decision based on data | ☐ Not addressed | ★ Partially (election coverage is event-driven) | ☐ Not addressed | ★ Partially (not actionable) | ★★★ Excellently addressed |

### 7.2 Differentiation Strategy

Compass wins by occupying a position that no existing South African content platform holds: **structurally deep, practically actionable, plain-language political education for non-experts.** News media is event-driven and assumes structural knowledge. Academic publications are structurally deep but inaccessible. Government communications are self-serving. Civil society reports are issue-siloed. WhatsApp is peer-driven and unreliable.

Compass's differentiation rests on three pillars. First, **systematic coverage** — a MECE article series that covers all three spheres, the fiscal system, oversight institutions, M&E systems, and a practical toolkit, ensuring no structural gap in the reader's understanding. Second, **the O'Reilly register** — conversational, specific, practical writing that treats the reader as intelligent but uninformed, uses "you" throughout, leads with concrete examples, and ends every article with actionable tools. Third, **data anchoring** — every claim is tied to real data sources (AGSA, National Treasury, DPME, StatsSA, IEC) with guidance on where the reader can verify the information themselves.

Competitors cannot easily replicate this because news media's business model rewards event-driven content, academics are incentivized to write for peers, and civil society organizations are issue-specific by mandate. A comprehensive, accessible governance education resource has no natural institutional home — which is precisely why it doesn't exist yet.

---

## 8. Minimum Viable Product Definition

### 8.1 MVP Scope

The MVP is a responsive, fast-loading blog website with the first four foundational articles published (Part 1 of the series), plus email subscription functionality and WhatsApp share buttons. The end-to-end experience: a citizen encounters a service delivery failure, searches for "who is responsible for water in South Africa" or receives a Compass link in a WhatsApp group, reads an article that explains the three-sphere system with concrete examples relevant to their situation, and leaves with a mental model for identifying responsible government entities — plus links to the specific data sources (AGSA, National Treasury, DPME) where they can look up their own municipality or province. They can subscribe via email to be notified when the next article drops.

The platform will be built using Claude Code with Tshepo Machele. It will be a static site or lightweight framework (Hugo, Astro, or Next.js static export) deployed on a low-cost host (Vercel, Netlify, or Cloudflare Pages). Design will be clean, reading-optimized (large type, generous whitespace, mobile-first), and branded as Compass.

### 8.2 Target Outcomes for MVP

| Outcome Statement | In MVP? | Rationale |
|--------------------|---------|-----------|
| Identify which sphere of government is responsible for a specific service | Yes | This is the foundational outcome — Article 1.1 addresses it directly and is the entry point for the entire series |
| Understand how tax revenue flows from national to provinces and municipalities | Yes | Article 1.2 (Following the Money) is essential context for evaluating any government entity |
| Understand the oversight and accountability ecosystem | Yes | Article 1.3 (Who Watches the Watchers) completes the "how does the system work?" foundation |
| Understand the M&E system and where to find performance data | Yes | Article 1.4 (Measuring What Matters) provides the practical data-finding skills needed for all subsequent articles |
| Evaluate a specific national department's performance | No | Requires Part 2 articles — will be in the next content release |
| Assess whether a municipality is in financial distress | No | Requires Part 4 articles — critical for 2026 local elections but can follow MVP |
| Know the correct formal complaint mechanism | No | Requires Part 5 (Citizen's Toolkit) — the capstone article |

### 8.3 Target Customer for MVP

The first 100 readers are urban professionals in Gauteng (aged 28–40) who are already politically curious — they read Daily Maverick or News24 opinion pieces, participate in WhatsApp political discussions, and have expressed frustration with government on social media. They are "information seekers" within the target segment, not representative of the full middle 60%, but they are the most likely to read long-form content, share articles, and provide feedback. They will be reached through Tshepo Machele's personal and professional networks, targeted sharing in Gauteng-based WhatsApp groups, and LinkedIn posts. These early adopters will validate H2 (willingness to read long-form) and H6 (trust in non-partisan analysis) before broader distribution efforts.

---

## 9. Success Metrics & Milestones

### 9.1 North Star Metric

**Monthly readers who read at least 2 articles and spend 8+ minutes total on site.** This captures both reach (readership) and depth (genuine engagement with substantive content). A reader who reads two articles and spends 8+ minutes has likely absorbed enough structural understanding to meaningfully change how they think about government accountability — which is the core purpose of Compass.

### 9.2 Key Metrics by Stage

| Stage | Key Metrics | Target |
|-------|-------------|--------|
| **Discovery** (Months 1–2) | Platform built and live; 4 articles drafted and reviewed; 10 beta readers provide feedback | Platform functional; all 4 Part 1 articles pass expert review for accuracy |
| **Validation** (Months 3–6) | Unique monthly readers; average time-on-page; scroll depth; WhatsApp referral share; email subscriptions | 1,000 unique monthly readers; 8-min avg time-on-page; 30%+ WhatsApp referral share; 500 email subscribers |
| **Growth** (Months 7–12) | Monthly readers; article completion rate; returning visitors; email list growth; social sharing volume; qualitative impact evidence | 10,000 unique monthly readers; 40% return visit rate; 2,000 email subscribers; at least 5 documented cases of readers using Compass content for civic action |

### 9.3 Key Milestones

| Milestone | Success Criteria | Target Date |
|-----------|------------------|-------------|
| Platform MVP live | Responsive blog with Compass branding, email capture, WhatsApp share, analytics | End Q2 2026 |
| Part 1 published (4 foundational articles) | All 4 articles live, reviewed for accuracy, SEO-optimized | End Q3 2026 |
| Part 2 published (3 national government articles) | Articles 2.1–2.3 live | End Q4 2026 |
| Parts 3–4 published (municipal + provincial — 7 articles) | Timed to build toward 2026 local election relevance; municipal articles prioritized | Q4 2026 – Q1 2027 |
| Part 5 published (Citizen's Toolkit) | Capstone article live, completing the series | Q1 2027 |
| PMF assessment | Reader survey, engagement data review, impact evidence review — formal go/no-go on expansion | Q2 2027 |

---

## 10. Out of Scope

### 10.1 Explicitly Excluded from MVP

| What's Excluded | Rationale |
|-----------------|-----------|
| **Monetization** (ads, paywalls, subscriptions, sponsorship) | Premature. Trust-building with a low-trust audience requires a credible free offering. Monetization exploration deferred to post-PMF assessment (H8). |
| **Party-political positioning or endorsements** | Compass is a political education resource, not a political vehicle. Any perception of partisan alignment would destroy credibility with the target segment, which is dealigned and suspicious of all parties. Content must be rigorously non-partisan. |
| **Languages beyond English** | English is the primary media consumption language for the target segment. Vernacular versions (isiZulu, Sesotho, isiXhosa) are desirable for reach but add significant translation cost and complexity. Deferred until content is validated in English. |
| **Video or podcast content** | Long-form written articles are the core format. Video and audio adaptations may improve reach but require different production skills and infrastructure. Reconsider when readership validates demand. |
| **Interactive data tools** (dashboards, municipal scorecards, audit lookup tools) | High value but high development cost. Written articles with links to source data are the MVP approach. Interactive tools can be built later if engagement data supports the investment. |
| **User-generated content or community features** (comments, forums) | Moderation burden is high and quality risk is significant. Initial engagement feedback will come through email, social media, and direct outreach. Community features can be added if demand warrants. |
| **Coverage beyond the 15-article series** (current affairs, breaking news, opinion) | Compass is a structured educational resource, not a news publication. Adding current affairs coverage would dilute the value proposition and create unsustainable content demands for a one-person operation. |
| **Mobile app** | A responsive website accessed via mobile browser serves the target segment. A dedicated app adds development and maintenance cost without clear incremental value at this stage. |

### 10.2 Future Considerations

The following items are candidates for v2 or later iterations, contingent on PMF validation and resource availability. Vernacular translation of highest-performing articles (trigger: >5,000 monthly readers + reader requests). Interactive municipal scorecard tool using AGSA data (trigger: demand from readers + availability of structured data). Short-form WhatsApp-native content summaries — 500-word article summaries formatted for WhatsApp forwarding (trigger: evidence that full articles are being shared but not read in full). Partnership with civic education organizations (trigger: inbound interest from Section27, Equal Education, Corruption Watch, or similar). Election-specific voter guides for the 2026 local elections (trigger: municipal articles published + >2,000 email subscribers in Gauteng).

---

## Appendix A: Stakeholder Sign-Off

| Role | Name | Sign-Off | Date |
|------|------|----------|------|
| Product Lead | Tshepo Machele | ☐ Approved | |
| Engineering Lead | Tshepo Machele | ☐ Approved | |
| Design Lead | Tshepo Machele | ☐ Approved | |
| Business/GTM Lead | Tshepo Machele | ☐ Approved | |
| Executive Sponsor | Tshepo Machele | ☐ Approved | |

---

## Appendix B: Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-02-15 | Tshepo Machele | Initial draft |

---

## Appendix C: Completion Checklist

- [x] Executive Summary written LAST and synthesizes key points
- [x] Core job statement is solution-agnostic and stable over time
- [x] Evidence of struggle includes research citations (Afrobarometer, HSRC, IEC, AGSA, PARI)
- [x] Market size uses bottom-up calculation with clear assumptions
- [x] Job executor profile based on demographic research (Stats SA IES, UCT Liberty Institute, Afrobarometer), not assumptions
- [x] Job map covers all 8 universal steps
- [x] Outcome statements follow ODI format (minimize/maximize + metric)
- [x] Top outcomes have importance and satisfaction scores (estimated — flagged for validation)
- [x] Forces of Progress analysis identifies adoption barriers (anxiety about complexity, trust deficit, effort cost)
- [x] All key hypotheses documented with validation plans
- [x] Competitive analysis uses outcomes, not features
- [x] MVP scope is minimal viable experience (4 foundational articles + platform), not feature list
- [x] Success metrics prioritize learning (engagement depth, trust signals) over growth (raw traffic)
- [x] Out of scope explicitly lists excluded items with rationale and reconsideration triggers
- [x] All stakeholder roles identified (Tshepo Machele across all functions)

---

## Appendix D: Content Architecture Reference

The full 15-article series structure, with detailed generation prompts for each article, is documented in the companion project file: `sa_political_system_article_series.md`. The series is organized as follows:

| Part | Article | Sphere | Focus | MVP? |
|------|---------|--------|-------|------|
| 1 | 1.1 | All | Constitutional division of power | ✓ |
| 1 | 1.2 | All | Intergovernmental fiscal system | ✓ |
| 1 | 1.3 | All | Oversight and accountability institutions | ✓ |
| 1 | 1.4 | All | Monitoring and evaluation system | ✓ |
| 2 | 2.1 | National | Executive governance machinery | |
| 2 | 2.2 | National | Performance evaluation framework | |
| 2 | 2.3 | National | Implementation failure analysis | |
| 3 | 3.1 | Provincial | Provincial system structure and constraints | |
| 3 | 3.2 | Provincial | Education and health delivery | |
| 3 | 3.3 | Provincial | Provincial failure and intervention | |
| 4 | 4.1 | Municipal | Municipal system structure | |
| 4 | 4.2 | Municipal | Municipal crisis analysis | |
| 4 | 4.3 | Municipal | Municipal failure and intervention | |
| 4 | 4.4 | Municipal | Metro vs rural divergence | |
| 5 | 5.1 | All | Citizen engagement toolkit | |

Each article is designed to be at least 5,000 words, written in an O'Reilly conversational register, and anchored in verified South African governance data. The series is MECE — mutually exclusive (no content overlap between articles) and collectively exhaustive (complete coverage of the three-sphere system).
