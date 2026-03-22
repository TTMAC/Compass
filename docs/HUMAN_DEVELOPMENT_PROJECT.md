# Human Development Project — Knowledge Base

## Project Overview

This project explores human development measurement, alternative development indices, environmental sustainability metrics, and the synthesis of composite indices that account for both human well-being and ecological impact.

---

## 1. Human Development Index (HDI)

### What It Is

The Human Development Index (HDI) is a composite measure created by the United Nations Development Programme (UNDP) to assess a country's development beyond just economic growth. It was first introduced in 1990 by Pakistani economist Mahbub ul Haq, with significant intellectual contributions from Amartya Sen.

### Three Dimensions

1. **Health** — measured by life expectancy at birth, reflecting the ability to live a long and healthy life.
2. **Education** — measured by two indicators: mean years of schooling (for adults 25+) and expected years of schooling (for children entering school). Together these capture both achieved and anticipated knowledge.
3. **Standard of living** — measured by Gross National Income (GNI) per capita in purchasing power parity (PPP) dollars, reflecting command over resources needed for a decent living.

### How It Works

- Each dimension is normalised into an index between 0 and 1.
- The HDI is the **geometric mean** of the three dimension indices.
- Countries are classified into four tiers:
  - Very high: ≥ 0.800
  - High: 0.700–0.799
  - Medium: 0.550–0.699
  - Low: < 0.550

### Core Insight

Development is about expanding people's choices and capabilities — not just increasing national income. A country could have high GDP but poor health outcomes or limited access to education, and the HDI would reflect that gap.

---

## 2. Alternative and Comparable Indices

### UNDP Extensions of HDI

- **Inequality-adjusted HDI (IHDI)** — discounts the HDI based on inequality within each dimension. A country with high HDI but severe inequality will see a significant drop.
- **Gender Development Index (GDI)** — compares female and male HDI achievements to highlight gender gaps.
- **Gender Inequality Index (GII)** — captures gender-based disadvantage across reproductive health, empowerment, and labour market participation.
- **Multidimensional Poverty Index (MPI)** — identifies overlapping deprivations at household level across health, education, and living standards.

### Broader Development Indices

- **Social Progress Index (SPI)** — measures basic human needs, foundations of well-being, and opportunity, deliberately excluding economic indicators to see how well societies convert wealth into social outcomes.
- **Genuine Progress Indicator (GPI)** — adjusts GDP by factoring in income distribution, environmental costs, and the value of household work and volunteering.
- **OECD Better Life Index** — covers 11 dimensions (housing, income, jobs, community, education, environment, civic engagement, health, life satisfaction, safety, work-life balance) and lets users weight them according to their own priorities.
- **Legatum Prosperity Index** — combines economic and social well-being across pillars like safety, personal freedom, governance, health, and natural environment.

### Sustainability-Focused Indices

- **Planetary Pressures-adjusted HDI (PHDI)** — the UNDP's own recent addition; adjusts HDI downward based on a country's CO₂ emissions per capita and material footprint per capita. High-consuming countries take a significant hit.
- **Happy Planet Index (HPI)** — measures how efficiently countries deliver long, happy lives per unit of environmental resource consumed. Costa Rica often ranks near the top despite modest GDP.
- **Ecological Footprint** (Global Footprint Network) — not a development index per se, but often used alongside HDI to assess whether a country achieves high development within ecological limits.
- **Sustainable Development Index (SDI)** — created by Jason Hickel; divides a development achievement score (based on life expectancy, education, income) by ecological overshoot, asking "how efficiently does a country achieve human development relative to its planetary boundary share?" Favours countries like Costa Rica and Sri Lanka.
- **Environmental Performance Index (EPI)** — from Yale; focuses purely on the environmental side but could serve as one pillar of a composite index.

### Capability and Freedom-Oriented Measures

- **Human Freedom Index (HFI)** — published by the Cato Institute and Fraser Institute; measures personal and economic freedom across 80+ indicators.
- **World Happiness Report Rankings** — based on the Cantril life ladder (self-reported life satisfaction), with supporting analysis of GDP, social support, healthy life expectancy, freedom, generosity, and corruption.

### Economic Complexity and Competitiveness

