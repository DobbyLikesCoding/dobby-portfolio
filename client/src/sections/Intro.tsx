// src/sections/Intro.tsx
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import CosmicVoyageBackground from '../components/CosmicVoyageBackground';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';

const RESUME_FILE = '/files/Resume_sunghyun.pdf';
const HERO_VIDEO = '/videos/bigbang-space-journey-intro.mp4';
const HERO_POSTER = '/videos/bigbang-space-journey-poster.jpg';

type IntroData = {
  name: string;
  title: string;
  lead: string;
  tags?: string[];
};

const FALLBACK_INTRO: IntroData = {
  name: 'Sunghyun Chang',
  title: 'Senior Software & Systems Engineer',
  lead: 'Systems thinking. Practical automation. Real-world impact.',
  tags: ['System Architecture', 'Automation', 'Distributed Systems', 'Data Systems'],
};

function IntroTag({ label }: { label: string }) {
  return (
    <span className="inline-flex whitespace-nowrap rounded-full border border-white/15 bg-white/[0.02] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-300/30 hover:text-white/85">
      {label}
    </span>
  );
}

function QuickFact({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <TiltCard className="rounded-[28px] border border-white/[0.055] bg-[rgba(8,16,26,0.34)] p-4 shadow-none md:p-4.5">
      <div className="text-[11px] uppercase tracking-[0.24em] text-slate-300/68">{label}</div>
      <div
        className={[
          'mt-3 font-semibold leading-snug text-white',
          multiline
            ? 'whitespace-pre-line text-[clamp(0.9rem,1vw,1rem)]'
            : 'text-[clamp(1.2rem,1.2vw,1rem)]',
        ].join(' ')}
      >
        {value}
      </div>
    </TiltCard>
  );
}

export default function Intro() {
  const [intro, setIntro] = useState<IntroData>(FALLBACK_INTRO);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(35);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.35 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const mirroredX = useTransform(smoothX, (value) => 100 - value);
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 88]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -36]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.86, 1], [1, 1, 0.72]);
  const panelY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -18]);
  const panelRotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -2.2]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(134,232,249,0.22), transparent 22%)`;
  const accentGlow = useMotionTemplate`radial-gradient(circle at ${mirroredX}% ${smoothY}%, rgba(255,176,121,0.14), transparent 20%)`;

  useEffect(() => {
    fetch('/api/intro')
      .then((res) => res.json())
      .then((data: IntroData) => setIntro(data))
      .catch((err) => {
        console.error('failed to load /api/intro', err);
      });
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const nextX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const nextY = ((event.clientY - bounds.top) / bounds.height) * 100;
    pointerX.set(nextX);
    pointerY.set(nextY);
  }

  return (
    <section
      id="intro"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-12 pt-24 md:px-8 md:pb-20 md:pt-32"
    >
      <CosmicVoyageBackground y={backgroundY} scale={backgroundScale} />
      {!prefersReducedMotion && (
        <motion.video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.72] saturate-[0.94]"
          style={{ y: backgroundY, scale: backgroundScale }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </motion.video>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(4,8,16,0.88),rgba(5,10,20,0.56)_42%,rgba(7,12,22,0.84))]" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ backgroundImage: spotlight }} />
      <motion.div className="pointer-events-none absolute inset-0" style={{ backgroundImage: accentGlow }} />
      <div className="pointer-events-none absolute inset-y-0 left-[-8%] w-[34%] bg-[radial-gradient(circle_at_center,rgba(134,232,249,0.16),transparent_68%)] blur-3xl animate-atmospheric-pan" />
      <div className="pointer-events-none absolute inset-y-0 right-[-10%] w-[38%] bg-[radial-gradient(circle_at_center,rgba(255,176,121,0.14),transparent_70%)] blur-3xl animate-atmospheric-pan [animation-delay:-7s]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent_0%,rgba(6,11,19,0.22)_22%,rgba(5,10,18,0.62)_68%,rgba(5,10,18,0.88)_100%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <motion.div
            className="mb-3 flex min-h-[3.5rem] items-end justify-center px-3 lg:mb-2 lg:min-h-[4.25rem]"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex max-w-5xl flex-wrap justify-center gap-2.5">
              {intro.tags?.map((tag) => (
                <IntroTag key={tag} label={tag} />
              ))}
            </div>
          </motion.div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:items-end xl:grid-cols-[minmax(0,1.12fr)_minmax(460px,0.88fr)]">
          <motion.div style={{ y: contentY, opacity: contentOpacity }}>

          <Reveal delayMs={140}>
            <motion.h1
              className="section-title text-balance mt-2 max-w-4xl text-[clamp(3.6rem,10vw,8rem)] font-semibold leading-[0.92] text-white"
              animate={{
                textShadow: [
                  '0 0 0 rgba(134,232,249,0)',
                  '0 0 24px rgba(134,232,249,0.14)',
                  '0 0 0 rgba(134,232,249,0)',
                ],
              }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {intro.name}
            </motion.h1>
          </Reveal>

          <Reveal delayMs={220}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#86e8f9]/20 bg-[#86e8f9]/10 px-4 py-2 text-[12px] uppercase tracking-[0.26em] text-[#dffbff]">
                <span className="h-2 w-2 rounded-full bg-[#86e8f9] animate-pulse-border" />
                {intro.title}
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={280}>
            <p className="text-balance mt-6 max-w-3xl text-lg leading-8 text-slate-200/82 md:text-[1.35rem] md:leading-9">
              {intro.lead}
            </p>
          </Reveal>

          <Reveal delayMs={340}>
            <div className="mt-8 flex flex-wrap items-center gap-3 pb-1 md:flex-nowrap">
              <motion.button
                type="button"
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold tracking-[0.12em] text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/10"
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                View Experience
              </motion.button>
              <motion.button
                type="button"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/12 bg-white px-5 py-3 text-sm font-semibold tracking-[0.12em] text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                Explore Projects
              </motion.button>
              <motion.a
                href={RESUME_FILE}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Resume"
                title="Open Resume"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/6 px-4 text-sm font-semibold tracking-[0.08em] text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/10"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.985 }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zm0 0 5 5M9 13h6M9 17h6M9 9h2"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
                <span>Resume</span>
              </motion.a>
            </div>
          </Reveal>
          </motion.div>

          <Reveal delayMs={260} className="lg:justify-self-end lg:pt-16 xl:pt-20">
            <TiltCard
              className="glass-panel interactive-panel relative mt-2 w-full max-w-[460px] overflow-hidden rounded-[32px] p-5 md:p-6 lg:mt-0 xl:max-w-[500px]"
              style={{ y: panelY, rotateZ: panelRotate }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(134,232,249,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,176,121,0.14),transparent_24%)]" />
              <div className="relative grid gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-slate-300/70">
                    Engineering Lens
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-200/82">
                    Seeing the whole system, finding root causes, and turning recurring problems into automation.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <QuickFact label="Experience" value="13+ Years" />
                  <QuickFact label="Domains" value={'FinTech • Smart Manufacturing\nESS & EV Battery • Aerospace & Defense'} multiline />
                  <QuickFact label="Focus" value="Systems Thinking & Automation" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(134,232,249,0.12),transparent)] animate-shimmer-sweep" />
            </TiltCard>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
