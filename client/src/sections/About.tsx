import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import SpaceSectionBackdrop from '../components/SpaceSectionBackdrop';
import TiltCard from '../components/TiltCard';

type AboutData = {
  headline: string;
  body: string[];
};

const FALLBACK_ABOUT: AboutData = {
  headline: 'I see the whole system, find the root cause, and turn recurring problems into automation.',
  body: [
    'With 13+ years of experience, I solve complex engineering problems by connecting people, processes, data, and technology — then turning what I learn into practical solutions.',
    'I connect people, processes, data, and technology to understand how a system really works. Working across different industries has taught me to look beyond individual components and see the bigger picture.',
    'I start by understanding the real need, then use data and system-level analysis to find the root cause. When a problem repeats, I look for a way to automate, simplify, or redesign it instead of solving the same problem again.',
  ],
};

function AboutMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-lg font-semibold leading-7 text-white md:text-xl">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">{label}</div>
    </div>
  );
}

function InsightCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <TiltCard className="glass-panel interactive-panel h-full rounded-[26px] p-5 md:p-6">
      <div className="text-[11px] uppercase tracking-[0.26em] text-[#9fe9f8]">{title}</div>
      <p className="mt-3 text-sm leading-6 text-slate-200/78">{body}</p>
    </TiltCard>
  );
}

export default function About() {
  const [about, setAbout] = useState<AboutData>(FALLBACK_ABOUT);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then(setAbout)
      .catch(console.error);
  }, []);

  return (
    <section id="about" className="section-shell px-4 md:px-8">
      <SpaceSectionBackdrop variant="medium" />
      <div className="mx-auto max-w-6xl space-y-5">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[32px] p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(134,232,249,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,176,121,0.1),transparent_22%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div className="min-w-0">
                <p className="section-kicker">About</p>
                <h2 className="section-title mt-4 max-w-3xl text-balance text-[2.8rem] font-semibold leading-[0.96] text-white md:text-[4.1rem]">
                  {about.headline}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200/80 md:text-[1.04rem]">
                  {about.body[0]}
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <AboutMetric value="13+" label="Years" />
                  <AboutMetric value="FinTech • Manufacturing • Battery • Aerospace" label="Domains" />
                  <AboutMetric value="Systems Thinking & Automation" label="Core Lens" />
                </div>
                </div>

              <div className="grid gap-4">
                <TiltCard className="overflow-hidden rounded-[30px] border border-white/10 bg-[#101b28] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
                  <img
                    src="/images/profile.jpg"
                    alt="Profile"
                    className="h-[320px] w-full rounded-[24px] object-cover object-center md:h-[380px] lg:h-[420px]"
                  />
                </TiltCard>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4">
                  <div className="text-[11px] uppercase tracking-[0.26em] text-[#9fe9f8]">Perspective</div>
                  <p className="mt-3 text-sm leading-6 text-slate-200/76">
                    The best solution is often not fixing the same problem faster, but designing a system that prevents it from happening again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 md:auto-rows-fr">
          <Reveal delayMs={100}>
            <InsightCard title="How I Think" body={about.body[1]} />
          </Reveal>
          <Reveal delayMs={180}>
            <InsightCard title="How I Solve" body={about.body[2]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