- **Economic Complexity Index (ECI)** — measures the diversity and sophistication of a country's export basket; serves as a predictor of future economic growth.
- **Global Competitiveness Index (GCI)** — from the World Economic Forum; assesses institutions, infrastructure, macroeconomic stability, health, skills, and innovation capacity.

### Key Tension

The fundamental tension across all of these is what counts as "development." The HDI broadened the lens beyond GDP; the newer indices push further by asking about sustainability, inequality, freedom, and subjective well-being. No single index captures everything, which is why researchers and policymakers often use several in combination.

---

## 3. Synthesising an Environment + Human Development Index

### The Goal

Create an index that simultaneously accounts for environmental protection/sustainability and human development (as per HDI).

### Existing Precedents

1. **PHDI (Planetary Pressures-Adjusted HDI)** — introduced in the 2020 Human Development Report. Adjusts the standard HDI by factoring in per-capita CO₂ emissions and material footprint. Countries with high HDI but heavy environmental costs see their scores drop significantly.
2. **SDI (Sustainable Development Index)** — divides development achievement by ecological overshoot.
3. **EPI (Environmental Performance Index)** — Yale-based, purely environmental; could serve as one pillar of a composite.

### Designing a Custom Composite Index

A common approach: geometric or arithmetic mean of two sub-indices — one for human development and one for environmental sustainability.

#### Key Design Decisions

1. **Environmental dimensions to include** — carbon emissions, biodiversity loss, resource depletion, air/water quality, ecological footprint relative to biocapacity.
2. **Normalisation** — min-max scaling to [0, 1] is standard, but reference points (goalposts) need to be defined.
3. **Aggregation method** — a geometric mean (like HDI uses internally) penalises imbalance more than an arithmetic mean. This is arguably more appropriate since you don't want high development to "compensate" for environmental destruction.
4. **Measurement framing** — per-capita vs. absolute vs. boundary-relative. Per-capita CO₂ is straightforward, but a planetary-boundary approach (measuring overshoot of a fair Earth-share) is more theoretically grounded.

---

## 4. Environmental Considerations and Nuances

### Global Greening

- Empirically confirmed by NASA studies using MODIS and AVHRR satellite data.
- Significant increase in global leaf area — roughly 5% between 2000 and 2017.
- CO₂ fertilisation identified as the dominant driver (~70% of the greening effect), with nitrogen deposition, climate change, and land management contributing the rest.
- China and India showed particularly strong greening from reforestation and agriculture.

### Atmospheric Composition of CO₂

- CO₂ currently sits at about **0.042%** of the atmosphere (~420 ppm).
- Nitrogen: ~78%, Oxygen: ~21%, Argon: ~0.93%, Water vapour: 0–4% (varies).
- CO₂ is a trace gas by volume.
- Water vapour is the most significant greenhouse gas in absolute terms.

### CO₂ as a "Pollutant" — The Debate

- Chemically and biologically, CO₂ is not a pollutant in the way sulphur dioxide or mercury is — it is fundamental to photosynthesis.
- Current levels are low relative to the concentrations under which much of plant life evolved.
- Commercial greenhouses enriching to 800–1,200 ppm see substantial yield gains.
- The US EPA's 2009 "endangerment finding" classified it as a pollutant under the Clean Air Act based on its greenhouse warming properties — a regulatory/legal decision rather than a purely scientific one.
- The debate centres on whether the *rate of increase* and *warming effect* constitute a net harm that outweighs the fertilisation benefits.

### Evidence for Anthropogenic CO₂ Increase

- **Isotopic signature**: Fossil carbon is depleted in Carbon-13 and contains no Carbon-14. The atmosphere shows declining δ¹³C — consistent with fossil fuel combustion, not natural sources.
- **O₂ decline**: Atmospheric oxygen is falling at a rate consistent with combustion (burning hydrocarbons consumes O₂ and produces CO₂).
- **Temporal correlation**: The CO₂ rise accelerated in lockstep with industrialisation.
- **Mass balance**: Humanity emits ~36–37 Gt CO₂/year from fossil fuels; the atmospheric increase accounts for roughly half (the rest is absorbed by oceans and biosphere).
- **Ocean acidification**: Oceans are becoming more acidic, consistent with absorbing excess atmospheric CO₂.

---

## 5. Case Study: South Africa — Shifting HDI Meaningfully

### Current Position

South Africa's HDI sits at around 0.713 (rising to 0.741 in the most recent 2024 figure), placing it in the "high development" band but well below the 0.800 threshold for "very high."

