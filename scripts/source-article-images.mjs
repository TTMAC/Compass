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
      "Malaysia Putrajaya government complex",
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
      "Johannesburg metro rail station",
      "South African suburb residential street",
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
      "Kigali Rwanda city skyline",
      "project timeline gantt chart",
      "government press conference podium",
    ],
    placements: [
      {
        afterH2: "Why Sequencing Matters More Than Strategy",
        caption: "Strategies fail not because the goals are wrong but because the sequence of milestones is missing",
      },
      {
        afterH2: "The Transparent Dashboard: Learning from Rwanda's EDPRS",
        caption: "Rwanda's public dashboard tracks every strategic target against quarterly milestones the public can see",
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
