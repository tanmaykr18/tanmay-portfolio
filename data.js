// Single source of truth for all site content (from Tanmay_Kumar_Resume_2Page.pdf)
export const me = {
  name: "TANMAY",
  full: "Tanmay Kumar",
  location: "Ghaziabad, India",
  email: "tanmaykumar18102002@gmail.com",
  phone: "+91-7061745715",
  linkedin: "linkedin.com/in/tanmaykumar181002",
  github: "github.com/tanmaykr18",
  site: "portfolio-website-jtk8.vercel.app",
};

// [numeral, label line 1, label line 2]
export const heroStats = [
  ["2+", "YEARS BUILDING", "LIVE SAAS"],
  ["10+", "MICROSERVICES", "IN PRODUCTION"],
  ["90%", "LESS MANUAL", "DATA ENTRY"],
];

export const tabs = ["All", "AI", "Backend", "Frontend"];

// shot = which generated thumbnail to render (see components/Shots.js)
export const projects = [
  { t: "Beavertail Platform", cat: "Backend", meta: "SAAS / 2024 — NOW", shot: 0 },
  { t: "Invoice OCR Engine", cat: "AI", meta: "AI / 2025", shot: 1 },
  { t: "Cascade Recipe Matcher", cat: "AI", meta: "AI / 2025", shot: 2 },
  { t: "FocusGuard", cat: "Frontend", meta: "COMPUTER VISION / 2025", shot: 3 },
  { t: "AI Video Generation", cat: "AI", meta: "VEO3 / 2025", shot: 4 },
  { t: "Voice AI Chatbots", cat: "Frontend", meta: "WEB SPEECH / 2024", shot: 5 },
];

export const steps = [
  ["DISCOVER", "Understanding the operator, the data and the real bottleneck."],
  ["MODEL", "Shaping schemas, aggregation pipelines and service boundaries."],
  ["BUILD", "Shipping React / React Native UIs on tested Node services."],
  ["AUTOMATE", "Wiring Gemini into the manual work nobody wants to do."],
  ["LAUNCH", "Deploying, monitoring and iterating with live tenants."],
];

export const learning = [
  ["B.Tech, Computer Science", "SRM Institute of Science and Technology · GPA 8.15", "2024"],
  ["Meta Certified", "Front-End Development · JavaScript Programming", "2023"],
  ["Hackathon Winner", "IIT Patna — Gemini-powered Chrome extension", "WON"],
];

export const toolkit = ["MERN Stack", "Microservices", "Gemini AI", "React Native", "MongoDB Aggregations", "RBAC & Auth", "POS Integrations"];

export const journey = [
  ["2024 — NOW", "Founding Engineer", "cactus.ai · Beavertail",
    "Running a multi-tenant restaurant platform end to end — invoice OCR, POS integrations, inventory forecasting, recipe generation, tenant tooling and analytics dashboards across 10+ services."],
  ["2024", "B.Tech, Computer Science", "SRM Institute of Science and Technology",
    "Graduated with a GPA of 8.15, then moved straight into building production systems."],
  ["2023", "Meta Certified Developer", "Front-End & JavaScript",
    "Completed Meta's Front-End Development and JavaScript Programming certifications."],
  ["WON", "Hackathon Winner", "IIT Patna",
    "Built a Chrome extension for AI text summarization and code explanation using Gemini, with voice reading."],
];

export const shipped = [
  ["Invoice OCR Service", "AI / −90% MANUAL ENTRY"],
  ["Recipe Generation Engine", "AI / 200+ ITEMS PER TENANT"],
  ["Inventory Forecasting", "DATA / ADU RESTOCK TIERS"],
];

// [label, value, href, icon]
export const contact = [
  ["EMAIL", me.email, `mailto:${me.email}`, "mail"],
  ["PHONE / WHATSAPP", me.phone, `tel:${me.phone}`, "phone"],
  ["LINKEDIN", me.linkedin, `https://${me.linkedin}`, "linkedin"],
  ["GITHUB", me.github, `https://${me.github}`, "github"],
  ["PORTFOLIO", me.site, `https://${me.site}`, "globe"],
  ["BASED IN", me.location, "#", "pin"],
];
