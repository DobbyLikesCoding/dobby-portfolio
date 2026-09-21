import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import SpaceSectionBackdrop from '../components/SpaceSectionBackdrop';

type SkillsData = {
  development: string[];
  platformTools: string[];
  systemsData: string[];
  engineeringPractice: string[];
};

const FALLBACK_SKILLS: SkillsData = {
  development: ['C#', '.NET Core', '.NET Framework', 'Python', 'TypeScript', 'React', 'WPF', 'WinForms', 'C++'],
  platformTools: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Git / GitHub', 'Linux', 'Windows', 'Grafana', 'Prometheus', 'JIRA'],
  systemsData: ['System Architecture', 'Distributed Systems', 'TCP/IP', 'REST API', 'Kafka / Pulsar', 'Redis', 'MySQL', 'FIX Protocol', 'Real-Time Data Systems'],
  engineeringPractice: ['Automation', 'System Design', 'Data Analysis', 'Root Cause Analysis', 'Reliability', 'Observability', 'CI/CD', 'Cross-functional Collaboration', 'Mentorship', 'Technical Leadership'],
};

function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-3.5 py-2 text-[11px] text-slate-100/84 transition hover:border-[#93ebfa]/34 hover:bg-[#93ebfa]/10">
      {label}
    </span>
  );
}

function SkillGroup({
  title,
  items,
  delayMs,
}: {
  title: string;
  items: string[];
  delayMs: number;
}) {
  return (
    <Reveal delayMs={delayMs}>
      <div className="glass-panel h-full rounded-[30px] p-6">
        <div className="inline-flex rounded-full border border-[#93ebfa]/18 bg-[#93ebfa]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#c9f8ff]">
          {title}
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {items.map((item) => (
            <SkillPill key={item} label={item} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillsData>(FALLBACK_SKILLS);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then(setSkills)
      .catch(console.error);
  }, []);

  return (
    <section id="skills" className="section-shell px-4 md:px-8">
      <SpaceSectionBackdrop variant="medium" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">Capabilities</p>
              <h2 className="section-title text-balance mt-4 text-4xl font-semibold text-white md:text-5xl">
                Technical depth for building and improving complex systems.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300/74 md:text-base">
              My experience spans software engineering, distributed systems, manufacturing systems, and infrastructure. I use the right tools for the problem — with a focus on automation, maintainability, and real-world operations.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5">
          <SkillGroup title="Development" items={skills.development} delayMs={80} />
          <div className="grid gap-5 lg:grid-cols-3">
            <SkillGroup title="Platform & Tools" items={skills.platformTools} delayMs={140} />
            <SkillGroup title="Systems & Data" items={skills.systemsData} delayMs={220} />
            <SkillGroup title="Engineering Practice" items={skills.engineeringPractice} delayMs={300} />
          </div>
        </div>
      </div>
    </section>
  );
}
