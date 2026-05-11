/**
 * source-article-images.mjs
 *
 * Queries Unsplash for contextually relevant images, downloads and optimizes
 * them as WebP, then inserts markdown image syntax into article .md files.
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=xxx node scripts/source-article-images.mjs
 *
 * Options:
 *   --dry-run          Show what would be inserted without modifying files
 *   --article=SLUG     Process a single article slug
 *   --batch=N          Process N articles per run (default: all). Batches
 *                      respect the Unsplash 50 req/hr free-tier limit.
 *                      Use --batch=5 to stay well within the limit (15 reqs).
 *   --offset=N         Skip the first N articles (combine with --batch for
 *                      successive runs, e.g. --batch=5 --offset=5)
 *
 * Examples:
 *   # Dry-run first batch of 5 articles
 *   UNSPLASH_ACCESS_KEY=xxx node scripts/source-article-images.mjs --dry-run --batch=5
 *
 *   # Process articles 6-10
 *   UNSPLASH_ACCESS_KEY=xxx node scripts/source-article-images.mjs --batch=5 --offset=5
 *
 *   # Process a single article
 *   UNSPLASH_ACCESS_KEY=xxx node scripts/source-article-images.mjs --article=1-1-architecture-of-the-state
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readdir } from "node:fs/promises";
import { config } from "dotenv";
import sharp from "sharp";

// Load .env from project root
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env") });

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("Error: UNSPLASH_ACCESS_KEY not found. Add it to .env or set as env var.");
  process.exit(1);
}

const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");
const ARTICLE_FLAG = process.argv.find((a) => a.startsWith("--article="));
const SINGLE_ARTICLE = ARTICLE_FLAG ? ARTICLE_FLAG.split("=")[1] : null;
const BATCH_FLAG = process.argv.find((a) => a.startsWith("--batch="));
const BATCH_SIZE = BATCH_FLAG ? parseInt(BATCH_FLAG.split("=")[1], 10) : 0;
const OFFSET_FLAG = process.argv.find((a) => a.startsWith("--offset="));
const BATCH_OFFSET = OFFSET_FLAG ? parseInt(OFFSET_FLAG.split("=")[1], 10) : 0;

const ARTICLES_DIR = "src/content/articles";
const IMAGES_DIR = "public/images/articles";
const IMAGE_WIDTH = 680;
const IMAGE_MAX_HEIGHT = 450;
const WEBP_QUALITY = 78;

// Track remaining API requests from Unsplash response headers
let rateLimitRemaining = 50;

// Curated search terms per article slug, with placement info.
// Each entry: { queries: string[], placements: { afterH2: string, caption: string }[] }
const ARTICLE_CONFIG = {
  "1-1-architecture-of-the-state": {
    queries: [
      "constitutional court justice",
      "government building architecture",
      "city municipal services urban",
    ],
    placements: [
      {
        afterH2: "Why \u201CSpheres\u201D and Not \u201CTiers\u201D: The Framers\u2019 Deliberate Choice",
        caption: "The Constitutional Court in Johannesburg, where disputes over government powers are resolved",
      },
      {
        afterH2: "What Each Sphere Actually Does: A Plain-Language Guide",
        caption: "Government services like water and electricity are delivered through different spheres",
      },
      {
        afterH2: "The Role of Local Government: Where the Rubber Meets the Road",
        caption: "Municipal service delivery is where most citizens interact with government",
      },
    ],
  },
  "1-2-who-does-what": {
    queries: [
      "parliament debate legislative chamber",
      "government office bureaucracy",
      "local government civic center",
    ],
    placements: [
      {
        afterH2: "The National Government Machine: Departments, Ministers, and Directors-General",
        caption: "Parliament in Cape Town, where national legislation is debated and passed",
      },
      {
        afterH2: "The Provincial Government Machine: MECs, HODs, and the Services Closest to You",
        caption: "Provincial legislatures oversee education, health, and other critical services",
      },
      {
        afterH2: "The Municipal Government Machine: Where Services Meet Your Street",
        caption: "Municipal offices are where citizens access local government services directly",
      },
    ],
  },
  "1-3-how-the-spheres-interact": {
    queries: [
      "government officials meeting conference",
      "business meeting conference table",
      "parliament senate chamber legislative",
    ],
    placements: [
      {
        afterH2: "The Constitutional Foundation: What Chapter 3 Demands",
        caption: "Cooperative governance requires all three spheres to work together in good faith",
      },
      {
        afterH2: "The Intergovernmental Relations Framework Act: The Operating Manual",
        caption: "Intergovernmental forums bring together officials from national, provincial, and municipal government",
      },
      {
        afterH2: "The National Council of Provinces: The Legislative Bridge",
        caption: "The NCOP gives provinces a voice in national legislation",
      },
    ],
  },
  "2-1-following-the-money": {
    queries: [
      "tax revenue finance treasury",
      "currency money government budget",
      "financial documents spreadsheet budget",
    ],
    placements: [
      {
        afterH2: "Where Your Tax Money Comes From: Inside SARS",
        caption: "SARS collects over R2 trillion annually, forming the fiscal foundation of government",
      },
      {
        afterH2: "The Great Division: How DORA Splits the Money",
        caption: "The Division of Revenue Act determines how money flows between spheres of government",
      },
      {
        afterH2: "Two Types of Money: Equitable Share and Conditional Grants",
        caption: "Conditional grants ring-fence funding for specific programmes like housing and infrastructure",
      },
    ],
  },
  "2-2-the-budget-process": {
    queries: [
      "finance minister budget speech",
      "strategy planning whiteboard meeting",
      "financial planning calculator documents",
    ],
    placements: [
      {
        afterH2: "The Medium-Term Expenditure Framework: Why the Budget Is Always Three Years Long",
        caption: "The budget cycle spans three years, balancing long-term planning with annual adjustments",
      },
      {
        afterH2: "Phase 2: The Medium-Term Budget Policy Statement — The Preview (October)",
        caption: "The MTBPS in October previews the fiscal framework before the full budget in February",
      },
      {
        afterH2: "Phase 3: Budget Preparation — The Negotiation Nobody Sees (August to January)",
        caption: "Departments negotiate their allocations with National Treasury behind closed doors",
      },
    ],
  },
  "2-3-from-treasury-to-your-town": {
    queries: [
      "water infrastructure pipes construction",
      "electricity power lines urban",
      "road construction workers asphalt",
    ],
    placements: [
      {
        afterH2: "Three Revenue Streams: How Your Municipality Gets Its Money",
        caption: "Municipalities fund their operations through a mix of national transfers, grants, and own revenue",
      },
      {
        afterH2: "Conditional Grants: Ring-Fenced Money for Specific Municipal Projects",
        caption: "Infrastructure grants fund critical projects like water treatment and road maintenance",
      },
      {
        afterH2: "The Municipal Business Model: How Own Revenue Works",
        caption: "Property rates and service charges form the backbone of municipal own revenue",
      },
    ],
  },
  "3-1-the-awkward-middle-child": {
    queries: [
      "state legislature capitol building",
      "regional map territory governance",
      "provincial government building Africa",
    ],
    placements: [
      {
        afterH2: "How South Africa Ended Up With Nine Provinces",
        caption: "The nine provinces were created through negotiations during the transition to democracy",
      },
      {
        afterH2: "What Provinces Can Actually Do: The Constitutional Powers",
        caption: "Provincial powers are defined in the Constitution's Schedules 4 and 5",
      },
      {
        afterH2: "The Money Problem: Provincial Fiscal Dependence",
        caption: "Provinces depend on national transfers for over 95% of their revenue",
      },
    ],
  },
  "3-2-health-and-education-at-the-provincial-coal-face": {
    queries: [
      "classroom students learning school",
      "hospital clinic healthcare nurse",
      "students education Africa diverse",
    ],
    placements: [
      {
        afterH2: "Basic Education: The Largest Provincial Function",
        caption: "Education consumes roughly 40% of every provincial budget in South Africa",
      },
      {
        afterH2: "Health: Where Provincial Government Meets Your Body",
        caption: "Provincial hospitals and clinics are the primary healthcare access point for most South Africans",
      },
      {
        afterH2: "How Provinces Compare: The Performance Map",
        caption: "Service delivery outcomes vary dramatically across South Africa's nine provinces",
      },
    ],
  },
  "3-3-municipal-councils": {
    queries: [
      "council meeting chamber debate",
      "city hall civic building exterior",
      "community gathering town hall",
    ],
    placements: [
      {
        afterH2: "Three Categories of Municipality: Why the Type Matters",
        caption: "South Africa's 257 municipalities are divided into three categories with different powers",
      },
      {
        afterH2: "How Your Council Is Elected: The Mixed Electoral System",
        caption: "Municipal elections use a mixed system combining ward representatives and proportional representation",
      },
      {
        afterH2: "The Municipal Manager: Where Politics Meets Administration",
        caption: "The municipal manager is the accounting officer responsible for turning council decisions into services",
      },
    ],
  },
  "4-1-your-right-to-participate": {
    queries: [
      "citizens rally peaceful demonstration",
      "public hearing testimony microphone",
      "community engagement volunteers gathering",
    ],
    placements: [
      {
        afterH2: "The Constitutional Foundation: Rights That Demand Participation",
        caption: "The Constitution guarantees every citizen the right to participate in government",
      },
      {
        afterH2: "The Constitutional Court Speaks: Participation Is Not Optional",
        caption: "Landmark court rulings have established that public participation is a constitutional requirement",
      },
      {
        afterH2: "The Participation Map: Every Channel Available to You",
        caption: "Citizens have multiple formal channels to engage with government at every level",
      },
    ],
  },
  "4-2-ward-committees-and-community-engagement": {
    queries: [
      "town hall community forum",
      "community planning discussion group",
      "public budget consultation citizens",
    ],
    placements: [
      {
        afterH2: "Ward Committees: How They Actually Work",
        caption: "Ward committees are the primary mechanism for community participation in local government",
      },
      {
        afterH2: "The IDP Process: Shaping Your Municipality's Five-Year Plan",
        caption: "The Integrated Development Plan process gives communities a say in municipal priorities",
      },
      {
        afterH2: "The Municipal Budget Process: Following the Money You Helped Prioritise",
        caption: "Public budget consultations allow residents to influence how municipal funds are allocated",
      },
    ],
  },
  "4-3-making-public-submissions": {
    queries: [
      "person writing document laptop",
      "official gazette newspaper policy",
      "handwriting letter pen paper desk",
    ],
    placements: [
      {
        afterH2: "Finding the Opportunities: How to Know When to Comment",
        caption: "Government Gazettes and parliamentary websites publish calls for public comment",
      },
      {
        afterH2: "Anatomy of an Effective Submission",
        caption: "An effective submission is structured, evidence-based, and proposes specific alternatives",
      },
      {
        afterH2: "Step by Step: Writing Your First Submission",
        caption: "Even a single well-reasoned submission can influence policy outcomes",
      },
    ],
  },
  "5-1-reading-the-auditor-generals-reports": {
    queries: [
      "financial audit report magnifying glass",
      "accountant documents paperwork desk",
      "transparency accountability checklist review",
    ],
    placements: [
      {
        afterH2: "The Constitutional Watchdog: What AGSA Is and Why It Matters",
        caption: "The Auditor-General audits every government department and public entity annually",
      },
      {
        afterH2: "The Five Audit Outcomes: A Vocabulary for Accountability",
        caption: "Audit outcomes range from clean audit to disclaimer — each telling a different story",
      },
      {
        afterH2: "The Language of Financial Failure: Key Terms You Need to Know",
        caption: "Understanding audit terminology is essential for reading government accountability reports",
      },
    ],
  },
  "5-2-using-government-data": {
    queries: [
      "data analytics charts dashboard",
      "census survey statistics research",
      "open data laptop screen graphs",
    ],
    placements: [
      {
        afterH2: "National Treasury: Following the Rands and Cents",
        caption: "Treasury publishes detailed budget data that anyone can access and analyse",
      },
      {
        afterH2: "Statistics South Africa: Measuring the Country",
        caption: "Stats SA surveys and censuses provide the baseline data for policy decisions",
      },
      {
        afterH2: "The Parliamentary Monitoring Group: Parliament's Public Memory",
        caption: "PMG records and publishes detailed minutes of every parliamentary committee meeting",
      },
    ],
  },
  "5-3-becoming-an-active-citizen": {
    queries: [
      "community activism volunteers teamwork",
      "citizen engagement voting civic duty",
      "grassroots organizing community empowerment",
    ],
    placements: [
      {
        afterH2: "What Makes Civic Engagement Work: The TAC Model",
        caption: "The Treatment Action Campaign showed how informed, organised citizens can change policy",
      },
      {
        afterH2: "Know Your Entry Points: Where You Can Engage",
        caption: "Effective civic engagement starts with knowing where and when to direct your energy",
      },
      {
        afterH2: "The Honest Obstacles",
        caption: "Civic participation faces real barriers — but understanding them is the first step to overcoming them",
      },
    ],
  },

  // ---- Economic Growth & Development series (Item 39 Batch 1) ----

  // eg-1-1: South Africa is stuck at $7,000 GDP per capita — diagnosis using Porter and complexity frameworks.
  "eg-1-1-the-seven-thousand-rand-economy": {
    queries: [
      "South Africa township shop trader",
      "Johannesburg skyline economy buildings",
      "factory worker manufacturing line",
    ],
    placements: [
      {
        afterH2: "Making Seven Thousand Dollars Concrete",
        caption: "Daily economic life in South Africa runs on incomes the official averages obscure",
      },
      {
        afterH2: "The Atlas of Economic Complexity: What South Africa Actually Makes",
        caption: "What an economy exports reveals which productive capabilities it has actually built",
      },
      {
        afterH2: "What Stagnation Means for Ordinary South Africans",
        caption: "A decade of flat output per person shows up first in household budgets",
      },
    ],
  },
  // eg-1-2: SA's economy was deliberately structured by colonialism and apartheid; post-1994 policy accelerated deindustrialisation.
  "eg-1-2-how-we-got-here": {
    queries: [
      "South African gold mine shaft",
      "abandoned factory industrial decay",
      "migrant labour mine workers",
    ],
    placements: [
      {
        afterH2: "The Colonial Extractive Economy: Minerals, Labour, and the Architecture of Dependence",
        caption: "Mineral extraction and migrant labour built the foundations of the modern South African economy",
      },
      {
        afterH2: "Post-1994: The Policy Trajectory That Accelerated Deindustrialisation",
        caption: "Manufacturing's share of output fell as trade liberalisation outpaced industrial upgrading",
      },
      {
        afterH2: "What the Comparator Countries Did Differently",
        caption: "Countries that escaped middle-income stagnation made deliberate industrial choices South Africa avoided",
      },
    ],
  },
  // eg-1-3: Six comparator countries (Chile, Vietnam, Malaysia, Korea, Botswana, Poland) show how nations escaped stagnation.
  "eg-1-3-the-comparator-countries": {
    queries: [
      "Vietnam factory workers manufacturing",
      "Seoul South Korea skyline",
      "container port shipping cranes",
    ],
    placements: [
      {
        afterH2: "Vietnam — From War-Devastation to Manufacturing Magnet",
        caption: "Vietnam's manufacturing surge transformed a war-ravaged economy into a global production hub",
      },
      {
        afterH2: "South Korea — The Innovation Transition",
        caption: "South Korea built world-leading firms by sequencing efficiency-led growth into innovation-led growth",
      },
      {
        afterH2: "Common Threads — What All Six Got Right",
        caption: "Six different countries, six different sectors, but the institutional patterns rhyme",
      },
    ],
  },
  // eg-2-1: Optimise existing resource sectors — beneficiation, agriculture, energy, logistics — before chasing new ones.
  "eg-2-1-resource-optimisation": {
    queries: [
      "platinum mining smelter operations",
      "South African farm citrus harvest",
      "freight rail coal export",
    ],
    placements: [
      {
        afterH2: "Reframing the Beneficiation Debate",
        caption: "Adding processing steps to mineral exports captures value that raw ore shipments leave on the table",
      },
      {
        afterH2: "Agriculture Value Chain Upgrading",
        caption: "Citrus, wine and processed foods show where South African agriculture moves up the value chain",
      },
      {
        afterH2: "Logistics Corridor Modernisation",
        caption: "Rail and port corridors decide whether resource exports reach world markets at competitive cost",
      },
    ],
  },
  // eg-2-2: Energy, logistics, water and digital infrastructure crises bottleneck the entire economy.
  "eg-2-2-infrastructure-foundations": {
    queries: [
      "electricity power station transmission",
      "Durban port container terminal",
      "water reservoir treatment plant",
    ],
    placements: [
      {
        afterH2: "The Energy Crisis: How South Africa Lost the Lights",
        caption: "Two decades of underinvestment turned Eskom from a continental asset into a national constraint",
      },
      {
        afterH2: "The Logistics Crisis: When the Supply Chain Breaks",
        caption: "Port and rail bottlenecks cost exporters billions and erode the case for South African manufacturing",
      },
      {
        afterH2: "Water: The Crisis Nobody Talks About",
        caption: "Ageing pipes and overstretched dams make water the next infrastructure crisis already underway",
      },
    ],
  },
  // eg-2-3: SA has R49.9 trillion in financial assets but a R150 billion annual investment gap — financing is misallocated.
  "eg-2-3-financing-the-build": {
    queries: [
      "skyscraper financial district city",
      "construction crane infrastructure project",
      "bank vault financial institution",
    ],
    placements: [
      {
        afterH2: "Where the Money Actually Sits",
        caption: "Financial centres concentrate the pension and asset management pools that could fund South Africa's infrastructure build",
      },
      {
        afterH2: "How Banks Turned Away from the Real Economy",
        caption: "Bank balance sheets shifted toward consumer credit and government bonds rather than productive investment",
      },
      {
        afterH2: "What This Means for the Growth Strategy",
        caption: "Closing the investment gap is a financial-architecture problem, not a savings problem",
      },
    ],
  },
  // eg-2-4: Stage 2 efficiency-driven growth — manufacturing, services, skills, regulation, regional integration.
  "eg-2-4-the-efficiency-transition": {
    queries: [
      "automotive assembly line workers",
      "call centre office workers",
      "vocational training technical students",
    ],
    placements: [
      {
        afterH2: "Manufacturing Scale-Up: Where South Africa Can Realistically Compete",
        caption: "Automotive and components manufacturing show where South African industry already operates at global scale",
      },
      {
        afterH2: "The Education-to-Employment Pipeline: Where Stage 2 Will Be Won or Lost",
        caption: "Technical and vocational training is the binding constraint on efficiency-driven growth",
      },
      {
        afterH2: "The SADC Integration Opportunity: Market Scale as Manufacturing Prerequisite",
        caption: "Regional markets give manufacturers the scale that domestic demand alone cannot provide",
      },
    ],
  },
  // eg-2-5: Stage 3 innovation-driven growth — R&D, venture capital, university-industry, IP, defence spillovers.
  "eg-2-5-innovation-driven-growth": {
    queries: [
      "research laboratory scientist microscope",
      "university engineering students lab",
      "tech startup office computers",
    ],
    placements: [
      {
        afterH2: "R&D Intensity: The Fundamental Metric",
        caption: "Research spending as a share of GDP is the single best predictor of long-run innovation capacity",
      },
      {
        afterH2: "University-Industry Collaboration: The Missing Bridge",
        caption: "The link between university research and commercial product is where most innovation systems succeed or fail",
      },
      {
        afterH2: "South Africa's Existing Innovation Pockets",
        caption: "Pockets of world-class innovation already exist in South African firms and research institutions",
      },
    ],
  },
  // eg-3-1: Three engines — new ventures, export diversification, new financing vehicles — must run in parallel.
  "eg-3-1-three-engines-of-growth": {
    queries: [
      "small business entrepreneur shop",
      "container ship loading export",
      "venture capital pitch meeting",
    ],
    placements: [
      {
        afterH2: "Engine One: New Venture Creation and Scaling",
        caption: "Small and medium firms are where most net new jobs are created in successful economies",
      },
      {
        afterH2: "Engine Two: Export Diversification",
        caption: "Export diversification reduces commodity risk and forces firms to compete at world standards",
      },
      {
        afterH2: "Engine Three: New Financing Vehicles",
        caption: "New financing vehicles channel domestic savings into the productive economy",
      },
    ],
  },
  // eg-3-2: SA writes excellent strategies but lacks an execution machine — Malaysia, Singapore, Korea show the model.
  "eg-3-2-the-execution-machine": {
    queries: [
      "Singapore government building skyline",
      "project management office whiteboard",
      "government complex modern architecture",
    ],
    placements: [
      {
        afterH2: "Malaysia's Economic Planning Unit — The Gold Standard",
        caption: "Malaysia's Economic Planning Unit shows how a coordinating body translates strategy into delivery",
      },
      {
        afterH2: "What This Looks Like for South Africa",
        caption: "An execution machine sits inside the Presidency with the authority to enforce delivery across departments",
      },
      {
        afterH2: "Operation Vulindlela — What Is Possible and What Is Missing",
        caption: "Operation Vulindlela proves South Africa can execute when the institutional design is right",
      },
    ],
  },
  // eg-3-3: SA measures prolifically (DPME, AGSA) but rarely acts on findings — closing the M&E loop.
  "eg-3-3-watching-the-watchers": {
    queries: [
      "audit office financial documents",
      "data analyst dashboard monitor",
      "performance review meeting officials",
    ],
    placements: [
      {
        afterH2: "The Auditor-General: Africa's Most Sophisticated Public Audit",
        caption: "The Auditor-General produces world-class findings that government too rarely converts into corrective action",
      },
      {
        afterH2: "The Gap Between Measurement and Action",
        caption: "South Africa's monitoring system surfaces problems faster than its political system responds to them",
      },
      {
        afterH2: "What Would an Effective M&E System Look Like?",
        caption: "An effective monitoring system links findings to consequences for the officials responsible",
      },
    ],
  },
  // eg-4-1: Methodology for a single Municipal Performance Index built from public data across four pillars.
  "eg-4-1-the-municipal-performance-index": {
    queries: [
      "municipal water meter installation",
      "city hall South Africa exterior",
      "data spreadsheet analysis municipal",
    ],
    placements: [
      {
        afterH2: "Why a Municipal Performance Index Matters",
        caption: "A single comparable score lets residents see how their municipality performs against peers",
      },
      {
        afterH2: "The Indicators: What Gets Measured",
        caption: "Indicators draw from financial, service-delivery, governance and economic data already in the public record",
      },
      {
        afterH2: "Data Sources and Where to Find Them",
        caption: "Treasury, Stats SA and the Auditor-General publish the raw data the MPI assembles",
      },
    ],
  },
  // eg-4-2: Applying the MPI to the eight metros — Cape Town leads, others trail by 32 points.
  "eg-4-2-the-metro-rankings": {
    queries: [
      "Cape Town aerial city view",
      "urban metro train commuters",
      "residential houses aerial neighbourhood",
    ],
    placements: [
      {
        afterH2: "Cape Town: The Economic Pillar Worked Example",
        caption: "Cape Town's economic pillar score reflects its tax base, business environment and own-revenue strength",
      },
      {
        afterH2: "Johannesburg: Where the Numbers Diverge",
        caption: "Johannesburg's score diverges across pillars, exposing the gap between scale and governance quality",
      },
      {
        afterH2: "Peer Group Stratification: Why Comparing a Metro to a Rural Municipality is Unfair",
        caption: "Fair comparison requires grouping municipalities by category before ranking their performance",
      },
    ],
  },
  // eg-4-3: SA writes more infrastructure plans than peers but delivers far less — five-dimension delivery diagnosis.
  "eg-4-3-infrastructure-planning-vs-reality": {
    queries: [
      "stalled construction site abandoned",
      "road construction earthworks machinery",
      "engineer site inspection hardhat",
    ],
    placements: [
      {
        afterH2: "The McKinsey Framework: Five Dimensions of Infrastructure Delivery",
        caption: "Five dimensions — selection, finance, delivery, regulation, capability — determine whether plans become projects",
      },
      {
        afterH2: "Sector-by-Sector Scorecard",
        caption: "Energy, transport, water and digital infrastructure each show different patterns of planning-to-delivery failure",
      },
      {
        afterH2: "Why the Gap Persists",
        caption: "The planning-execution gap is institutional, not technical — capacity sits in plans, not delivery teams",
      },
    ],
  },
  // eg-5-1: Every reform produces winners and losers — political economy is the binding constraint, not technical design.
  "eg-5-1-the-political-economy-of-growth": {
    queries: [
      "trade union workers protest",
      "parliament debate chamber session",
      "business leaders boardroom meeting",
    ],
    placements: [
      {
        afterH2: "Mapping the Winners and Losers",
        caption: "Every reform redistributes income and risk — naming the affected groups is the first political task",
      },
      {
        afterH2: "The Social Compact: Learning from Others",
        caption: "Social compacts work when government, labour and business each give up something they value",
      },
      {
        afterH2: "Parliamentary Accountability: The Missing Link",
        caption: "Parliament is where reform trade-offs should be debated openly rather than negotiated behind closed doors",
      },
    ],
  },
  // eg-5-2: Translating strategy into sequenced milestones, dashboards and accountability — Rwanda's EDPRS as model.
  "eg-5-2-from-strategy-to-reality": {
    queries: [
      "African city skyline modern",
      "strategic planning whiteboard team",
      "government press conference podium",
    ],
    placements: [
      {
        afterH2: "Why Sequencing Matters More Than Strategy",
        caption: "Strategies fail not because the goals are wrong but because the sequence of milestones is missing",
      },
      {
        afterH2: "The Transparent Dashboard: Learning from Rwanda's EDPRS",
        caption: "Public delivery dashboards translate strategic targets into milestones citizens can track in real time",
      },
      {
        afterH2: "The Annual Strategy Review: South Africa's Missing Institution",
        caption: "An annual strategy review forces government to defend last year's results before setting next year's targets",
      },
    ],
  },
  // eg-5-3: How citizens read the MTBPS, use the MPI, evaluate manifestos, and engage local economic development.
  "eg-5-3-your-economic-citizenship": {
    queries: [
      "person reading newspaper budget",
      "community meeting residents discussion",
      "voter ballot box election",
    ],
    placements: [
      {
        afterH2: "Reading the Medium Term Budget Policy Statement",
        caption: "The MTBPS is the single best annual document for tracking whether economic promises survive contact with the fiscus",
      },
      {
        afterH2: "Engaging Local Economic Development",
        caption: "Local Economic Development units are where most citizens can shape economic policy in practice",
      },
      {
        afterH2: "Election-Season Engagement: Reading Party Manifestos",
        caption: "Manifestos deserve to be read against a fixed checklist rather than evaluated on rhetoric alone",
      },
    ],
  },

  // ---- Human Development series (Item 39 Batch 2) ----

  // hd-1-1: GDP misses what matters; Sen's capabilities approach and the HDI measure development as a life people can live.
  "hd-1-1-beyond-gdp": {
    queries: [
      "person reading library books",
      "community health worker home visit",
      "school children classroom Africa",
    ],
    placements: [
      {
        afterH2: "The GDP Illusion",
        caption: "National output figures hide the daily reality of how households actually live and spend",
      },
      {
        afterH2: "The Human Development Index: Anatomy of a Measure",
        caption: "Health, education and income together capture the freedoms an economy delivers to its people",
      },
      {
        afterH2: "From Numbers to Lives",
        caption: "Development is ultimately measured in the choices ordinary people are free to make",
      },
    ],
  },
  // hd-1-2: South Africa scores 0.713 on HDI but collapses to 0.468 once inequality is factored in.
  "hd-1-2-south-africas-report-card": {
    queries: [
      "health clinic exterior building",
      "primary school classroom desks",
      "aerial city neighbourhoods view",
    ],
    placements: [
      {
        afterH2: "Dimension One: A Nation's Health",
        caption: "Public clinics carry the weight of measuring a country's average lifespan",
      },
      {
        afterH2: "Dimension Three: What South Africans Earn",
        caption: "Household income data reveals the spread that national averages quietly absorb",
      },
      {
        afterH2: "What the Gap Reveals",
        caption: "The distance between headline and inequality-adjusted scores maps unequal access to the same country",
      },
    ],
  },
  // hd-1-3: Safety, growth and development are one reinforcing system — broken in SA, virtuous in successful peers.
  "hd-1-3-the-reinforcing-cycle": {
    queries: [
      "construction workers building site",
      "community meeting outdoor gathering",
      "interlocking gears machinery close",
    ],
    placements: [
      {
        afterH2: "The Three Pillars as a System",
        caption: "Safety, growth and development connect like gears — each turn depends on the others moving",
      },
      {
        afterH2: "The Virtuous Cycle",
        caption: "Investment, learning and stable neighbourhoods compound into rising living standards over time",
      },
      {
        afterH2: "What This Means for Policy",
        caption: "Policy gains traction when it acts on safety, growth and development as a single connected system",
      },
    ],
  },
  // hd-1-4: The Carnegie Commission named white poverty in the 1930s; post-1994 black poverty has had no comparable diagnostic project.
  "hd-1-4-the-problem-that-has-no-name": {
    queries: [
      "old library archive books",
      "historical archive photographs vintage",
      "researcher writing notes desk",
    ],
    placements: [
      {
        afterH2: "What You Name, You Can Solve",
        caption: "Naming a social problem precisely is what makes systematic policy responses possible",
      },
      {
        afterH2: "The Carnegie Commission: Anatomy of a Named Problem",
        caption: "The 1930s commission produced volumes of fieldwork that turned poverty into a researchable subject",
      },
      {
        afterH2: "What a Named Problem Would Look Like",
        caption: "A named problem gets a research agenda, a budget line and a department accountable for solving it",
      },
    ],
  },
  // hd-2-1: SA's life expectancy is roughly ten years below where its income predicts — HIV, TB, maternal and child mortality drive the gap.
  "hd-2-1-the-life-expectancy-deficit": {
    queries: [
      "community health centre exterior Africa",
      "pharmacy dispensing medication shelves",
      "public health nurse outreach",
    ],
    placements: [
      {
        afterH2: "The Preston Curve and South Africa's Outlier Position",
        caption: "Income predicts longevity across countries, and the outliers tell you where health systems are failing",
      },
      {
        afterH2: "The Treatment Cascade: 95-79-93",
        caption: "Each step from diagnosis to suppression is where the cascade either holds or leaks",
      },
      {
        afterH2: "What Closing the Gap Would Take: A Policy Roadmap",
        caption: "Closing the deficit means primary care that reaches every district, not just every province",
      },
    ],
  },
  // hd-2-2: Interpersonal violence, GBV and road deaths subtract three to four years from national life expectancy.
  "hd-2-2-violence-as-public-health-crisis": {
    queries: [
      "hospital emergency entrance ambulance",
      "support service reception desk",
      "community safety walk neighbourhood",
    ],
    placements: [
      {
        afterH2: "The Numbers That Should Shock",
        caption: "Trauma units absorb the daily volume that national mortality statistics summarise into a single line",
      },
      {
        afterH2: "The Trauma System Under Siege",
        caption: "Emergency departments operate as the front line where violence becomes a measurable health cost",
      },
      {
        afterH2: "What the Evidence Shows Works",
        caption: "Coordinated responses across health, policing and social services consistently outperform single-agency efforts",
      },
    ],
  },
  // hd-2-3: SA spends 8.5% of GDP on health but splits it between two systems; growth is the binding constraint on universal coverage.
  "hd-2-3-the-fiscal-arithmetic-of-health": {
    queries: [
      "hospital building exterior modern",
      "medical records files clipboard",
      "health worker training session",
    ],
    placements: [
      {
        afterH2: "Health Spending in International Context",
        caption: "Comparing health budgets across countries shows where the rand actually buys care",
      },
      {
        afterH2: "Health Worker Crisis",
        caption: "The pipeline of doctors, nurses and pharmacists is what determines whether budgets reach patients",
      },
      {
        afterH2: "The Path Forward: Growth as Health Policy",
        caption: "A growing tax base is what eventually makes universal coverage fiscally durable",
      },
    ],
  },
  // hd-3-1: SA spends among the most on education globally but ranks near the bottom on learning outcomes.
  "hd-3-1-the-schooling-paradox": {
    queries: [
      "primary school classroom Africa",
      "students reading textbook desk",
      "school library books shelves",
    ],
    placements: [
      {
        afterH2: "The Spending Numbers",
        caption: "Per-learner spending in South Africa exceeds many peer countries with stronger results",
      },
      {
        afterH2: "The Foundation Phase Crisis",
        caption: "Whether a child can read for meaning by Grade 4 shapes everything that follows",
      },
      {
        afterH2: "What Works: Evidence from South Africa and Globally",
        caption: "Structured lesson plans and reading benchmarks consistently lift outcomes across school systems",
      },
    ],
  },
  // hd-3-2: Children cannot learn when they walk through violent neighbourhoods, eat poorly, and study in overcrowded homes.
  "hd-3-2-learning-in-a-war-zone": {
    queries: [
      "child walking school path morning",
      "school feeding scheme meal tray",
      "children studying home table",
    ],
    placements: [
      {
        afterH2: "The Neuroscience of Stress and Learning",
        caption: "The brain under chronic stress allocates attention to threat rather than to what teachers are teaching",
      },
      {
        afterH2: "Hunger and Learning",
        caption: "School feeding schemes turn cognitive bandwidth back toward the lesson on the board",
      },
      {
        afterH2: "What Would It Take?",
        caption: "Safer routes, better nutrition and study space at home are education investments by another name",
      },
    ],
  },
  // hd-3-3: SA's economy cannot absorb the workers its education system produces — skills mismatch and structural unemployment.
  "hd-3-3-from-classroom-to-paycheck": {
    queries: [
      "vocational training workshop tools",
      "young job seekers queue",
      "apprentice technician workbench",
    ],
    placements: [
      {
        afterH2: "Economic Complexity and Human Capital",
        caption: "An economy makes more sophisticated products only as fast as its workforce learns to make them",
      },
      {
        afterH2: "The TVET Question",
        caption: "Technical and vocational colleges are the bridge most successful economies invest in heavily",
      },
      {
        afterH2: "The Reinforcing Cycle: Education, Growth, and More Education",
        caption: "Productive jobs justify staying in school, and more schooling fills the productive jobs that follow",
      },
    ],
  },
  // hd-4-1: South Korea, Botswana, Rwanda and Malaysia each built the development cycle from harder starting points than SA.
  "hd-4-1-when-the-cycle-works": {
    queries: [
      "modern factory production line",
      "agricultural cooperative farmers field",
      "city skyline development cranes",
    ],
    placements: [
      {
        afterH2: "South Korea: From War to Wonder",
        caption: "Industrial scale-up combined with universal schooling reshaped a war-flattened economy within a generation",
      },
      {
        afterH2: "Rwanda: From Genocide to Growth",
        caption: "Disciplined public administration and primary health investment rebuilt institutions from the ground up",
      },
      {
        afterH2: "The Common Pattern",
        caption: "Different countries, different sectors, but the institutional sequencing rhymes across every successful case",
      },
    ],
  },
  // hd-4-2: SA is not stagnating — it is actively spiralling downward, with brain drain, state capture and fiscal squeeze breaking the cycle.
  "hd-4-2-south-africas-broken-cycle": {
    queries: [
      "abandoned office building decay",
      "load shedding candles dark room",
      "departures airport terminal travellers",
    ],
    placements: [
      {
        afterH2: "The Vicious Spiral Mapped",
        caption: "Each weakening link pulls the next one down, turning shocks into compounding losses",
      },
      {
        afterH2: "The Brain Drain: Bleeding Capability",
        caption: "Skilled emigration thins the institutional capacity that built whatever still functions",
      },
      {
        afterH2: "Can the Spiral Be Reversed?",
        caption: "Reversing a spiral means stabilising one link well enough to take pressure off the others",
      },
    ],
  },
  // hd-4-3: Development must respect planetary limits — energy modernisation and the water-energy-food nexus.
  "hd-4-3-development-within-limits": {
    queries: [
      "solar panels installation sunshine",
      "wind turbines landscape farm",
      "water reservoir dam landscape",
    ],
    placements: [
      {
        afterH2: "South Africa's Environmental Challenges",
        caption: "Coal-heavy electricity and stressed catchments define the environmental ledger development has to balance",
      },
      {
        afterH2: "Renewable Energy as Economic Opportunity",
        caption: "Wind and solar build-outs add generation capacity and industrial work at the same time",
      },
      {
        afterH2: "The Case for Leapfrogging",
        caption: "Newer infrastructure can skip the dirtiest stage of development that earlier industrialisers passed through",
      },
    ],
  },
  // hd-5-1: Sections 26-29 of the Bill of Rights are enforceable; citizens can use HDI, DHB and school data to hold government to them.
  "hd-5-1-your-development-rights": {
    queries: [
      "constitution book legal document",
      "data dashboard laptop charts",
      "citizen filing complaint office",
    ],
    placements: [
      {
        afterH2: "The Bill of Rights: Sections 26–29",
        caption: "Housing, healthcare, food, water, social security and education are written as enforceable claims",
      },
      {
        afterH2: "Tool 3: Municipal Service Delivery Data",
        caption: "Municipal performance data lets residents track the services their rights actually depend on",
      },
      {
        afterH2: "Putting It All Together: A Practical Accountability Workflow",
        caption: "An accountability workflow turns data and rights into a sequence of letters, meetings and follow-ups",
      },
    ],
  },
  // hd-5-2: The development cycle is built or broken at the local level — SGBs, CPFs, ward committees, clinic committees, LED.
  "hd-5-2-building-the-cycle": {
    queries: [
      "parents school meeting classroom",
      "community policing forum gathering",
      "community meeting hands together",
    ],
    placements: [
      {
        afterH2: "School Governing Bodies: The Education Link",
        caption: "School governing bodies are where parents shape the institution their children attend each day",
      },
      {
        afterH2: "Community Policing Forums: The Safety Link",
        caption: "Community policing forums coordinate residents and station commanders around shared local priorities",
      },
      {
        afterH2: "Building Coalitions Across the Cycle",
        caption: "Coalitions across health, education, safety and economic forums lift each link by reinforcing the others",
      },
    ],
  },
  // ss-1-1: Colonial and apartheid policing built a system designed for control, not safety — and 1994 inherited that design.
  "ss-1-1-order-through-oppression": {
    queries: [
      "vintage colonial archive photograph",
      "old police badge uniform vintage",
      "south africa parliament building cape town",
    ],
    placements: [
      {
        afterH2: "Colonial Policing: Built to Extract, Not to Protect",
        caption: "Colonial-era policing was instrumented around extraction and pass laws, not the safety of the policed",
      },
      {
        afterH2: "Apartheid's Perfection of the Control Model",
        caption: "Apartheid refined the inherited control model into a paramilitary instrument of racial governance",
      },
      {
        afterH2: "The 1994 Transition: Democracy's Impossible Inheritance",
        caption: "The 1994 democratic state inherited a single police service welded together from eleven incompatible forces",
      },
    ],
  },
  // ss-1-2: The post-1994 system was first overwhelmed by a crime explosion, then deliberately hollowed out by state capture.
  "ss-1-2-from-rainbow-nation-to-state-capture": {
    queries: [
      "newspaper headlines stack archive",
      "detective investigation files folders",
      "parliament chamber empty hall",
    ],
    placements: [
      {
        afterH2: "Act One: The Crime Explosion (1994–2004)",
        caption: "The first decade of democracy was defined by a crime wave the new system was structurally unprepared to absorb",
      },
      {
        afterH2: "Act Two: The Mbeki Era and the Scorpions (1999–2008)",
        caption: "Specialist investigation units briefly closed the gap between crime and consequence before being dismantled",
      },
      {
        afterH2: "Act Three: State Capture and the Deliberate Hollowing Out (2009–2018)",
        caption: "State capture turned the criminal justice system from understaffed to deliberately disabled",
      },
    ],
  },
  // ss-2-1: A data-driven walk through the criminal justice pipeline showing where cases are lost stage by stage.
  "ss-2-1-the-broken-pipeline": {
    queries: [
      "police station building exterior",
      "evidence box files shelves",
      "empty courtroom interior bench",
    ],
    placements: [
      {
        afterH2: "Stage Two: Case Registration — The Station-Level Filter",
        caption: "Most cases that survive reporting are filtered out at the station counter before a docket is opened",
      },
      {
        afterH2: "Stage Three: Investigation — Where Most Cases Go to Die",
        caption: "Investigation is the stage where the largest share of opened cases quietly stalls and is closed",
      },
      {
        afterH2: "Stage Five: The Court System — Justice Delayed Indefinitely",
        caption: "By the time cases reach a courtroom, years of delay have eroded evidence, witnesses, and public faith",
      },
    ],
  },
  // ss-2-2: Policing resources are distributed unequally across geography — your safety depends on your postcode.
  "ss-2-2-policing-a-divided-country": {
    queries: [
      "rural dirt road landscape africa",
      "south africa neighbourhood streets",
      "suburban gated community wall",
    ],
    placements: [
      {
        afterH2: "Rural Policing: The Near-Absence of the State",
        caption: "Rural beats stretch across distances that make a police response time of hours the structural norm",
      },
      {
        afterH2: "Township and Informal Settlement Policing: The Apartheid Inheritance on the Ground",
        caption: "Townships and informal settlements inherited a policing footprint built for surveillance, not service",
      },
      {
        afterH2: "The Parallel System: Private Security",
        caption: "Behind suburban walls, a parallel security system fills the gap that public policing leaves",
      },
    ],
  },
  // ss-2-3: Fifty thousand people sit in remand detention without conviction — a constitutional emergency hidden in plain sight.
  "ss-2-3-justice-delayed-rights-denied": {
    queries: [
      "courthouse columns exterior building",
      "judge gavel wooden bench",
      "prison corridor empty institutional",
    ],
    placements: [
      {
        afterH2: "How People End Up in Remand: The Bail System's Structural Bias",
        caption: "The bail system filters by ability to pay before it filters by flight risk or danger to the community",
      },
      {
        afterH2: "The Court Delays That Perpetuate the Crisis",
        caption: "Postponements stack on postponements as the same case returns to the same court for another delay",
      },
      {
        afterH2: "The Constitutional Rights That Exist on Paper",
        caption: "Section 35 rights to a speedy trial exist on paper while remand populations grow year on year",
      },
    ],
  },
  // ss-2-4: The criminal justice system fails GBV survivors at every stage — but Thuthuzela Care Centres show what works.
  "ss-2-4-the-systems-gravest-failure": {
    queries: [
      "support centre office building exterior",
      "case file folders desk paperwork",
      "medical clinic reception waiting area",
    ],
    placements: [
      {
        afterH2: "Stage One: The Police Station — Where Survivors Are Failed First",
        caption: "The first contact between survivor and state happens at a counter that decides whether a case begins at all",
      },
      {
        afterH2: "Stage Two: Investigation — Where Dockets Disappear",
        caption: "GBV dockets are lost at higher rates than any other case category, often before any suspect is identified",
      },
      {
        afterH2: "The Thuthuzela Care Centres: An Island of Good Practice",
        caption: "Thuthuzela centres co-locate medical care, evidence collection and counselling in one survivor-centred site",
      },
    ],
  },
  // ss-2-5: The private security industry outnumbers SAPS — a symptom of state failure that turns safety into a commodity.
  "ss-2-5-the-private-security-paradox": {
    queries: [
      "security guard uniform back view",
      "armed response vehicle estate gate",
      "cctv camera mounted wall",
    ],
    placements: [
      {
        afterH2: "The Scale: An Industry Larger Than the Police",
        caption: "South Africa's private security workforce now exceeds the South African Police Service by a wide margin",
      },
      {
        afterH2: "The Inequality Dimension: Safety as a Commodity",
        caption: "When safety is bought rather than provided, the line between protected and unprotected tracks the income line",
      },
      {
        afterH2: "The Accountability Gap: When Private Security Operates as Quasi-Police",
        caption: "Private operators carry out functions that look like policing without the oversight that policing requires",
      },
    ],
  },
  // ss-3-1: South Africa could rebuild policing on a constitutional three-tier model — national, provincial, and metro.
  "ss-3-1-three-tier-policing-architecture": {
    queries: [
      "fbi style police badge insignia",
      "gendarmerie patrol vehicle europe",
      "city police uniform metro officer",
    ],
    placements: [
      {
        afterH2: "Tier 1 — National: The FBI Model",
        caption: "A narrowed national agency would specialise in serious, organised, and cross-jurisdictional crime",
      },
      {
        afterH2: "Tier 2 — Provincial: The Gendarmerie Model",
        caption: "A provincial tier modelled on European gendarmeries would carry general policing across each province",
      },
      {
        afterH2: "Tier 3 — Municipal: Elevated Metro and Community Police",
        caption: "Empowered metro and community policing would put the closest tier closest to the streets it serves",
      },
    ],
  },
  // ss-3-2: An investigating magistrate model could break the SAPS-NPA deadlock that collapses complex cases.
  "ss-3-2-independent-investigating-magistracy": {
    queries: [
      "judicial robes courtroom bench",
      "law books legal library shelves",
      "magnifying glass document evidence",
    ],
    placements: [
      {
        afterH2: "The French Model: What an Investigating Magistrate Actually Does",
        caption: "A judicial officer leads the investigation itself, bridging the gap between police work and prosecution",
      },
      {
        afterH2: "Comparative Models Beyond France",
        caption: "Italy, Spain, and the Netherlands each adapt the investigating-magistrate model to their own constitutional fit",
      },
      {
        afterH2: "Adapting the Model for South Africa: Judicial Investigation Officers",
        caption: "A South African adaptation would graft judicial investigation officers onto the existing magistracy",
      },
    ],
  },
  // ss-3-3: Community courts at municipal level could decongest magistrates' courts and incorporate restorative justice.
  "ss-3-3-community-courts-and-restorative-justice": {
    queries: [
      "community hall meeting circle chairs",
      "small town municipal building exterior",
      "people in conversation table outdoor",
    ],
    placements: [
      {
        afterH2: "The Case-Flow Triage System",
        caption: "A triage system routes minor matters to community courts and reserves magistrates for cases that need them",
      },
      {
        afterH2: "The Community Court Model",
        caption: "Community courts sit at municipal level and resolve low-stakes matters through locally accountable processes",
      },
      {
        afterH2: "Restorative Justice: What It Is and How It Works",
        caption: "Restorative processes bring victim, offender and community together to repair harm rather than only punish it",
      },
    ],
  },
  // ss-3-4: A sentencing commission with structured guidelines could replace blunt minimum sentences with a constitutional framework.
  "ss-3-4-sentencing-commission-and-structured-guidelines": {
    queries: [
      "scales of justice statue close",
      "meeting boardroom conference table",
      "data analytics dashboard charts screen",
    ],
    placements: [
      {
        afterH2: "The Current Framework: Act 105 and Its Problems",
        caption: "Minimum sentences applied uniformly produce results that are simultaneously too rigid and too arbitrary",
      },
      {
        afterH2: "The Proposed Reform: A South African Sentencing Commission",
        caption: "A standing commission would issue structured guidelines that judges apply with reasoned departures",
      },
      {
        afterH2: "Real-Time Sentencing Analytics",
        caption: "Live sentencing data would let the commission see disparities as they emerge, not years after the fact",
      },
    ],
  },
  // ss-3-5: A corrections system that warehouses guarantees a 40 per cent recidivism cycle — rehabilitation is a constitutional mandate.
  "ss-3-5-rehabilitation-as-constitutional-mandate": {
    queries: [
      "vocational training workshop tools",
      "library books learning education",
      "open keys lock release symbolic",
    ],
    placements: [
      {
        afterH2: "The Constitutional Foundation for Rehabilitation",
        caption: "Section 35 frames imprisonment as a deprivation of liberty, not a withdrawal of the right to grow",
      },
      {
        afterH2: "Comparative Lessons: What Low-Recidivism Systems Do Differently",
        caption: "Norway, Germany and the Netherlands invest in skills, education and structured re-entry rather than warehousing",
      },
      {
        afterH2: "What a Rehabilitation-Centred System Would Require",
        caption: "A rehabilitation-centred system pairs work, study and counselling with structured release into stable housing",
      },
    ],
  },
  // ss-4-1: South Africa has enough plans — what's missing is sequencing. Some reforms are prerequisites for others.
  "ss-4-1-sequencing-reform": {
    queries: [
      "project roadmap timeline planning",
      "construction scaffolding building phase",
      "south africa constitution document cover",
    ],
    placements: [
      {
        afterH2: "Phase 1: Investigation and Prosecution Reform (Years 1–3)",
        caption: "The first phase rebuilds the upstream stages where most cases are currently lost",
      },
      {
        afterH2: "Phase 2: Court Reform and Policing Restructuring (Years 3–5)",
        caption: "The second phase reorganises courts and policing once the upstream pipeline is producing usable cases",
      },
      {
        afterH2: "The Legislative Agenda",
        caption: "Each phase has a matching set of bills that need to clear Parliament for the reform to take effect",
      },
    ],
  },
  // ss-4-2: The fiscal case for reform — the cost of impunity, recidivism, and lost investment exceeds the cost of fixing it.
  "ss-4-2-funding-the-delta": {
    queries: [
      "currency banknotes counted stack",
      "calculator spreadsheet budget desk",
      "treasury building government finance",
    ],
    placements: [
      {
        afterH2: "The Current Cost Baseline",
        caption: "The current criminal justice budget already runs into tens of billions of rands a year",
      },
      {
        afterH2: "The Cost of the Status Quo",
        caption: "The hidden costs of impunity, recidivism, and lost investment outweigh the visible budget line",
      },
      {
        afterH2: "The Fiscal Pathway: Where Would the Money Come From?",
        caption: "Reform funding draws from reallocation, efficiency, and the fiscal returns that lower crime delivers",
      },
    ],
  },
  // ss-4-3: Crime statistics tell you almost nothing about justice — a 13-outcome scorecard would.
  "ss-4-3-measuring-progress": {
    queries: [
      "dashboard metrics charts monitor",
      "checklist clipboard pen office",
      "report card grades document",
    ],
    placements: [
      {
        afterH2: "The 13-Outcome Scorecard",
        caption: "Thirteen outcomes — covering reporting, conviction, attrition, remand, and trust — define what justice actually delivers",
      },
      {
        afterH2: "The Digital Infrastructure",
        caption: "A live data spine would let the scorecard update in something close to real time rather than annually",
      },
      {
        afterH2: "The Citizen's Scorecard",
        caption: "Citizens need a version of the scorecard they can read at a glance and use to hold representatives to account",
      },
    ],
  },
  // ra-1-1: Introduces the eight RAARICLE™ governance tests as plain-language tests citizens can apply to any government function.
  "ra-1-1-eight-tests": {
    queries: [
      "executive signing official document",
      "performance dashboard analytics screen",
      "office team collaboration desk",
    ],
    placements: [
      {
        afterH2: "Test 2: Accountability — Who Answers for the Outcome?",
        caption: "Accountability is the test that asks who actually answers when an outcome lands or fails to land",
      },
      {
        afterH2: "Test 5: Information — Who Has Visibility into Performance?",
        caption: "Information is the test that asks whether the people responsible can see what is actually happening",
      },
      {
        afterH2: "The Co-Location Principle",
        caption: "Co-location is the principle that the same body should hold responsibility, accountability and authority for one function",
      },
    ],
  },
  // ra-1-2: Maps the five recurring failure patterns — fragmentation, misalignment, absence, conflation, capture — across SA's governance.
  "ra-1-2-why-institutions-fail": {
    queries: [
      "office workers many desks busy",
      "scales of justice balance close",
      "dominos falling chain reaction",
    ],
    placements: [
      {
        afterH2: "Pattern 1: Fragmentation — Too Many Cooks",
        caption: "Fragmentation occurs when responsibility for one function is split so many ways that nobody is left in charge",
      },
      {
        afterH2: "Pattern 4: Conflation — Referee and Player on the Same Team",
        caption: "Conflation occurs when the same entity is asked to be both player and referee inside the same function",
      },
      {
        afterH2: "The Compounding Effect",
        caption: "When several patterns stack on the same function, their effects compound and the function collapses",
      },
    ],
  },
  // ra-2-1: A RAARICLE™ diagnosis of the DBE-to-school delivery chain — why provincial MECs are accountable for results they cannot control.
  "ra-2-1-fixing-basic-education": {
    queries: [
      "school classroom desks empty",
      "education department building exterior",
      "teacher training workshop session",
    ],
    placements: [
      {
        afterH2: "The Education Value Chain",
        caption: "Basic education is delivered through a chain that runs from national policy through provincial departments to the classroom",
      },
      {
        afterH2: "The Root Cause",
        caption: "The root cause is structural: accountability sits with provinces while the authority to act sits in national policy",
      },
      {
        afterH2: "The Reform Blueprint",
        caption: "A working reform realigns authority and accountability so the entity answering for results can also act on them",
      },
    ],
  },
  // ra-2-2: A RAARICLE™ diagnosis of the NDoH-to-clinic chain — why facility managers cannot procure essential medicines and how to rebuild it.
  "ra-2-2-fixing-primary-healthcare": {
    queries: [
      "clinic exterior small building",
      "pharmacy medicine shelves stocked",
      "nurse uniform stethoscope clinic",
    ],
    placements: [
      {
        afterH2: "The Healthcare Value Chain",
        caption: "Primary healthcare is delivered through a chain that runs from national policy to the clinic floor where care meets the patient",
      },
      {
        afterH2: "The Root Cause",
        caption: "The root cause is the gap between facility-level responsibility and the procurement authority that sits a province away",
      },
      {
        afterH2: "The Reform Blueprint",
        caption: "A working reform pushes essential procurement authority down to the facility while keeping policy at national level",
      },
    ],
  },
  // ra-2-3: A RAARICLE™ diagnosis of the most fragmented value chain in SA government — four entities per housing project, no single owner.
  "ra-2-3-fixing-human-settlements": {
    queries: [
      "rdp housing development construction",
      "housing site building blocks south africa",
      "blueprint drawing plans table",
    ],
    placements: [
      {
        afterH2: "The Human Settlements Value Chain",
        caption: "A single house passes through four different entities before a family receives the keys",
      },
      {
        afterH2: "The Root Cause",
        caption: "The root cause is fragmentation — no single entity owns the project from land assembly through to occupation",
      },
      {
        afterH2: "The Reform Blueprint",
        caption: "A working reform consolidates the chain under a single accountable delivery agent for each project",
      },
    ],
  },
  // ra-2-4: A RAARICLE™ diagnosis of the SAPS-to-courtroom delivery chain — why centralised policing fails across nine provinces.
  "ra-2-4-fixing-safety-and-security": {
    queries: [
      "police vehicle patrol street",
      "parliament building south africa",
      "officer uniform back walking",
    ],
    placements: [
      {
        afterH2: "The Criminal Justice Value Chain",
        caption: "Safety is produced by a chain that runs from prevention to investigation to prosecution to corrections",
      },
      {
        afterH2: "The Structural Root Cause",
        caption: "The structural root cause is a single national service trying to police nine provinces with one allocation model",
      },
      {
        afterH2: "The Reform Blueprint",
        caption: "A working reform splits the function into national, provincial and metro tiers, each with its own accountability",
      },
    ],
  },
  // ra-3-1: A full RAARICLE™ sphere-level diagnosis — why SA's constitutional design creates systematic provincial underperformance.
  "ra-3-1-provincial-performance-crisis": {
    queries: [
      "provincial government building south africa",
      "audit report stack documents",
      "stone columns architecture pillars",
    ],
    placements: [
      {
        afterH2: "The Structural Problem",
        caption: "Provinces inherit responsibility for outcomes without the authority or resources to deliver them",
      },
      {
        afterH2: "The Evidence",
        caption: "Auditor-General reports and service delivery indices show the underperformance is sphere-wide, not province-specific",
      },
      {
        afterH2: "The Case for Structural Reform",
        caption: "Patching individual provinces cannot fix a problem built into the constitutional architecture itself",
      },
    ],
  },
  // ra-3-2: How to resolve the authority-accountability split between national policy and provincial delivery on Schedule 4 functions.
  "ra-3-2-making-concurrent-functions-work": {
    queries: [
      "two hands shaking agreement",
      "policy document signature pen",
      "intergovernmental meeting officials table",
    ],
    placements: [
      {
        afterH2: "The Concurrent Function Problem",
        caption: "When two spheres share a function, neither holds the full set of elements needed to deliver it",
      },
      {
        afterH2: "Three Models for Concurrent Functions",
        caption: "Three working models — delegated authority, joint authority, and split authority — each fix the gap differently",
      },
      {
        afterH2: "The Reform Blueprint",
        caption: "A working reform names the model for each Schedule 4 function rather than leaving the split implicit",
      },
    ],
  },
  // ra-3-3: Why Section 100 interventions in provinces have mixed results — and how to design automatic enforcement triggers.
  "ra-3-3-when-provinces-fail": {
    queries: [
      "warning light dashboard alert",
      "government meeting boardroom serious",
      "trigger lever switch industrial",
    ],
    placements: [
      {
        afterH2: "Why Interventions Fail",
        caption: "Section 100 interventions are reactive, late, and rarely accompanied by the structural reset that would prevent recurrence",
      },
      {
        afterH2: "Designing Automatic Enforcement Triggers",
        caption: "Automatic triggers tied to leading indicators move enforcement from political judgement to predictable rule",
      },
      {
        afterH2: "From Intervention to Prevention",
        caption: "The shift is from rescuing failed provinces to preventing the conditions in which provinces fail",
      },
    ],
  },
  // ra-4-1: A RAARICLE™ diagnosis of the WSA/WSP model — the regulator-provider conflation and a structural blueprint for water governance.
  "ra-4-1-fixing-water-and-sanitation": {
    queries: [
      "water tap dripping close up",
      "water reservoir tank infrastructure",
      "sanitation pipes infrastructure construction",
    ],
    placements: [
      {
        afterH2: "The Water Value Chain",
        caption: "Water and sanitation move through a chain that runs from catchment to bulk supply to household tap and back through treatment",
      },
      {
        afterH2: "The Root Cause",
        caption: "The root cause is conflation — the same municipality is asked to be both regulator and provider of water services",
      },
      {
        afterH2: "The Reform Blueprint",
        caption: "A working reform separates the regulator from the provider so accountability for quality is independent of operations",
      },
    ],
  },
  // ra-4-2: A RAARICLE™ diagnosis of municipal electricity — the cross-subsidy trap, NERSA tariff constraints, and independent power procurement.
  "ra-4-2-fixing-electricity": {
    queries: [
      "electricity power lines pylons",
      "electrical substation transformer industrial",
      "solar panels rooftop installation",
    ],
    placements: [
      {
        afterH2: "The Electricity Value Chain",
        caption: "Municipal electricity runs from generation through transmission to the meter on the wall and the tariff on the bill",
      },
      {
        afterH2: "The Root Cause",
        caption: "The root cause is the cross-subsidy trap — electricity revenue is structurally diverted to fund other municipal functions",
      },
      {
        afterH2: "The Reform Blueprint",
        caption: "A working reform unbundles distribution, opens procurement, and ring-fences electricity revenue from cross-subsidy",
      },
    ],
  },
  // ra-4-3: A RAARICLE™ diagnosis of waste management and municipal roads — the two most visible municipal service delivery failures.
  "ra-4-3-fixing-waste-and-roads": {
    queries: [
      "rubbish refuse truck collection",
      "pothole road damage close",
      "municipal worker maintenance road",
    ],
    placements: [
      {
        afterH2: "Waste Management: The Value Chain and Diagnosis",
        caption: "Waste collection runs from kerbside bin to transfer station to landfill — and breaks when any link fails",
      },
      {
        afterH2: "Municipal Roads and Stormwater: The Value Chain and Diagnosis",
        caption: "Roads and stormwater fail incrementally; the visible damage is the lagging indicator of an underfunded maintenance cycle",
      },
      {
        afterH2: "The Reform Blueprint",
        caption: "A working reform funds maintenance cycles directly rather than treating maintenance as a residual budget item",
      },
    ],
  },
  // ra-4-4: A cross-cutting RAARICLE™ diagnosis of the capability and information gaps that undermine all municipal functions.
  "ra-4-4-building-municipal-capability": {
    queries: [
      "training classroom adults learning",
      "data spreadsheet computer screen",
      "city council chamber meeting",
    ],
    placements: [
      {
        afterH2: "The Capability Crisis in Numbers",
        caption: "Vacancy rates, qualification gaps and turnover data show the capability shortfall is structural, not cyclical",
      },
      {
        afterH2: "The Information Black Hole",
        caption: "Most municipalities cannot produce real-time performance data on their own functions",
      },
      {
        afterH2: "The Reform Blueprint for Capability",
        caption: "A working reform invests in a permanent municipal cadre with portable qualifications and protected tenure",
      },
    ],
  },
  // ra-5-1: Maps each proposed RAARICLE™ reform to its legal pathway — constitutional amendment, new legislation, or doable today.
  "ra-5-1-constitutional-vs-legislative": {
    queries: [
      "south africa constitution book document",
      "parliament legislation bills paper",
      "legal gavel law desk",
    ],
    placements: [
      {
        afterH2: "The Three Legal Pathways",
        caption: "Three pathways move a reform from idea to effect — administrative action, new legislation, or constitutional amendment",
      },
      {
        afterH2: "What Can Be Done Tomorrow",
        caption: "A surprising share of the reform programme can begin immediately under existing constitutional and legislative authority",
      },
      {
        afterH2: "A Sequenced Legal Reform Programme",
        caption: "Sequencing turns a long list of reforms into a programme that builds on each prior step rather than competing with it",
      },
    ],
  },
  // ra-5-2: The five capture vectors that undermine SA institutions — and the structural defences that make capture architecturally difficult.
  "ra-5-2-anti-capture-architecture": {
    queries: [
      "fortress wall stone defence",
      "padlock chain security close",
      "audit document ledger desk",
    ],
    placements: [
      {
        afterH2: "What Capture Actually Means",
        caption: "Capture is the structural condition of an institution serving a private interest while presenting as a public one",
      },
      {
        afterH2: "Vector 1: Political Capture",
        caption: "Political capture occurs when appointment power is used to install loyalty rather than competence",
      },
      {
        afterH2: "Designing Capture-Resistant Institutions",
        caption: "Capture-resistant design separates appointment from operation, and embeds independent audit at every layer",
      },
    ],
  },
  // ra-5-3: Why SA needs a single legislated reform programme — and how RAARICLE™ builds a coherent, measurable package across all pillars.
  "ra-5-3-the-integrated-reform-programme": {
    queries: [
      "puzzle pieces fitting together",
      "project gantt chart planning",
      "cabinet meeting officials south africa",
    ],
    placements: [
      {
        afterH2: "The Case for a Legislated Reform Structure",
        caption: "A single legislated structure forces the reforms to fit together rather than compete for attention",
      },
      {
        afterH2: "The Governance Reform Programme Act",
        caption: "A Governance Reform Programme Act gives the integrated package a legal home with measurable obligations",
      },
      {
        afterH2: "Sequencing the Integrated Programme",
        caption: "Sequencing decides which reforms must land first to make later reforms possible at all",
      },
    ],
  },
  // ra-5-4: How ordinary citizens can use RAARICLE™ diagnostics to hold government accountable and become advocates for structural reform.
  "ra-5-4-from-citizen-to-reformer": {
    queries: [
      "person reading newspaper engaged",
      "data laptop research workspace",
      "community advocate microphone speaking",
    ],
    placements: [
      {
        afterH2: "Step 2: Run the Eight Tests",
        caption: "Running the eight tests on a function you care about turns frustration into a structured diagnosis",
      },
      {
        afterH2: "Step 3: Find the Data",
        caption: "Most of the data needed for a citizen diagnosis already exists — in audits, scorecards, and freely available reports",
      },
      {
        afterH2: "Step 6: Use the Channels That Exist",
        caption: "Existing channels — submissions, ward committees, courts, the press — give a structured diagnosis somewhere to land",
      },
    ],
  },
};

/**
 * Wait for the rate limit to reset if we're out of requests.
 */
