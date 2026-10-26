import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import SpaceSectionBackdrop from "../components/SpaceSectionBackdrop";
import TiltCard from "../components/TiltCard";

const RESUME_FILE = "/files/Sunghyun_Chang_Resume.pdf";

type ExperienceItem = {
  id?: string;
  type?: string;
  organization: string;
  role?: string;
  period: string;
  description: string;
  journeyVariant?: JourneyVariant;
  journeyLabel?: string;
  journeySide?: JourneySide;
  journeySummary?: string;
  showStoryLink?: boolean;
  isCurrent?: boolean;
  link?: string;
  highlightText?: string;
  details?: string[];
  media?: string[];
  storyBlocks?: StoryBlock[];
  journey?: JourneyMetadata;
};

type StoryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "imageRow"; images: { src: string; alt?: string }[] }
  | { type: "quote"; text: string; by?: string }
  | { type: "divider" };

type JourneyVariant = "major" | "milestone";
type JourneySide = "left" | "right";
type JourneyRole = "turning-point" | "supporting";
type JourneyNodeType = "education" | "employment" | "service" | "personal" | "transition";
type JourneyMetadata = {
  nodeType: JourneyNodeType;
  narrativeRole: JourneyRole;
  startDate: string;
  endDate?: string;
  label: string;
  chronologyIndex?: number;
  relatedProjectTitle?: string;
  groupId?: string;
  relatedExperienceIds?: string[];
  relatedDomainIds?: string[];
  relatedCapabilityIds?: string[];
};

type LegacyJourneyMetadata = {
  role: JourneyRole;
  start: string;
  end?: string;
  networkLabel: string;
  relatedTo?: string[];
  domains?: string[];
  capabilities?: string[];
};

type NetworkNodeKind = "primary" | "supporting" | "domain" | "capability" | "identity" | "project";
type CareerNetworkNode = {
  id: string;
  kind: NetworkNodeKind;
  label: string;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  experienceId?: string;
  projectTitle?: string;
};
type CareerNetworkEdge = {
  id: string;
  from: string;
  to: string;
  kind: "chronology" | "supporting" | "domain" | "capability" | "convergence" | "project";
};

const NETWORK_VIEWBOX = { width: 1280, height: 500 };
const CHRONOLOGY_PATH_IDS = ["hanseo-start", "army", "mbc", "camino", "hanseo-return", "north-west", "hanseo-graduation", "pixoneer", "qraft", "us-relocation", "lges"] as const;

const NETWORK_LAYOUT: Record<string, Pick<CareerNetworkNode, "centerX" | "centerY">> = {
  "hanseo-start": { centerX: 70, centerY: 342 },
  army: { centerX: 163, centerY: 298 },
  mbc: { centerX: 254, centerY: 254 },
  camino: { centerX: 375, centerY: 276 },
  "hanseo-return": { centerX: 505, centerY: 226 },
  "north-west": { centerX: 646, centerY: 258 },
  "hanseo-resume": { centerX: 570, centerY: 404 },
  "hanseo-graduation": { centerX: 770, centerY: 320 },
  pixoneer: { centerX: 860, centerY: 300 },
  qraft: { centerX: 955, centerY: 222 },
  "us-relocation": { centerX: 1080, centerY: 266 },
  lges: { centerX: 1202, centerY: 218 },
};

const JOURNEY_CONCEPTS: Array<Omit<CareerNetworkNode, "width" | "height">> = [
  { id: "aerospace", kind: "domain", label: "AEROSPACE & DEFENSE", centerX: 132, centerY: 126 },
  { id: "live-operations", kind: "domain", label: "LIVE OPERATIONS", centerX: 288, centerY: 166 },
  { id: "global-perspective", kind: "domain", label: "GLOBAL PERSPECTIVE", centerX: 502, centerY: 100 },
  { id: "full-lifecycle", kind: "capability", label: "FULL-LIFECYCLE DELIVERY", centerX: 592, centerY: 458 },
  { id: "real-time-systems", kind: "domain", label: "REAL-TIME SYSTEMS", centerX: 846, centerY: 112 },
  { id: "system-ownership", kind: "capability", label: "SYSTEM OWNERSHIP", centerX: 1032, centerY: 366 },
  { id: "smart-manufacturing", kind: "domain", label: "SMART MANUFACTURING", centerX: 1160, centerY: 68 },
  { id: "systems-thinking", kind: "identity", label: "SYSTEMS THINKING", centerX: 770, centerY: 454 },
  { id: "practical-automation", kind: "identity", label: "PRACTICAL AUTOMATION", centerX: 974, centerY: 448 },
  { id: "real-world-impact", kind: "identity", label: "REAL-WORLD IMPACT", centerX: 1174, centerY: 432 },
];

const JOURNEY_PROJECT_NODES: Array<Omit<CareerNetworkNode, "width" | "height"> & { sourceExperienceId: string }> = [
  {
    id: "asaq",
    kind: "project",
    label: "ASAQ",
    projectTitle: "Real-Time Supply & Demand Analytics",
    sourceExperienceId: "qraft",
    centerX: 900,
    centerY: 170,
  },
  {
    id: "ai-execution",
    kind: "project",
    label: "AI EXECUTION ENGINE",
    projectTitle: "AI Execution Engine",
    sourceExperienceId: "qraft",
    centerX: 988,
    centerY: 118,
  },
  {
    id: "futures-options",
    kind: "project",
    label: "FUTURES & OPTIONS",
    projectTitle: "Futures & Options Trading Platform",
    sourceExperienceId: "qraft",
    centerX: 1060,
    centerY: 170,
  },
  {
    id: "mons-club",
    kind: "project",
    label: "MON'S CLUB",
    projectTitle: "Manufacturing Operations & Automation Platform",
    sourceExperienceId: "lges",
    centerX: 1125,
    centerY: 124,
  },
];

