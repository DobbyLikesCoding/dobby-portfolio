import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import SpaceSectionBackdrop from "../components/SpaceSectionBackdrop";
import TiltCard from "../components/TiltCard";

const RESUME_FILE = "/files/Resume_sunghyun.pdf";

type ExperienceItem = {
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

const FALLBACK_EXPERIENCE: ExperienceItem[] = [
  {
    type: "Education",
    organization: "HANSEO University, South Korea",
    role: "B.E., Aerospace Software Engineering",
    period: "Feb 2006",
    description: "Enrolled in an interdisciplinary curriculum combining aerospace engineering and computer science, focusing on software development for aviation systems.",
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
    type: "Professional",
    organization: "MBC (Munhwa Broadcasting Corporation), South Korea",
    role: "Broadcast Technician",
    period: "May 2009 – May 2011",
    description: "Maintained broadcast and studio equipment and supported editorial room operations, ensuring stable on-air broadcasting and technical reliability.",
    journeyVariant: "milestone",
    journeySide: "left",
    journeySummary: "Learned operational reliability in live broadcast environments.",
  },
  {
    type: "Personal",
    organization: "Camino de Santiago, Europe",
    role: "Solo Pilgrimage",
    period: "Jun 2011 – Aug 2011",
    description: "Completed a 1,000 km solo pilgrimage along the Camino de Santiago, starting in St-Jean-Pied-de-Port, France, and continuing beyond Santiago de Compostela toward Portugal. What started as a simple travel plan eventually became a turning point that shaped my mindset, resilience, and long-term direction in life.",
    journeyVariant: "major",
    journeyLabel: "Turning Point",
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
    type: "Education",
    organization: "HANSEO University, South Korea",
    role: "B.E., Aerospace Software Engineering",
    period: "Feb 2015",
    description: "Graduated with a Bachelor of Engineering in Aerospace Software Engineering.",
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
    type: "Professional",
    organization: "Pixoneer Geomatics",
    role: "Software Engineer",
    period: "Oct 2014 – Jun 2016",
    description: "Worked on aerospace and defense projects, including a helicopter condition monitoring system, gaining hands-on experience across the full software development life cycle from requirements analysis to deployment.",
    journeyVariant: "major",
    journeyLabel: "First Production Systems",
    journeySide: "left",
  },
  {
    type: "Professional",
    organization: "QRAFT Technologies",
    role: "AXE Team Leader & Senior Software Development Engineer",
    period: "Nov 2016 – Nov 2023",
    description: "Led the AXE team and operated a real-time automated order execution system based on reinforcement learning, ensuring stable, low-latency trading operations for large institutional clients.",
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
    type: "Transition",
    organization: "Relocation",
    period: "Dec 2023 - Apr 2024",
    description: "A new beginning: I've made the big move to the United States and am ready for what lies ahead.",
    journeyVariant: "milestone",
    journeySide: "left",
    journeySummary: "A transition into the next chapter in the United States.",
  },
  {
    type: "Professional",
    organization: "LG Energy Solution Michigan",
    role: "Senior Smart Factory Engineer",
    period: "May 2024 – Present",
    description: "Operated and managed smart factory product traceability systems for EV and ESS battery manufacturing, ensuring stable production by supporting roll map and cell tracking systems across electrode and assembly processes.",
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

function canOpenExperienceModal(item: ExperienceItem) {
  return !!(item.storyBlocks?.length || item.media?.length || item.details?.length);
}

function withJourneyMetadata(items: ExperienceItem[]) {
  return items.map((item, index) => {
    const fallback = FALLBACK_EXPERIENCE[index];

    return {
      ...fallback,
      ...item,
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

function ExperienceTypeBadge({ type }: { type?: string }) {
  if (!type) return null;

  return (
    <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#dffbff] backdrop-blur-md">
      {type}
    </span>
  );
}

function getJourneyVariant(item: ExperienceItem): JourneyVariant {
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

function MajorChapter({ item, chapterNumber, onOpen }: { item: ExperienceItem; chapterNumber: number; onOpen?: () => void }) {
  const showStoryButton = !!onOpen && item.showStoryLink !== false;

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
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-200/72">{item.description}</p>
      {showStoryButton && (
        <button
          type="button"
          onClick={onOpen}
          className="group mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#dffbff] transition hover:text-white"
        >
          <span>Explore Chapter</span>
          <span className="transition-transform group-hover:translate-x-0.5"><StoryArrowIcon /></span>
        </button>
      )}
    </TiltCard>
  );
}

function CompactMilestone({ item, onOpen }: { item: ExperienceItem; onOpen?: () => void }) {
  const showStoryButton = !!onOpen && item.showStoryLink !== false;

  return (
    <div className="max-w-[315px] py-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300/85">{item.period}</span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#9fe9f8]/75">{item.type}</span>
      </div>
      <h3 className="mt-2 text-sm font-semibold text-white">{item.organization}</h3>
      {item.role && <p className="mt-1 text-xs leading-5 text-[#9ee7f4]/90">{item.role}</p>}
      {item.journeySummary && <p className="mt-1.5 line-clamp-1 text-xs leading-5 text-slate-300/65">{item.journeySummary}</p>}
      {showStoryButton && (
        <button type="button" onClick={onOpen} className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300/80 transition hover:text-white">
          Explore Chapter
        </button>
      )}
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

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>(FALLBACK_EXPERIENCE);
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
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

  return (
    <section id="experience" className="section-shell px-4 md:px-8">
      <SpaceSectionBackdrop variant="medium" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Journey</p>
            <h2 className="section-title text-balance mt-4 text-4xl font-semibold text-white md:text-5xl">
              From aerospace to trading to manufacturing — one system at a time.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-200/76 md:text-lg md:leading-8">
              Each chapter expanded how I think about systems, operations, and the people who depend on them.
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
              const canOpen = canOpenExperienceModal(exp);
              const majorIndex = items.slice(0, i + 1).filter((item) => getJourneyVariant(item) === "major").length;
              const side = exp.journeySide ?? (majorIndex % 2 === 1 ? "left" : "right");
              const previousVariant = i > 0 ? getJourneyVariant(items[i - 1]) : undefined;
              const onOpen = canOpen ? () => setSelectedItem(exp) : undefined;
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
                          <MajorChapter item={exp} chapterNumber={majorIndex} onOpen={onOpen} />
                          <span aria-hidden="true" className="mt-[22px] h-px w-7 shrink-0 bg-gradient-to-r from-white/8 to-[#9de5f1]/35" />
                        </div>
                      )}
                      {variant === "milestone" && side === "left" && (
                        <div className="flex items-start justify-end pt-0.5">
                          <CompactMilestone item={exp} onOpen={onOpen} />
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
                            <MajorChapter item={exp} chapterNumber={majorIndex} onOpen={onOpen} />
                          </div>
                        )
                      ) : (
                        side === "right" && (
                          <div className="flex items-start pt-0.5">
                            <span aria-hidden="true" className="mt-4 h-px w-7 shrink-0 bg-gradient-to-l from-white/8 to-[#9de5f1]/26" />
                            <CompactMilestone item={exp} onOpen={onOpen} />
                          </div>
                        )
                      )}
                    </div>
                    <div className="relative pl-10 lg:hidden">
                      <div className="absolute left-0 top-4"><TimelineNode variant={variant} chapterNumber={majorIndex} isCurrent={exp.isCurrent} /></div>
                      {variant === "major" ? <MajorChapter item={exp} chapterNumber={majorIndex} onOpen={onOpen} /> : <CompactMilestone item={exp} onOpen={onOpen} />}
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