async function waitForRateLimit() {
  if (rateLimitRemaining > 2) return;

  console.log(
    `\n  Rate limit: ${rateLimitRemaining} requests remaining. Pausing for 60s...`,
  );
  await new Promise((r) => setTimeout(r, 60_000));
}

/**
 * Search Unsplash for photos matching a query.
 */
async function searchUnsplash(query) {
  await waitForRateLimit();

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "3");
  url.searchParams.set("orientation", "landscape");

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  // Track rate limit from response headers
  const remaining = res.headers.get("x-ratelimit-remaining");
  if (remaining != null) {
    rateLimitRemaining = parseInt(remaining, 10);
    console.log(`  [Rate limit: ${rateLimitRemaining} requests remaining]`);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unsplash API error (${res.status}): ${text}`);
  }

  return res.json();
}

/**
 * Trigger the Unsplash download endpoint (required by API terms).
 */
async function triggerDownload(downloadLocation) {
  await fetch(downloadLocation, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
}

/**
 * Download an image URL and optimize it to WebP.
 * Returns the local path relative to public/.
 */
async function downloadAndOptimize(imageUrl, outputDir, filename) {
  mkdirSync(outputDir, { recursive: true });

  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`);

  const buffer = Buffer.from(await res.arrayBuffer());

  const outputPath = join(outputDir, `${filename}.webp`);

  await sharp(buffer)
    .resize({
      width: IMAGE_WIDTH,
      height: IMAGE_MAX_HEIGHT,
      fit: "cover",
      position: "centre",
    })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);

  const stats = await sharp(outputPath).metadata();
  const fileSize = readFileSync(outputPath).length;
  console.log(
    `  -> ${outputPath} (${stats.width}x${stats.height}, ${(fileSize / 1024).toFixed(1)}KB)`,
  );

  return outputPath;
}