const FALLBACK_EXPERIENCE: ExperienceItem[] = [
  {
    id: "hanseo-start",
    type: "Education",
    organization: "HANSEO University, South Korea",
    role: "B.E., Aerospace Software Engineering",
    period: "Feb 2006",
    description: "Enrolled in an interdisciplinary curriculum combining aerospace engineering and computer science, focusing on software development for aviation systems.",
    journeySummary: "Studied aerospace software engineering, building the foundation for systems thinking and development.",
    journeyVariant: "major",
    journeyLabel: "Foundation",
    journeySide: "left",
    showStoryLink: false,
    highlightText: "The beginning of my formal journey into engineering, software, and structured problem solving.",
    storyBlocks: [
      { type: "heading", text: "Where It Started" },
      { type: "paragraph", text: "Entering Hanseo University marked the start of a more serious commitment to engineering. I was drawn to the structure of aerospace systems, but I also found myself increasingly interested in software and logic." },
      { type: "paragraph", text: "That combination shaped the way I learned. I did not see software as separate from engineering. I saw it as one of the most practical ways to make complex systems understandable and useful." },
      { type: "divider" },
      { type: "heading", text: "Early Curiosity" },
      { type: "paragraph", text: "Those years gave me room to build technical fundamentals while also discovering what kind of work felt meaningful to me. Over time, my curiosity kept pulling me closer to software development." },
      { type: "paragraph", text: "Looking back, this was the quiet beginning of a long path that would eventually lead me into system design, architecture, and production engineering." },
    ],
  },
  {
    id: "army",
    type: "Service",
    organization: "Republic of Korea Army",
    role: "Wireless Communications Specialist (Sergeant, Honorable Discharge)",
    period: "Apr 2007 – Mar 2009",
    description: "Served on active duty as a wireless communications specialist, developing a strong sense of discipline and responsibility within a structured organization, while strengthening collaboration and problem-solving skills through team-based missions.",
    journeyVariant: "milestone",
    journeySide: "right",
    journeySummary: "Built discipline and collaborative problem-solving under operational constraints.",
  },
  {
    id: "mbc",
    type: "Professional",
    organization: "MBC (Munhwa Broadcasting Corporation), South Korea",
    role: "Broadcast Technician",
    period: "May 2009 – May 2011",
    description: "Maintained broadcast and studio equipment and supported editorial room operations, ensuring stable on-air broadcasting and technical reliability.",
    journeyVariant: "major",
    journeyLabel: "Operational Reliability",
    journeySide: "left",
    journeySummary: "Learned operational reliability in live broadcast environments.",
  },
  {
    id: "camino",
    type: "Personal",
    organization: "Camino de Santiago, Europe",
    role: "Solo Pilgrimage",
    period: "Jun 2011 – Aug 2011",
    description: "Completed a 1,000 km solo pilgrimage along the Camino de Santiago, starting in St-Jean-Pied-de-Port, France, and continuing beyond Santiago de Compostela toward Portugal. What started as a simple travel plan eventually became a turning point that shaped my mindset, resilience, and long-term direction in life.",
    journeySummary: "Completed a 1,000 km solo pilgrimage that reshaped my resilience and long-term direction.",
    journeyVariant: "milestone",
    journeySide: "right",
    highlightText: "What started as a simple trip became the turning point that shaped the path of my life.",
    storyBlocks: [
      { type: "heading", text: "The Beginning" },
      { type: "paragraph", text: "The journey began with a simple goal: I wanted to travel through Europe for a longer period on a limited budget." },
      { type: "paragraph", text: "While researching affordable ways to travel alone, I discovered the Camino de Santiago. The idea of walking across countries with only a backpack felt both intimidating and exciting." },
      { type: "paragraph", text: "At the time, it was also my first time traveling abroad alone. I could barely speak English, and since the journey would take place in Spain, I spent about two months learning basic Spanish so I could manage simple conversations along the way." },
      { type: "paragraph", text: "Before leaving, I prepared as much as I could: researching the route, estimating costs, and deciding what to pack for the pilgrimage." },
      {
        type: "imageRow",
        images: [
          { src: "/images/camino/route.jpg", alt: "Camino route map" },
          { src: "/images/camino/13.jpg", alt: "Prepare" },
        ],
      },
      { type: "divider" },
      { type: "heading", text: "The Journey" },
      { type: "paragraph", text: "The journey did not begin smoothly. My flight was delayed, and I arrived in France much later than expected. Late at night, in an unfamiliar country, I had to find a place to stay before heading to Saint-Jean-Pied-de-Port, the starting point of the pilgrimage." },
      { type: "paragraph", text: "Standing there alone, tired and uncertain, I remember feeling overwhelmed." },
      { type: "paragraph", text: "Once the walking began, the days quickly became physically demanding." },
      { type: "paragraph", text: "Most mornings started around 6 a.m., and I would walk 20 to 30 kilometers until midday. Some days were painful - my toenails fell off, and on difficult days my only goal was to reach the next village." },
      { type: "quote", text: "On the second day, I remember thinking to myself,\n\"Why did I choose to put myself through this?\"" },
      { type: "paragraph", text: "But the Camino has a unique way of changing your perspective." },
      { type: "paragraph", text: "Along the trail, I met pilgrims from many different countries. Even though my Spanish was far from perfect, we shared conversations, meals, and stories. Everyone I met had their own reason for walking." },
      { type: "paragraph", text: "Some were searching for something. Some were recovering from difficult moments in life. Others simply wanted to experience the journey." },
      { type: "image", src: "/images/camino/27.jpg", alt: "" },
      {
        type: "imageRow",
        images: [
          { src: "/images/camino/21.jpg", alt: "" },
          { src: "/images/camino/20.jpg", alt: "" },
          { src: "/images/camino/25.jpg", alt: "" },
          { src: "/images/camino/23.jpg", alt: "" },
        ],
      },
      { type: "divider" },
      { type: "heading", text: "Looking Inward" },
      { type: "paragraph", text: "At first I mostly noticed the landscape - fields, villages, mountains, and endless paths. But gradually my attention shifted inward." },
      { type: "paragraph", text: "Walking day after day gave me time to reflect on my life and my future." },
      { type: "paragraph", text: "Many of the worries that once felt overwhelming slowly started to feel smaller." },
      { type: "paragraph", text: "Somewhere along the way, the Camino stopped feeling like a physical challenge and began to feel like a personal journey." },
      { type: "image", src: "/images/camino/4.jpg", alt: "" },
      {
        type: "imageRow",
        images: [
          { src: "/images/camino/7.jpg", alt: "" },
          { src: "/images/camino/18.jpg", alt: "" },
          { src: "/images/camino/31.jpg", alt: "" },
          { src: "/images/camino/30.jpg", alt: "" },
        ],
      },
      { type: "divider" },
      { type: "heading", text: "Beyond the Destination" },
      { type: "paragraph", text: "Originally, the goal was to reach Santiago de Compostela." },
      { type: "paragraph", text: "But when I finally arrived, it did not feel like the end of the journey." },
      { type: "paragraph", text: "Instead, it felt like a new beginning." },
      { type: "paragraph", text: "So rather than stopping there, I continued walking toward Portugal." },
      { type: "image", src: "/images/camino/16.jpg", alt: "Camino destination" },
      { type: "image", src: "/images/camino/28.jpg", alt: "" },
      { type: "divider" },
      { type: "heading", text: "Reflection" },
      { type: "paragraph", text: "Looking back now, the Camino became a turning point in my life." },
      { type: "paragraph", text: "It showed me that I was capable of doing things that once felt impossible." },
      { type: "paragraph", text: "More importantly, it gave me the confidence to start asking what I truly wanted to do with my life." },
      { type: "paragraph", text: "In many ways, that journey helped shape the person I am today." },
      { type: "image", src: "/images/camino/17.jpg", alt: "" },
      {
        type: "imageRow",
        images: [
          { src: "/images/camino/2.jpg", alt: "" },
          { src: "/images/camino/8.jpg", alt: "" },
        ],
      },
    ],
  },
  {
    id: "hanseo-return",
    type: "Education",
    organization: "HANSEO University, South Korea",
    role: "Return to Studies",
    period: "Feb 2012",
    description: "Returned to Hanseo University to continue the aerospace software engineering program.",
    journeySummary: "Returned to studies with a clearer direction toward software engineering.",
    journeyVariant: "major",
    journeyLabel: "Return to Studies",
    journeySide: "left",
  },
  {
    id: "north-west",
    type: "Education",
    organization: "North-West University, Mafikeng, South Africa",
    role: "Exchange Student, Computer Science and Electronics",
    period: "Feb 2013 – Dec 2013",
    description: "Participated in an international exchange program, studying computer science and electronics while gaining cross-cultural experience in a global academic environment.",
    journeyVariant: "milestone",
    journeySide: "left",
    journeySummary: "Expanded technical perspective through an international academic year.",
    highlightText: "A year abroad widened both my technical perspective and my sense of how big the world could be.",
    storyBlocks: [
      { type: "heading", text: "Leaving Familiar Ground" },
      { type: "paragraph", text: "Studying in South Africa was more than an academic exchange for me. It was the first time I fully stepped into a different culture for an extended period and had to build a new daily life from scratch." },
      { type: "paragraph", text: "That experience stretched me in practical ways: new people, new classroom styles, and a different pace of life. It also expanded how I thought about communication, adaptation, and independence." },
      { type: "divider" },
      { type: "heading", text: "Learning Beyond the Classroom" },
      { type: "paragraph", text: "In class, I focused on computer science and electronics. Outside class, I was learning how to observe, listen, and connect across cultural differences. That combination made the year especially meaningful." },
      { type: "paragraph", text: "The exchange taught me that technical growth and personal growth often happen together. When your environment changes, your thinking changes too." },
      { type: "divider" },
      { type: "heading", text: "What Stayed With Me" },
      { type: "paragraph", text: "Looking back, that year strengthened my curiosity about the wider world and my confidence in unfamiliar environments. It helped prepare me for later transitions in both career and life." },
    ],
  },
  {
    id: "hanseo-resume",
    type: "Education",
    organization: "HANSEO University, South Korea",
    role: "Continued Studies",
    period: "2014",
    description: "Continued the aerospace software engineering program after the international exchange.",
    journeySummary: "Returned to the degree path and carried a broader technical perspective forward.",
    journeyVariant: "milestone",
    journeySide: "right",
  },
  {
    id: "hanseo-graduation",
    type: "Education",
    organization: "HANSEO University, South Korea",
    role: "B.E., Aerospace Software Engineering",
    period: "Feb 2015",
    description: "Graduated with a Bachelor of Engineering in Aerospace Software Engineering.",
    journeySummary: "Completed a B.E. in Aerospace Software Engineering and committed to building software professionally.",
    journeyVariant: "milestone",
    journeySide: "right",
    highlightText: "This was the point where long-term interest turned into a professional direction.",
    storyBlocks: [
      { type: "heading", text: "Choosing the Path" },
      { type: "paragraph", text: "My academic path blended aerospace engineering with software, which suited me well because I was drawn to both structured systems and practical problem solving." },
      { type: "paragraph", text: "Over time, I realized I was most energized by the software side: turning logic into something reliable, useful, and maintainable." },
      { type: "divider" },
      { type: "heading", text: "Building the Foundation" },
      { type: "paragraph", text: "University gave me the technical base that would shape my career: programming fundamentals, engineering discipline, and the habit of thinking carefully about how systems behave under constraints." },
      { type: "paragraph", text: "It was also where I began to understand that good engineering is not only about making something work once, but making it understandable, repeatable, and dependable." },
      { type: "divider" },
      { type: "heading", text: "A Quiet Turning Point" },
      { type: "paragraph", text: "Graduation did not feel like a dramatic finish. It felt more like the moment when my direction became clear: I wanted to build software systems professionally and keep growing through real-world challenges." },
    ],
  },
  {
    id: "pixoneer",
    type: "Professional",
    organization: "Pixoneer Geomatics",
    role: "Software Engineer",
    period: "Oct 2014 – Jun 2016",
    description: "Worked on aerospace and defense projects, including a helicopter condition monitoring system, gaining hands-on experience across the full software development life cycle from requirements analysis to deployment.",
    journeySummary: "Built aerospace and defense software, including a helicopter condition monitoring system, across the full development lifecycle.",
    journeyVariant: "major",
    journeyLabel: "First Production Systems",
    journeySide: "left",
  },
  {
    id: "qraft",
    type: "Professional",
    organization: "QRAFT Technologies",
    role: "AXE Team Leader & Senior Software Development Engineer",
    period: "Nov 2016 – Nov 2023",
    description: "Led the AXE team and operated a real-time automated order execution system based on reinforcement learning, ensuring stable, low-latency trading operations for large institutional clients.",
    journeySummary: "Led the AXE team and operated a reinforcement-learning execution platform for low-latency institutional trading.",
    journeyVariant: "major",
    journeyLabel: "System Ownership",
    journeySide: "right",
    highlightText: "This was the chapter where software engineering, system ownership, and leadership all came together.",
    storyBlocks: [
      { type: "heading", text: "From Engineer to System Owner" },
      { type: "paragraph", text: "QRAFT was one of the most defining chapters of my career. I was not only writing software, but helping lead a system that had to operate reliably in real time under financial and operational pressure." },
      { type: "paragraph", text: "That changed how I approached engineering. Performance, observability, resilience, and clarity stopped being nice-to-haves and became daily necessities." },
      { type: "divider" },
      { type: "heading", text: "Leading the AXE Team" },
      { type: "paragraph", text: "As AXE Team Leader, I worked at the intersection of business requirements, algorithmic ideas, and production reality. My role involved turning complex needs into systems that could be trusted by internal teams and institutional clients." },
      { type: "paragraph", text: "Much of the work was about making high-stakes systems stable: improving execution flows, reducing latency, maintaining operational confidence, and helping the team move with consistency." },
      { type: "divider" },
      { type: "heading", text: "What I Learned" },
      { type: "paragraph", text: "That experience deepened my belief that strong software systems come from strong structure. Clear interfaces, measured tradeoffs, and disciplined operations matter just as much as technical ambition." },
      { type: "paragraph", text: "It also strengthened my leadership style. I learned how to support people while keeping quality high, how to stay calm during production issues, and how to create momentum in technically complex work." },
    ],
  },
  {
    id: "us-relocation",
    type: "Transition",
    organization: "Relocation",
    period: "Dec 2023 - Apr 2024",
    description: "A new beginning: I've made the big move to the United States and am ready for what lies ahead.",
    journeyVariant: "milestone",
    journeySide: "left",
    journeySummary: "A transition into the next chapter in the United States.",
  },
  {
    id: "lges",
    type: "Professional",
    organization: "LG Energy Solution Michigan",
    role: "Senior Smart Factory Engineer",
    period: "May 2025 – Present",
    description: "Operated and managed smart factory product traceability systems for EV and ESS battery manufacturing, ensuring stable production by supporting roll map and cell tracking systems across electrode and assembly processes.",
    journeySummary: "Operate production traceability systems for EV and ESS battery manufacturing across electrode and assembly processes.",
    journeyVariant: "major",
    journeyLabel: "Smart Manufacturing",
    journeySide: "left",
    isCurrent: true,
    highlightText: "A new country, a new industry, and another chance to build systems that matter in the real world.",
    storyBlocks: [
      { type: "heading", text: "Starting Over in a New Environment" },
      { type: "paragraph", text: "Joining LG Energy Solution Michigan marked another major transition in my life. I had recently relocated to the United States, and this role became the starting point of my next professional chapter." },
      { type: "paragraph", text: "It also introduced me to a new domain: battery manufacturing and smart factory operations. I had to learn quickly, understand production-critical workflows, and contribute without losing sight of reliability." },
      { type: "divider" },
      { type: "heading", text: "Software Inside Manufacturing" },
      { type: "paragraph", text: "What I found compelling was how directly software affected physical operations. Traceability systems, roll maps, and cell tracking are not abstract tools. They support production continuity, quality, and accountability on the factory floor." },
      { type: "paragraph", text: "That made the work tangible. The systems had to be dependable because real operational decisions relied on them every day." },
      { type: "divider" },
      { type: "heading", text: "Looking Forward" },
      { type: "paragraph", text: "This role continues to sharpen my ability to adapt across industries while staying grounded in the same engineering values: structure, stability, and practical impact. It feels less like a reset and more like an expansion of everything I have learned so far." },
    ],
  },
];