| Component | Value |
|-----------|-------|
| Life expectancy | 62.3 years (2023); ~63.6 M / 69.2 F (2024) |
| Mean years of schooling | 11.3 years |
| Expected years of schooling | 13.6 years |
| GNI per capita (PPP) | ~$12,948 |
| IHDI (inequality-adjusted) | 0.462 (a 0.251-point penalty) |

### Priority 1: Life Expectancy — The Biggest Drag and Biggest Opportunity

Life expectancy is far below global peers at similar income levels. The primary reason is HIV/AIDS:

- An estimated 12.7% of the population is HIV-positive (~8 million people).
- AIDS-related deaths fell from 284,249 in 2005 (42% of all deaths) to 68,406 in 2024 (12.5%) — real progress, but a significant gap remains.
- Progress on UNAIDS 95-95-95 targets stood at **95-79-93** in 2024 — treatment initiation (the second 95) is lagging, particularly among adult males (73%) and children (63%).
- Closing the treatment gap, especially for men and children, would directly push life expectancy upward.
- TB co-infection and the growing burden of non-communicable diseases in the aging HIV-positive population are equally important.

**Potential impact**: Closing the HIV treatment gap, strengthening primary healthcare, and reducing violence and road fatalities could realistically add 5–8 years of life expectancy over a decade, translating into a meaningful HDI bump.

### Priority 2: Education Quality Revolution

South Africa's education numbers look decent on paper (11.3 mean years is high for the continent), but the HDI doesn't measure *quality* — and this is where South Africa dramatically underperforms:

- The country consistently ranks near the bottom of international reading and maths assessments.
- Expected years of schooling (13.6) is well below the maximum of 18.
- Key priorities: fixing early-grade literacy, retaining learners through secondary and into post-secondary education, and addressing the severe teacher quality gap.

**Potential impact**: Slower to pay off but compounds over time. A better-educated workforce also feeds into income growth.

### Priority 3: Income Growth via Structural Unemployment

- GNI per capita of ~$12,948 is middling.
- The HDI uses a **logarithmic scale** for income, so each additional dollar matters less as you get richer — income is the *hardest* dimension to move for a middle-income country.
- The real problem: income gains are extremely concentrated. The IHDI drops to 0.462 — a staggering inequality penalty.
- South Africa's 30%+ unemployment rate is the structural barrier.
- Income growth is better pursued as a *byproduct* of a healthier, better-educated workforce than as a direct HDI strategy.

### Strategic Summary

The health dimension offers the most "points per rand" because life expectancy is so depressed relative to what SA's income level should support. Education quality reform is the second priority. Income growth is important but hardest to move on the logarithmic scale.

---

## 6. Data Sources for Implementation

When building tools or analyses for this project, consider these data sources:

| Data | Source | Notes |
|------|--------|-------|
| HDI & components | UNDP Human Development Reports | Published annually |
| PHDI | UNDP (since 2020 report) | Adjusts HDI for CO₂ and material footprint |
| EPI | Yale Center for Environmental Law & Policy | Biennial |
| SDI | Jason Hickel / sustainabledevelopmentindex.org | Annual |
| Ecological Footprint | Global Footprint Network | Per-country biocapacity data |
| CO₂ emissions | Our World in Data / Global Carbon Project | Per-capita and absolute |
| World Happiness | World Happiness Report | Annual |
| Social Progress | Social Progress Imperative | Annual |

---

## 7. Technical Notes

- **Preferred tools**: Python with NumPy, Pandas for data analysis and index computation.
- **Aggregation**: Geometric mean preferred over arithmetic mean to penalise imbalance between dimensions.
- **Normalisation**: Min-max scaling to [0, 1] using defined goalposts.
- **Visualisation**: Consider scatter plots of HDI vs. environmental metrics to identify countries that achieve high development within ecological limits.

---

## References & Further Reading

- UNDP Human Development Reports: https://hdr.undp.org
- Sustainable Development Index: https://www.sustainabledevelopmentindex.org
- Yale Environmental Performance Index: https://epi.yale.edu
- Global Footprint Network: https://www.footprintnetwork.org
- Our World in Data (CO₂ & GHG): https://ourworldindata.org/co2-emissions
- Social Progress Index: https://www.socialprogress.org