/**
 * Build the alt text with caption and Unsplash attribution.
 */
function buildAlt(caption, photographerName, photographerUsername) {
  return `${caption} | Photo by ${photographerName} on Unsplash`;
}

/**
 * Normalize quotes and apostrophes so smart/curly variants match straight ones.
 */
function normalizeQuotes(str) {
  return str
    .replace(/[\u2018\u2019\u201A\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201E\u2033]/g, '"');
}

/**
 * Insert image markdown into an article after a specified H2 heading.
 * Inserts after the first paragraph following the H2.
 */
function insertImageAfterH2(content, h2Text, imageMarkdown) {
  const lines = content.split("\n");
  let h2Index = -1;
  const needle = normalizeQuotes(h2Text.slice(0, 40));

  // Find the H2 line
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ") && normalizeQuotes(lines[i]).includes(needle)) {
      h2Index = i;
      break;
    }
  }

  if (h2Index === -1) {
    console.warn(`  Warning: H2 "${h2Text.slice(0, 50)}..." not found, skipping`);
    return content;
  }

  // Find the end of the first paragraph after the H2
  // (first blank line after non-blank content following the H2)
  let insertIndex = h2Index + 1;
  let foundContent = false;

  for (let i = h2Index + 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "" && foundContent) {
      insertIndex = i + 1;
      break;
    }

    if (line !== "") {
      foundContent = true;
    }

    // Stop if we hit another heading
    if (line.startsWith("## ") && i !== h2Index) {
      insertIndex = i;
      break;
    }

    // Stop if we hit a callout directive
    if (line.startsWith(":::")) {
      insertIndex = i;
      break;
    }
  }

  lines.splice(insertIndex, 0, "", imageMarkdown, "");
  return lines.join("\n");
}