const JOURNEY_METADATA: Record<string, JourneyMetadata> = {
  "hanseo-start": { nodeType: "education", narrativeRole: "supporting", startDate: "2006-02", label: "HANSEO\nFOUNDATION", chronologyIndex: 1, groupId: "hanseo", relatedExperienceIds: ["hanseo-return"], relatedDomainIds: ["aerospace"], relatedCapabilityIds: ["systems-thinking"] },
  army: { nodeType: "service", narrativeRole: "supporting", startDate: "2007-04", endDate: "2009-03", label: "ARMY", chronologyIndex: 2, relatedExperienceIds: ["camino"], relatedDomainIds: ["live-operations"] },
  mbc: { nodeType: "employment", narrativeRole: "supporting", startDate: "2009-05", endDate: "2011-05", label: "MBC", chronologyIndex: 3, relatedExperienceIds: ["camino"], relatedDomainIds: ["live-operations"] },
  camino: { nodeType: "personal", narrativeRole: "turning-point", startDate: "2011-06", endDate: "2011-08", label: "CAMINO\nDE SANTIAGO", chronologyIndex: 4, relatedDomainIds: ["global-perspective"], relatedCapabilityIds: ["systems-thinking"] },
  "hanseo-return": { nodeType: "education", narrativeRole: "turning-point", startDate: "2012-02", label: "HANSEO\nRETURN", chronologyIndex: 5, groupId: "hanseo", relatedDomainIds: ["aerospace"], relatedCapabilityIds: ["systems-thinking"] },
  "north-west": { nodeType: "education", narrativeRole: "turning-point", startDate: "2013-02", endDate: "2013-12", label: "NORTH-WEST\nUNIVERSITY", chronologyIndex: 6, relatedDomainIds: ["global-perspective"] },
  "hanseo-resume": { nodeType: "education", narrativeRole: "supporting", startDate: "2014", label: "HANSEO\nCONTINUED", groupId: "hanseo", relatedExperienceIds: ["north-west", "hanseo-graduation"], relatedDomainIds: ["aerospace"] },
  "hanseo-graduation": { nodeType: "education", narrativeRole: "supporting", startDate: "2015-02", label: "HANSEO\nGRADUATION", chronologyIndex: 7, groupId: "hanseo", relatedExperienceIds: ["pixoneer"], relatedCapabilityIds: ["full-lifecycle"] },
  pixoneer: { nodeType: "employment", narrativeRole: "supporting", startDate: "2014-10", endDate: "2016-06", label: "PIXONEER", chronologyIndex: 8, relatedExperienceIds: ["qraft"], relatedDomainIds: ["aerospace"], relatedCapabilityIds: ["full-lifecycle"] },
  qraft: { nodeType: "employment", narrativeRole: "turning-point", startDate: "2016-11", endDate: "2023-11", label: "QRAFT", chronologyIndex: 9, relatedProjectTitle: "AI Execution Engine", relatedDomainIds: ["real-time-systems"], relatedCapabilityIds: ["system-ownership", "full-lifecycle"] },
  "us-relocation": { nodeType: "transition", narrativeRole: "turning-point", startDate: "2023-12", endDate: "2024-04", label: "U.S.\nRELOCATION", chronologyIndex: 10, relatedDomainIds: ["global-perspective"] },
  lges: { nodeType: "employment", narrativeRole: "turning-point", startDate: "2025-05", label: "LG ENERGY\nSOLUTION", chronologyIndex: 11, relatedProjectTitle: "Manufacturing Operations & Automation Platform", relatedDomainIds: ["smart-manufacturing"], relatedCapabilityIds: ["practical-automation", "real-world-impact"] },
};