/**
 * Check if an article already has images inserted.
 */
function hasExistingImages(content) {
  return /!\[.*\]\(\/images\/articles\//.test(content);
}

async function processArticle(slug) {
  const config = ARTICLE_CONFIG[slug];
  if (!config) {
    console.log(`No config for ${slug}, skipping`);
    return;
  }

  const filePath = join(ARTICLES_DIR, `${slug}.md`);
  if (!existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  let content = readFileSync(filePath, "utf-8");

  if (hasExistingImages(content) && !FORCE) {
    console.log(`${slug}: Already has images, skipping (use --force to re-process)`);
    return;
  }

  console.log(`\nProcessing: ${slug}`);

  const imageDir = join(IMAGES_DIR, slug);

  for (let i = 0; i < config.placements.length; i++) {
    const placement = config.placements[i];
    const query = config.queries[i] || config.queries[0];

    console.log(`  Searching: "${query}"`);

    try {
      const data = await searchUnsplash(query);

      if (!data.results || data.results.length === 0) {
        console.warn(`  No results for "${query}"`);
        continue;
      }

      const photo = data.results[0];
      const filename = `img-${i + 1}`;
      const imgPath = `/images/articles/${slug}/${filename}.webp`;

      // Skip if this specific image is already in the content
      if (FORCE && content.includes(imgPath)) {
        console.log(`  img-${i + 1} already inserted, skipping`);
        continue;
      }

      // Trigger download per Unsplash API terms
      if (photo.links?.download_location) {
        await triggerDownload(photo.links.download_location);
      }

      if (!DRY_RUN) {
        await downloadAndOptimize(
          photo.urls.regular,
          imageDir,
          filename,
        );
      }

      const alt = buildAlt(
        placement.caption,
        photo.user.name,
        photo.user.username,
      );
      const imageMarkdown = `![${alt}](${imgPath})`;

      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would insert after "${placement.afterH2.slice(0, 50)}..."`);
        console.log(`  ${imageMarkdown}`);
      } else {
        content = insertImageAfterH2(content, placement.afterH2, imageMarkdown);
      }

      // Courtesy delay between requests
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`  Error processing image ${i + 1}: ${err.message}`);
    }
  }

  if (!DRY_RUN) {
    writeFileSync(filePath, content, "utf-8");
    console.log(`  Updated: ${filePath}`);
  }
}

async function main() {
  console.log("GovCompass Article Image Sourcer");
  console.log("================================");
  if (DRY_RUN) console.log("DRY RUN MODE — no files will be modified");

  if (SINGLE_ARTICLE) {
    console.log(`Processing single article: ${SINGLE_ARTICLE}\n`);
    await processArticle(SINGLE_ARTICLE);
  } else {
    const files = await readdir(ARTICLES_DIR);
    let slugs = files
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""))
      .sort();

    // Apply offset
    if (BATCH_OFFSET > 0) {
      console.log(`Skipping first ${BATCH_OFFSET} articles`);
      slugs = slugs.slice(BATCH_OFFSET);
    }

    // Apply batch size
    if (BATCH_SIZE > 0) {
      slugs = slugs.slice(0, BATCH_SIZE);
      const totalQueries = slugs.length * 3;
      console.log(
        `Batch: ${slugs.length} articles (${totalQueries} API requests)`,
      );

      if (totalQueries > 45) {
        console.warn(
          `Warning: ${totalQueries} requests may exceed the 50 req/hr limit. Consider a smaller batch.`,
        );
      }
    }

    console.log(`Articles to process: ${slugs.join(", ")}\n`);

    let processed = 0;
    for (const slug of slugs) {
      await processArticle(slug);
      processed++;

      // Between articles, show progress
      if (processed < slugs.length) {
        console.log(
          `\n--- Progress: ${processed}/${slugs.length} articles ---`,
        );
      }
    }
  }

  console.log("\nDone!");
  if (!DRY_RUN) {
    console.log("Review the images and run `npm run dev` to preview.");
  }

  if (BATCH_SIZE > 0 && !SINGLE_ARTICLE) {
    const nextOffset = BATCH_OFFSET + BATCH_SIZE;
    console.log(
      `\nNext batch: --batch=${BATCH_SIZE} --offset=${nextOffset}`,
    );
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