function normalizeJourneyMetadata(value: JourneyMetadata | LegacyJourneyMetadata | undefined, experienceType?: string): JourneyMetadata | undefined {
  if (!value) return undefined;
  if ("narrativeRole" in value) return value;

  const nodeTypeByExperienceType: Record<string, JourneyNodeType> = {
    Education: "education",
    Professional: "employment",
    Service: "service",
    Personal: "personal",
    Transition: "transition",
  };

  return {
    nodeType: nodeTypeByExperienceType[experienceType ?? ""] ?? "employment",
    narrativeRole: value.role,
    startDate: value.start,
    endDate: value.end,
    label: value.networkLabel,
    relatedExperienceIds: value.relatedTo,
    relatedDomainIds: value.domains,
    relatedCapabilityIds: value.capabilities,
  };
}

function getNetworkNodeDimensions(kind: NetworkNodeKind, label: string) {
  const longestLine = Math.max(...label.split("\n").map((line) => line.length));
  const lineCount = label.split("\n").length;
  const height = kind === "primary" ? (lineCount > 1 ? 70 : 60) : kind === "identity" ? 42 : kind === "project" ? 36 : kind === "supporting" ? (lineCount > 1 ? 44 : 34) : 34;
  const minimum = kind === "primary" ? 124 : kind === "identity" ? 138 : kind === "project" ? 102 : kind === "capability" ? 116 : kind === "domain" ? 104 : 72;
  const characterWidth = kind === "primary" ? 7.8 : kind === "identity" ? 6.4 : kind === "project" ? 6.2 : kind === "supporting" ? 6.1 : 5.7;
  return { width: Math.max(minimum, longestLine * characterWidth + 30), height };
}

type NetworkPoint = { x: number; y: number };

function getPillBoundaryPoint(node: CareerNetworkNode, toward: CareerNetworkNode): NetworkPoint {
  const deltaX = toward.centerX - node.centerX;
  const deltaY = toward.centerY - node.centerY;
  const halfWidth = node.width / 2;
  const radius = Math.min(node.height / 2, halfWidth);
  const straightHalfWidth = Math.max(0, halfWidth - radius);

  if (Math.abs(deltaX) < 0.0001) {
    return { x: node.centerX, y: node.centerY + Math.sign(deltaY || 1) * radius };
  }

  const side = Math.sign(deltaX);
  if (Math.abs(deltaY) > 0.0001) {
    const topBottomDistance = radius / Math.abs(deltaY);
    const topBottomX = topBottomDistance * deltaX;
    if (Math.abs(topBottomX) <= straightHalfWidth) {
      return { x: node.centerX + topBottomX, y: node.centerY + Math.sign(deltaY) * radius };
    }
  }

  const capCenterX = side * straightHalfWidth;
  const quadraticA = deltaX * deltaX + deltaY * deltaY;
  const quadraticB = -2 * capCenterX * deltaX;
  const quadraticC = capCenterX * capCenterX - radius * radius;
  const discriminant = Math.max(0, quadraticB * quadraticB - 4 * quadraticA * quadraticC);
  const distance = (-quadraticB + Math.sqrt(discriminant)) / (2 * quadraticA);

  return { x: node.centerX + distance * deltaX, y: node.centerY + distance * deltaY };
}

function isOnPillBoundary(point: NetworkPoint, node: CareerNetworkNode) {
  const relativeX = Math.abs(point.x - node.centerX);
  const relativeY = point.y - node.centerY;
  const radius = Math.min(node.height / 2, node.width / 2);
  const straightHalfWidth = Math.max(0, node.width / 2 - radius);
  const signedDistance = Math.hypot(Math.max(relativeX - straightHalfWidth, 0), relativeY) - radius;
  return Math.abs(signedDistance) < 0.01;
}

function validateNetworkGeometry(nodesById: Map<string, CareerNetworkNode>, edges: CareerNetworkEdge[]) {
  const chronologyEdges = edges.filter((edge) => edge.kind === "chronology");
  const expectedEdges = CHRONOLOGY_PATH_IDS.slice(1).map((target, index) => ({ from: CHRONOLOGY_PATH_IDS[index], to: target }));

  if (chronologyEdges.length !== expectedEdges.length) {
    throw new Error("Journey geometry requires one edge for each consecutive chronological chapter.");
  }

  expectedEdges.forEach(({ from, to }) => {
    const source = nodesById.get(from);
    const target = nodesById.get(to);
    const edge = chronologyEdges.find((candidate) => candidate.from === from && candidate.to === to);
    if (!source || !target || !edge) throw new Error(`Journey geometry is missing ${from} → ${to}.`);

    const start = getPillBoundaryPoint(source, target);
    const end = getPillBoundaryPoint(target, source);
    if (!isOnPillBoundary(start, source) || !isOnPillBoundary(end, target)) {
      throw new Error(`Journey geometry detached ${from} → ${to} from a node boundary.`);
    }
  });

  edges.filter((edge) => edge.kind !== "chronology").forEach((edge) => {
    const source = nodesById.get(edge.from);
    const target = nodesById.get(edge.to);
    if (!source || !target) throw new Error(`Journey geometry has an orphaned ${edge.kind} edge.`);
    if (!isOnPillBoundary(getPillBoundaryPoint(source, target), source) || !isOnPillBoundary(getPillBoundaryPoint(target, source), target)) {
      throw new Error(`Journey geometry detached ${edge.kind} edge ${edge.id}.`);
    }
  });
}

function canOpenExperienceModal(item: ExperienceItem) {
  return !!(item.storyBlocks?.length || item.media?.length || item.details?.length);
}

function getJourneyActionLabel(item: ExperienceItem) {
  if (item.journey?.relatedProjectTitle) return "View Selected Work";
  return canOpenExperienceModal(item) ? "Explore Chapter" : undefined;
}

function withJourneyMetadata(items: ExperienceItem[]) {
  const fallbackById = new Map(FALLBACK_EXPERIENCE.map((item) => [item.id, item]));
  const receivedIds = new Set(items.map((item) => item.id).filter(Boolean));
  const completeItems = [...items, ...FALLBACK_EXPERIENCE.filter((item) => item.id && !receivedIds.has(item.id))];

  return completeItems.map((item, index) => {
    const fallback = (item.id ? fallbackById.get(item.id) : undefined) ?? FALLBACK_EXPERIENCE[index];
    const fallbackJourney = normalizeJourneyMetadata(fallback?.journey, fallback?.type) ?? (item.id ? JOURNEY_METADATA[item.id] : undefined);
    const receivedJourney = normalizeJourneyMetadata(item.journey, item.type);

    return {
      ...fallback,
      ...item,
      journey: receivedJourney ? { ...fallbackJourney, ...receivedJourney } : fallbackJourney,
      journeyVariant: item.journeyVariant ?? fallback?.journeyVariant ?? "milestone",
      journeyLabel: item.journeyLabel ?? fallback?.journeyLabel,
      journeySide: item.journeySide ?? fallback?.journeySide ?? (index % 2 === 0 ? "left" : "right"),
      journeySummary: item.journeySummary ?? fallback?.journeySummary,
      showStoryLink: item.showStoryLink ?? fallback?.showStoryLink,
      isCurrent: item.isCurrent ?? fallback?.isCurrent,
    };
  });
}

function ResumeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M12 12v6" />
      <path d="m9.5 15.5 2.5 2.5 2.5-2.5" />
    </svg>
  );
}

function StoryArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function JourneyProjectCapsule({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${title} in Selected Work`}
      className="group mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#8feaf8]/28 bg-[#86e8f9]/[0.08] px-3 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-[#dffbff] transition hover:-translate-y-0.5 hover:border-[#8feaf8]/48 hover:bg-[#86e8f9]/[0.14] hover:text-white"
    >
      <span className="text-[#8feaf8]/72">Selected Work</span>
      <span className="truncate">{title}</span>
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
    </button>
  );
}

function ExperienceTypeBadge({ type }: { type?: string }) {
  if (!type) return null;

  return (
    <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#dffbff] backdrop-blur-md">
      {type}
    </span>
  );
}

function getJourneyVariant(item: ExperienceItem): JourneyVariant {
  if (item.journey) return item.journey.narrativeRole === "turning-point" ? "major" : "milestone";
  return item.journeyVariant ?? "milestone";
}

function TimelineNode({
  variant,
  chapterNumber,
  isCurrent = false,
}: {
  variant: JourneyVariant;
  chapterNumber?: number;
  isCurrent?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        "relative z-10 flex items-center justify-center rounded-full bg-[rgba(10,18,28,0.94)] backdrop-blur-sm",
        variant === "major"
          ? `h-11 w-11 border text-[11px] font-semibold tracking-[0.08em] shadow-[0_0_0_7px_rgba(7,14,23,0.64)] ${isCurrent ? "border-[#9beaf7]/55 text-[#ddfbff]" : "border-[#8feaf8]/30 text-slate-100"}`
          : "h-5 w-5 border border-white/16 text-[9px] shadow-[0_0_0_5px_rgba(7,14,23,0.56)]",
      ].join(" ")}
    >
      {variant === "major" ? <span>{String(chapterNumber).padStart(2, "0")}</span> : <span className="h-1.5 w-1.5 rounded-full bg-[#86e8f9]" />}
    </div>
  );
}

function MajorChapter({ item, chapterNumber, actionLabel, onAction }: { item: ExperienceItem; chapterNumber: number; actionLabel?: string; onAction?: () => void }) {
  const projectTitle = item.journey?.relatedProjectTitle;
  const showProjectLink = !!projectTitle && !!onAction;
  const showAction = !showProjectLink && !!onAction && !!actionLabel && item.showStoryLink !== false;

  return (
    <TiltCard
      className={[
        "glass-panel relative w-full max-w-[450px] overflow-hidden rounded-[28px] border-white/14 bg-[linear-gradient(135deg,rgba(16,31,45,0.82),rgba(8,17,28,0.7)_68%,rgba(18,39,52,0.55))] px-5 py-5 backdrop-blur-md md:px-6 md:py-6",
        item.isCurrent ? "border-[#9de5f1]/30" : "",
      ].join(" ")}
      disabled
      glare={false}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Chapter {String(chapterNumber).padStart(2, "0")}</p>
          {item.journeyLabel && <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a7eaf7]">{item.journeyLabel}</p>}
        </div>
        {item.isCurrent && <span className="rounded-full border border-[#8feaf8]/22 bg-[#86e8f9]/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#dffbff]">Current</span>}
      </div>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.type} <span className="px-1.5 text-slate-600">/</span> {item.period}</p>
      <h3 className="mt-3 text-base font-semibold tracking-[0.02em] text-white md:text-[17px]">{item.organization}</h3>
      {item.role && <p className="mt-2 text-sm text-[#9ee7f4]">{item.role}</p>}
      <p className="mt-3 text-sm leading-6 text-slate-200/72">{item.journeySummary ?? item.description}</p>
      {showAction && (
        <button
          type="button"
          onClick={onAction}
          className="group mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#dffbff] transition hover:text-white"
        >
          <span>{actionLabel}</span>
          <span className="transition-transform group-hover:translate-x-0.5"><StoryArrowIcon /></span>
        </button>
      )}
      {showProjectLink && <JourneyProjectCapsule title={projectTitle} onClick={onAction} />}
    </TiltCard>
  );
}

function CompactMilestone({ item, actionLabel, onAction }: { item: ExperienceItem; actionLabel?: string; onAction?: () => void }) {
  const projectTitle = item.journey?.relatedProjectTitle;
  const showProjectLink = !!projectTitle && !!onAction;
  const showAction = !showProjectLink && !!onAction && !!actionLabel && item.showStoryLink !== false;

  return (
    <div className="max-w-[315px] py-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300/85">{item.period}</span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#9fe9f8]/75">{item.type}</span>
      </div>
      <h3 className="mt-2 text-sm font-semibold text-white">{item.organization}</h3>
      {item.role && <p className="mt-1 text-xs leading-5 text-[#9ee7f4]/90">{item.role}</p>}
      {item.journeySummary && <p className="mt-1.5 text-xs leading-5 text-slate-300/65">{item.journeySummary}</p>}
      {showAction && (
        <button type="button" onClick={onAction} className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300/80 transition hover:text-white">
          {actionLabel}
        </button>
      )}
      {showProjectLink && <JourneyProjectCapsule title={projectTitle} onClick={onAction} />}
    </div>
  );
}

function JourneyNow() {
  return (
    <div className="relative grid items-center lg:grid-cols-[1fr_92px_1fr]">
      <div className="hidden lg:block" />
      <div className="hidden lg:flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#86e8f9]/30 bg-[#86e8f9]/10 text-[10px] font-semibold tracking-[0.14em] text-[#dffbff] shadow-[0_0_0_7px_rgba(7,14,23,0.64)]">NOW</div>
      </div>
      <div className="relative pl-10 lg:pl-6">
        <div aria-hidden="true" className="absolute left-0 top-1 h-5 w-5 rounded-full border border-[#86e8f9]/30 bg-[#86e8f9]/10 lg:hidden" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9fe9f8]">Now</p>
        <p className="mt-2 text-base font-semibold text-white">Systems Thinking &amp; Automation</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300/75">Connecting lessons from software, real-time systems, and manufacturing to build simpler, more automated systems.</p>
      </div>
    </div>
  );
}

function CareerNetwork({
  items,
  selectedNodeId,
  hoveredNodeId,
  onSelect,
  onHover,
  onReset,
  onAction,
  onProjectSelect,
}: {
  items: ExperienceItem[];
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  onSelect: (nodeId: string) => void;
  onHover: (nodeId: string | null) => void;
  onReset: () => void;
  onAction: (item: ExperienceItem) => void;
  onProjectSelect: (projectTitle: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const networkRef = useRef<HTMLDivElement | null>(null);
  const hoverLeaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { experienceNodes, conceptNodes, projectNodes, networkEdges, nodesById } = useMemo(() => {
    const journeyItems = items.filter((item) => item.id && item.journey && NETWORK_LAYOUT[item.id]);
    const experienceNodes = journeyItems.map((item) => {
      const layout = NETWORK_LAYOUT[item.id!];
      const kind: NetworkNodeKind = item.journey!.narrativeRole === "turning-point" ? "primary" : "supporting";
      return {
        id: item.id!,
        experienceId: item.id!,
        kind,
        label: item.journey!.label,
        ...getNetworkNodeDimensions(kind, item.journey!.label),
        ...layout,
      } satisfies CareerNetworkNode;
    });
    const usedConceptIds = new Set(journeyItems.flatMap((item) => [...(item.journey?.relatedDomainIds ?? []), ...(item.journey?.relatedCapabilityIds ?? [])]));
    const conceptNodes = JOURNEY_CONCEPTS
      .filter((node) => usedConceptIds.has(node.id))
      .map((node) => ({ ...node, ...getNetworkNodeDimensions(node.kind, node.label) }));
    const projectNodes = JOURNEY_PROJECT_NODES
      .filter((node) => journeyItems.some((item) => item.id === node.sourceExperienceId))
      .map((node) => ({ ...node, ...getNetworkNodeDimensions(node.kind, node.label) }));
    const chronologicalNodes = journeyItems
      .filter((item) => item.journey?.chronologyIndex !== undefined)
      .sort((a, b) => a.journey!.chronologyIndex! - b.journey!.chronologyIndex!);
    const networkEdges: CareerNetworkEdge[] = chronologicalNodes.slice(1).map((item, index) => ({ id: `path-${chronologicalNodes[index].id}-${item.id}`, from: chronologicalNodes[index].id!, to: item.id!, kind: "chronology" }));

    journeyItems.forEach((item) => {
      const source = item.id!;
      item.journey?.relatedExperienceIds?.forEach((target) => networkEdges.push({ id: `support-${source}-${target}`, from: source, to: target, kind: "supporting" }));
      item.journey?.relatedDomainIds?.forEach((target) => networkEdges.push({ id: `domain-${source}-${target}`, from: source, to: target, kind: "domain" }));
      item.journey?.relatedCapabilityIds?.forEach((target) => networkEdges.push({ id: `capability-${source}-${target}`, from: source, to: target, kind: "capability" }));
    });
    projectNodes.forEach((node) => {
      networkEdges.push({ id: `project-${node.sourceExperienceId}-${node.id}`, from: node.sourceExperienceId, to: node.id, kind: "project" });
    });

    const nodes = [...experienceNodes, ...conceptNodes, ...projectNodes];
    const nodesById = new Map(nodes.map((node) => [node.id, node]));
    const validNetworkEdges = networkEdges.filter((edge) => nodesById.has(edge.from) && nodesById.has(edge.to));
    if (import.meta.env.DEV) validateNetworkGeometry(nodesById, validNetworkEdges);
    return { experienceNodes, conceptNodes, projectNodes, networkEdges: validNetworkEdges, nodesById };
  }, [items]);
  const activeNodeId = selectedNodeId ?? hoveredNodeId;
  const activeNode = activeNodeId ? nodesById.get(activeNodeId) : undefined;
  const activeItem = activeNode?.experienceId ? items.find((item) => item.id === activeNode.experienceId) : undefined;
  const connectedNodeIds = new Set<string>();

  if (activeNodeId) {
    connectedNodeIds.add(activeNodeId);
    networkEdges.forEach((edge) => {
      if (edge.from === activeNodeId || edge.to === activeNodeId) {
        connectedNodeIds.add(edge.from);
        connectedNodeIds.add(edge.to);
      }
    });
  }

  function edgePath(edge: CareerNetworkEdge) {
    const from = nodesById.get(edge.from)!;
    const to = nodesById.get(edge.to)!;
    const start = getPillBoundaryPoint(from, to);
    const end = getPillBoundaryPoint(to, from);
    if (edge.kind === "chronology") {
      const deltaX = end.x - start.x;
      return `M ${start.x} ${start.y} C ${start.x + deltaX * 0.34} ${start.y}, ${end.x - deltaX * 0.34} ${end.y}, ${end.x} ${end.y}`;
    }

    const midpointX = (start.x + end.x) / 2;
    const bend = edge.kind === "project" ? -28 : edge.kind === "supporting" ? 14 : start.y < end.y ? -20 : 20;
    return `M ${start.x} ${start.y} Q ${midpointX} ${(start.y + end.y) / 2 + bend} ${end.x} ${end.y}`;
  }

  function nodeOpacity(node: CareerNetworkNode) {
    if (!activeNodeId) return 1;
    return connectedNodeIds.has(node.id) ? 1 : 0.2;
  }

  function edgeOpacity(edge: CareerNetworkEdge) {
    const base = edge.kind === "chronology" ? 0.78 : edge.kind === "project" ? 0.66 : edge.kind === "supporting" ? 0.32 : edge.kind === "domain" ? 0.42 : edge.kind === "convergence" ? 0.34 : 0.36;
    if (!activeNodeId) return base;
    return edge.from === activeNodeId || edge.to === activeNodeId ? 1 : 0.08;
  }

  const actionLabel = activeItem ? getJourneyActionLabel(activeItem) : undefined;
  const floatingPanelPosition = activeNode
    ? {
        left: activeNode.centerX > NETWORK_VIEWBOX.width * 0.7
          ? Math.max(18, activeNode.centerX - activeNode.width / 2 - 278)
          : Math.min(NETWORK_VIEWBOX.width - 268, activeNode.centerX + activeNode.width / 2 + 18),
        top: activeNode.kind === "primary"
          ? Math.max(72, activeNode.centerY - 210)
          : Math.min(Math.max(132, activeNode.centerY - 104), NETWORK_VIEWBOX.height - 166),
      }
    : null;

  function cancelHoverLeave() {
    if (hoverLeaveTimeout.current) {
      clearTimeout(hoverLeaveTimeout.current);
      hoverLeaveTimeout.current = null;
    }
  }

  function beginHover(nodeId: string) {
    cancelHoverLeave();
    if (!selectedNodeId) onHover(nodeId);
  }

  function scheduleHoverClear() {
    cancelHoverLeave();
    if (selectedNodeId) return;
    hoverLeaveTimeout.current = setTimeout(() => onHover(null), 120);
  }

  useEffect(() => () => cancelHoverLeave(), []);

  useEffect(() => {
    if (!selectedNodeId) return;

    const clearOnOutsidePointer = (event: PointerEvent) => {
      if (!networkRef.current?.contains(event.target as Node)) onReset();
    };

    document.addEventListener("pointerdown", clearOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", clearOnOutsidePointer);
  }, [onReset, selectedNodeId]);

  return (
    <div className="hidden xl:block">
      <Reveal>
        <div className="mx-auto max-w-none text-center">
          <p className="section-kicker">Journey</p>
          <h2 className="section-title mt-4 whitespace-nowrap text-5xl font-semibold text-white">
            Different experiences, one connected journey.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-200/76">
            Each step contributed to who I am and how I approach engineering today.
          </p>
        </div>
      </Reveal>

      <Reveal delayMs={100}>
        <div className="glass-panel relative mx-auto mt-8 w-full max-w-[1280px] overflow-hidden rounded-[32px] border-white/12 bg-[linear-gradient(145deg,rgba(11,23,36,0.84),rgba(5,12,21,0.72))] p-5 xl:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(134,232,249,0.12),transparent_22%),radial-gradient(circle_at_88%_72%,rgba(148,163,255,0.1),transparent_24%)]" />
          <div className="relative flex items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a6eaf6]">Career Network</p>
              <p className="mt-1.5 text-sm text-slate-300/72">Six defining turning points, connected by the experiences that shaped my perspective.</p>
            </div>
            {selectedNodeId ? (
              <button type="button" onClick={onReset} className="rounded-full border border-white/14 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-[#8feaf8]/40 hover:text-white">
                <span aria-hidden="true" className="mr-1.5">×</span> Clear focus
              </button>
            ) : null}
          </div>

          <div
            ref={networkRef}
            className="relative mx-auto mt-4 aspect-[1280/500] w-full max-w-[1240px]"
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) onReset();
            }}
          >
            <svg
              viewBox={`0 0 ${NETWORK_VIEWBOX.width} ${NETWORK_VIEWBOX.height}`}
              className="absolute inset-0 h-full w-full overflow-visible"
              onPointerDown={(event) => {
                if (event.target === event.currentTarget) onReset();
              }}
            >
              {networkEdges.filter((edge) => edge.kind === "chronology").map((edge) => (
                <path key={`${edge.id}-glow`} d={edgePath(edge)} fill="none" stroke="rgba(94,234,212,0.14)" strokeWidth="6" strokeLinecap="round" style={{ filter: "blur(4px)" }} />
              ))}
              {networkEdges.map((edge, index) => {
                const stroke = edge.kind === "chronology" ? "rgba(143,234,248,0.96)" : edge.kind === "project" ? "rgba(116,232,245,0.78)" : edge.kind === "supporting" ? "rgba(203,213,225,0.5)" : edge.kind === "domain" ? "rgba(103,218,241,0.7)" : edge.kind === "convergence" ? "rgba(129,234,217,0.62)" : "rgba(182,164,255,0.64)";
                return (
                  <motion.path
                    key={edge.id}
                    d={edgePath(edge)}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={edge.kind === "chronology" ? 2 : edge.kind === "project" ? 1.25 : edge.kind === "domain" ? 1.15 : edge.kind === "capability" ? 1.05 : 0.9}
                    strokeDasharray={edge.kind === "supporting" ? "3 6" : edge.kind === "capability" ? "3 5" : undefined}
                    strokeLinecap="round"
                    initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: edgeOpacity(edge) }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: index * 0.022, ease: "easeOut" }}
                  />
                );
              })}
              {conceptNodes.map((node, index) => {
                const lines = node.label.split("\n");
                const isDomain = node.kind === "domain";
                const isIdentity = node.kind === "identity";
                const fill = isIdentity
                  ? "rgba(22,93,94,0.48)"
                  : isDomain
                    ? "rgba(15,67,84,0.7)"
                    : "rgba(52,52,100,0.54)";
                const stroke = isIdentity
                  ? "rgba(121,236,215,0.52)"
                  : isDomain
                    ? "rgba(104,220,241,0.48)"
                    : "rgba(178,165,255,0.46)";
                const text = isIdentity
                  ? "rgba(226,255,250,0.92)"
                  : isDomain
                    ? "rgba(205,248,255,0.9)"
                    : "rgba(232,229,255,0.88)";
                return (
                  <motion.g key={node.id} pointerEvents="none" animate={{ opacity: nodeOpacity(node) }} transition={{ duration: prefersReducedMotion ? 0 : 0.28, delay: prefersReducedMotion ? 0 : index * 0.012 }}>
                    <rect x={node.centerX - node.width / 2} y={node.centerY - node.height / 2} width={node.width} height={node.height} rx={node.height / 2} fill={fill} stroke={stroke} strokeWidth="1" style={{ filter: isIdentity ? "drop-shadow(0 0 6px rgba(94,234,212,0.14))" : isDomain ? "drop-shadow(0 0 5px rgba(103,218,241,0.1))" : "drop-shadow(0 0 5px rgba(167,139,250,0.1))" }} />
                    <text x={node.centerX} y={node.centerY - ((lines.length - 1) * 5.5)} textAnchor="middle" fill={text} fontSize={isIdentity ? 10 : 8.9} fontWeight="600" letterSpacing={isIdentity ? 1.15 : 0.9}>
                      {lines.map((line, lineIndex) => <tspan key={line} x={node.centerX} dy={lineIndex === 0 ? 0 : 12}>{line}</tspan>)}
                    </text>
                  </motion.g>
                );
              })}
              {projectNodes.map((node, index) => {
                const focused = hoveredNodeId === node.id;
                return (
                  <motion.g
                    key={node.id}
                    role="link"
                    tabIndex={0}
                    aria-label={`View ${node.projectTitle} in Selected Work`}
                    onClick={() => node.projectTitle && onProjectSelect(node.projectTitle)}
                    onKeyDown={(event) => {
                      if ((event.key === "Enter" || event.key === " ") && node.projectTitle) {
                        event.preventDefault();
                        onProjectSelect(node.projectTitle);
                      }
                    }}
                    onMouseEnter={() => onHover(node.id)}
                    onMouseLeave={scheduleHoverClear}
                    onFocus={() => onHover(node.id)}
                    onBlur={scheduleHoverClear}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: nodeOpacity(node) }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: 0.15 + index * 0.04 }}
                    className="cursor-pointer outline-none"
                  >
                    <rect
                      x={node.centerX - node.width / 2}
                      y={node.centerY - node.height / 2}
                      width={node.width}
                      height={node.height}
                      rx={node.height / 2}
                      fill={focused ? "rgba(32,110,125,0.92)" : "rgba(17,72,86,0.9)"}
                      stroke={focused ? "rgba(194,250,255,0.94)" : "rgba(128,234,247,0.76)"}
                      strokeWidth={focused ? 1.35 : 1}
                      style={{ filter: focused ? "drop-shadow(0 0 10px rgba(94,234,212,0.32))" : "drop-shadow(0 0 6px rgba(94,234,212,0.18))" }}
                    />
                    <text x={node.centerX} y={node.centerY + 3} textAnchor="middle" fill="#e8fdff" fontSize="8.8" fontWeight="600" letterSpacing="1.15" pointerEvents="none">
                      {node.label}
                    </text>
                  </motion.g>
                );
              })}
              {experienceNodes.map((node, index) => {
                const selected = node.id === selectedNodeId;
                const focused = selected || hoveredNodeId === node.id;
                const lines = node.label.split("\n");
                const isTurningPoint = node.kind === "primary";
                const nodeFill = selected
                  ? "rgba(39,118,136,0.5)"
                  : focused && isTurningPoint
                    ? "rgba(24,90,108,0.82)"
                    : isTurningPoint
                      ? "rgba(14,62,76,0.78)"
                      : "rgba(8,19,30,0.88)";
                const nodeStroke = selected
                  ? "rgba(184,247,255,0.94)"
                  : focused && isTurningPoint
                    ? "rgba(140,238,248,0.84)"
                    : isTurningPoint
                      ? "rgba(111,224,237,0.62)"
                      : focused
                        ? "rgba(143,234,248,0.54)"
                        : "rgba(143,234,248,0.2)";
                const nodeGlow = selected
                  ? "drop-shadow(0 0 14px rgba(94,234,212,0.34))"
                  : focused && isTurningPoint
                    ? "drop-shadow(0 0 10px rgba(94,234,212,0.27))"
                    : isTurningPoint
                      ? "drop-shadow(0 0 7px rgba(94,234,212,0.16))"
                      : focused
                        ? "drop-shadow(0 0 5px rgba(94,234,212,0.14))"
                        : undefined;
                return (
                  <motion.g
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Focus ${node.label.replace("\n", " ")} journey chapter`}
                    aria-pressed={selected}
                    onClick={() => onSelect(node.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelect(node.id);
                      }
                    }}
                    onMouseEnter={() => beginHover(node.id)}
                    onMouseLeave={scheduleHoverClear}
                    onFocus={() => beginHover(node.id)}
                    onBlur={scheduleHoverClear}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: nodeOpacity(node) }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: index * 0.06 }}
                    className="cursor-pointer outline-none"
                  >
                    <rect
                      x={node.centerX - node.width / 2}
                      y={node.centerY - node.height / 2}
                      width={node.width}
                      height={node.height}
                      rx={isTurningPoint ? node.height / 2 : 18}
                      fill={nodeFill}
                      stroke={nodeStroke}
                      strokeWidth={selected ? 1.6 : focused && isTurningPoint ? 1.45 : isTurningPoint ? 1.2 : focused ? 1.15 : 0.85}
                      style={{ filter: nodeGlow }}
                    />
                    <text
                      x={node.centerX}
                      y={node.centerY - ((lines.length - 1) * (isTurningPoint ? 7 : 5))}
                      textAnchor="middle"
                      fill={selected || focused || isTurningPoint ? "#e8fdff" : "rgba(226,232,240,0.68)"}
                      fontSize={isTurningPoint ? 12 : 9.2}
                      fontWeight="600"
                      letterSpacing={isTurningPoint ? 1.45 : 1.05}
                      pointerEvents="none"
                    >
                      {lines.map((line, lineIndex) => <tspan key={line} x={node.centerX} dy={lineIndex === 0 ? 0 : isTurningPoint ? 15 : 11}>{line}</tspan>)}
                    </text>
                  </motion.g>
                );
              })}
            </svg>

            {activeItem && activeNode && floatingPanelPosition ? (
              <motion.article
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
                onMouseEnter={cancelHoverLeave}
                onMouseLeave={scheduleHoverClear}
                className="absolute z-20 w-[250px] rounded-2xl border border-[#8feaf8]/24 bg-[rgba(7,17,28,0.96)] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                style={{ left: `${(floatingPanelPosition.left / NETWORK_VIEWBOX.width) * 100}%`, top: `${(floatingPanelPosition.top / NETWORK_VIEWBOX.height) * 100}%` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a6eaf6]">{selectedNodeId ? "Pinned chapter" : activeItem.type}</p>
                  {selectedNodeId ? <button type="button" onClick={onReset} aria-label="Clear journey focus" className="text-sm leading-none text-slate-400 transition hover:text-white">×</button> : null}
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-5 text-white">{activeItem.organization}</h3>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{activeItem.period}</p>
                {activeItem.role ? <p className="mt-2 text-xs leading-5 text-[#a6eaf6]">{activeItem.role}</p> : null}
                <p className="mt-2 text-xs leading-5 text-slate-200/72">{activeItem.journeySummary ?? activeItem.description}</p>
                {activeItem.journey?.relatedProjectTitle
                  ? <JourneyProjectCapsule title={activeItem.journey.relatedProjectTitle} onClick={() => onAction(activeItem)} />
                  : actionLabel ? <button type="button" onClick={() => onAction(activeItem)} className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#dffbff] transition hover:text-white">{actionLabel} →</button> : null}
              </motion.article>
            ) : null}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>(() => withJourneyMetadata(FALLBACK_EXPERIENCE));
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
  const [selectedNetworkNodeId, setSelectedNetworkNodeId] = useState<string | null>(null);
  const [hoveredNetworkNodeId, setHoveredNetworkNodeId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const timelineProgress = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data: ExperienceItem[]) => setItems(withJourneyMetadata(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedNetworkNodeId || selectedItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedNetworkNodeId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedNetworkNodeId, selectedItem]);

  function selectWorkProject(projectTitle: string) {
    window.dispatchEvent(new CustomEvent("portfolio:select-project", { detail: { title: projectTitle } }));
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setHoveredNetworkNodeId(null);
    setSelectedNetworkNodeId(null);
  }

  function handleJourneyAction(item: ExperienceItem) {
    const projectTitle = item.journey?.relatedProjectTitle;
    if (projectTitle) {
      selectWorkProject(projectTitle);
      return;
    }

    setSelectedItem(item);
  }

  return (
    <section id="experience" className="section-shell px-4 md:px-8">
      <SpaceSectionBackdrop variant="medium" />

      <CareerNetwork
        items={items}
        selectedNodeId={selectedNetworkNodeId}
        hoveredNodeId={hoveredNetworkNodeId}
        onSelect={(nodeId) => {
          setHoveredNetworkNodeId(null);
          setSelectedNetworkNodeId((currentNodeId) => currentNodeId === nodeId ? null : nodeId);
        }}
        onHover={setHoveredNetworkNodeId}
        onReset={() => {
          setHoveredNetworkNodeId(null);
          setSelectedNetworkNodeId(null);
        }}
        onAction={handleJourneyAction}
        onProjectSelect={selectWorkProject}
      />

      <div className="relative mx-auto max-w-6xl xl:hidden">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Journey</p>
            <h2 className="section-title text-balance mt-4 text-4xl font-semibold text-white md:text-5xl">
              Different experiences, one connected journey.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-200/76 md:text-lg md:leading-8">
              Each step contributed to who I am and how I approach engineering today.
            </p>
          </div>
        </Reveal>

        <div className="mt-4 md:hidden flex justify-center">
          <a
            href={RESUME_FILE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#36b8cf]/30 bg-[#36b8cf]/10 px-4 py-2 text-xs text-[#d9fbff] hover:bg-[#36b8cf]/16 transition"
          >
            <ResumeIcon />
            <span>Download Resume</span>
          </a>
        </div>

        <div ref={timelineRef} className="relative mt-8 md:mt-10">
          <div aria-hidden="true" className="absolute bottom-4 left-3 top-3 w-px bg-white/10 lg:bottom-8 lg:left-1/2 lg:top-0 lg:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-4 left-3 top-3 w-px origin-top bg-[linear-gradient(180deg,rgba(134,232,249,0.12),rgba(134,232,249,0.76),rgba(134,232,249,0.24))] lg:bottom-8 lg:left-1/2 lg:top-0 lg:-translate-x-1/2"
            style={{ scaleY: timelineProgress }}
          />

          <div className="relative">
            {items.map((exp, i) => {
              const variant = getJourneyVariant(exp);
              const actionLabel = getJourneyActionLabel(exp);
              const majorIndex = items.slice(0, i + 1).filter((item) => getJourneyVariant(item) === "major").length;
              const side = exp.journeySide ?? (majorIndex % 2 === 1 ? "left" : "right");
              const previousVariant = i > 0 ? getJourneyVariant(items[i - 1]) : undefined;
              const onAction = actionLabel ? () => handleJourneyAction(exp) : undefined;
              const spacing = i === 0
                ? ""
                : variant === "milestone" && previousVariant === "milestone"
                  ? "mt-7 md:mt-8 lg:mt-10"
                  : variant === "milestone"
                    ? "mt-10 md:mt-12 lg:mt-14"
                    : "mt-12 md:mt-14 lg:mt-16";

              return (
                <Reveal key={`${exp.organization}-${exp.period}`} delayMs={i * 40} className={spacing}>
                  <div className="relative grid items-start lg:grid-cols-[minmax(0,1fr)_92px_minmax(0,1fr)]">
                    <div className="hidden lg:block">
                      {variant === "major" && side === "left" && (
                        <div className="flex items-start justify-end pt-5">
                          <MajorChapter item={exp} chapterNumber={majorIndex} actionLabel={actionLabel} onAction={onAction} />
                          <span aria-hidden="true" className="mt-[22px] h-px w-7 shrink-0 bg-gradient-to-r from-white/8 to-[#9de5f1]/35" />
                        </div>
                      )}
                      {variant === "milestone" && side === "left" && (
                        <div className="flex items-start justify-end pt-0.5">
                          <CompactMilestone item={exp} actionLabel={actionLabel} onAction={onAction} />
                          <span aria-hidden="true" className="mt-4 h-px w-7 shrink-0 bg-gradient-to-r from-white/8 to-[#9de5f1]/26" />
                        </div>
                      )}
                    </div>
                    <div className="hidden lg:flex justify-center pt-5"><TimelineNode variant={variant} chapterNumber={majorIndex} isCurrent={exp.isCurrent} /></div>
                    <div className="hidden lg:block">
                      {variant === "major" ? (
                        side === "right" && (
                          <div className="flex items-start pt-5">
                            <span aria-hidden="true" className="mt-[22px] h-px w-7 shrink-0 bg-gradient-to-l from-white/8 to-[#9de5f1]/35" />
                            <MajorChapter item={exp} chapterNumber={majorIndex} actionLabel={actionLabel} onAction={onAction} />
                          </div>
                        )
                      ) : (
                        side === "right" && (
                          <div className="flex items-start pt-0.5">
                            <span aria-hidden="true" className="mt-4 h-px w-7 shrink-0 bg-gradient-to-l from-white/8 to-[#9de5f1]/26" />
                            <CompactMilestone item={exp} actionLabel={actionLabel} onAction={onAction} />
                          </div>
                        )
                      )}
                    </div>
                    <div className="relative pl-10 lg:hidden">
                      <div className="absolute left-0 top-4"><TimelineNode variant={variant} chapterNumber={majorIndex} isCurrent={exp.isCurrent} /></div>
                      {variant === "major" ? <MajorChapter item={exp} chapterNumber={majorIndex} actionLabel={actionLabel} onAction={onAction} /> : <CompactMilestone item={exp} actionLabel={actionLabel} onAction={onAction} />}
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delayMs={items.length * 40} className="mt-14 md:mt-16">
              <JourneyNow />
            </Reveal>
          </div>
        </div>

        <div className="mt-12 hidden justify-center lg:flex">
          <a
            href={RESUME_FILE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#36b8cf]/26 bg-[#36b8cf]/8 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d9fbff] transition hover:border-[#36b8cf]/45 hover:bg-[#36b8cf]/14"
          >
            <ResumeIcon className="h-3.5 w-3.5" />
            <span>View Resume</span>
          </a>
        </div>
      </div>

      {selectedItem && (
        <ExperienceModal
          item={selectedItem}
          onClose={() => {
            setSelectedItem(null);
          }}
        />
      )}
    </section>
  );
}

function ExperienceModal({
  item,
  onClose,
}: {
  item: ExperienceItem;
  onClose: () => void;
}) {
  const media = item.media ?? [];
  const details = item.details ?? [];
  const storyBlocks = item.storyBlocks ?? [];

  const hasStoryBlocks = storyBlocks.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-6">
      <button
        aria-label="Close modal overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <div className="relative mx-auto my-6 w-full max-w-4xl">
        <div className="max-h-[calc(100vh-3rem)] overflow-y-auto rounded-[30px] border border-white/12 bg-[rgba(10,18,27,0.94)] backdrop-blur-xl shadow-2xl animate-modalIn [scrollbar-width:thin] [scrollbar-color:rgba(45,212,191,0.45)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-teal-400/40 hover:[&::-webkit-scrollbar-thumb]:bg-teal-300/55">
          <div className="flex items-start justify-between gap-4 p-6 border-b border-white/10">
            <div>
              <div className="mb-3">
                <ExperienceTypeBadge type={item.type} />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">{item.organization}</h3>
              {item.role && <p className="text-sm text-[#1fa8c5] mt-2">{item.role}</p>}
              <p className="text-slate-300 text-sm mt-2">{item.period}</p>
              {item.highlightText && (
                <p className="text-amber-300/95 text-sm md:text-base mt-3">{item.highlightText}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="shrink-0 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              ✕
            </button>
          </div>

          <div className="p-5 md:p-6 space-y-4">
            {hasStoryBlocks ? (
              <div className="space-y-4 md:space-y-5">
                {storyBlocks.map((block, idx) => {
                  if (block.type === "heading") {
                    return (
                      <h4 key={`${block.type}-${idx}`} className="text-xl md:text-2xl font-semibold text-slate-100">
                        {block.text}
                      </h4>
                    );
                  }

                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={`${block.type}-${idx}`}
                        className="text-xs md:text-sm leading-relaxed text-slate-200/95 whitespace-pre-line"
                      >
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "image") {
                    return (
                      <div
                        key={`${block.type}-${idx}-${block.src}`}
                        className="rounded-lg overflow-hidden border border-white/10 bg-black/20 p-2"
                      >
                        <div className="h-[260px] md:h-[360px] lg:h-[420px] flex items-center justify-center">
                          <img
                            src={block.src}
                            alt={block.alt ?? item.organization}
                            className="max-h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    );
                  }

                  if (block.type === "imageRow") {
                    return (
                      <div
                        key={`${block.type}-${idx}`}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {block.images.map((img) => (
                          <div
                            key={`${img.src}-${idx}`}
                            className="rounded-lg overflow-hidden border border-white/10 bg-black/20 p-2"
                          >
                            <div className="h-[220px] md:h-[280px] lg:h-[320px] flex items-center justify-center">
                              <img
                                src={img.src}
                                alt={img.alt ?? item.organization}
                                className="max-h-full w-full object-contain"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <figure
                        key={`${block.type}-${idx}`}
                        className="rounded-lg border border-teal-300/30 bg-teal-300/5 px-5 py-4"
                      >
                        <blockquote className="text-xs md:text-sm italic text-slate-100/95 whitespace-pre-line">
                          {block.text}
                        </blockquote>
                        {block.by && (
                          <figcaption className="mt-2 text-[11px] md:text-xs text-teal-200/90">
                            - {block.by}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  return (
                    <div
                      key={`${block.type}-${idx}`}
                      className="h-px w-full bg-white/15"
                    />
                  );
                })}
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-200/90 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>

                {!!details.length && (
                  <div>
                    <div className="text-sm font-semibold mb-2 text-slate-100">Story</div>
                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                      {details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!!media.length && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {media.map((src) => (
                      <div
                        key={src}
                        className="rounded-lg overflow-hidden border border-white/10 bg-black/20 p-2"
                      >
                        <div className="h-[220px] md:h-[280px] lg:h-[320px] flex items-center justify-center">
                          <img
                            src={src}
                            alt="Experience media"
                            className="max-h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
