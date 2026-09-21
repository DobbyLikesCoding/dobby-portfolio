import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import SpaceSectionBackdrop from '../components/SpaceSectionBackdrop';

type Service = { title: string; body: string };
const FLOW_STAGES = ['Understand', 'Improve', 'Prevent', 'Build'];

const FALLBACK_SERVICES: Service[] = [
  {
    title: 'SYSTEMS THINKING',
    body: 'I connect people, processes, data, software, and infrastructure to understand how the whole system works before deciding what to change.',
  },
  {
    title: 'AUTOMATION & OPTIMIZATION',
    body: 'I identify repetitive work and operational friction, then use software and data to simplify processes, automate what can be automated, and make systems easier to operate.',
  },
  {
    title: 'ROOT CAUSE & PREVENTION',
    body: 'I use data and system-level analysis to separate symptoms from root causes. Instead of repeatedly reacting to problems, I look for ways to prevent them or detect them earlier.',
  },
  {
    title: 'ARCHITECTURE & EXECUTION',
    body: 'I turn solutions into production systems with the full lifecycle in mind — from architecture and interfaces to deployment, monitoring, and operations.',
  },
];

function ServiceCard({
  item,
  index,
}: {
  item: Service;
  index: number;
}) {
  return (
    <Reveal delayMs={index * 90}>
      <div className="group glass-panel relative h-full overflow-hidden rounded-[30px] p-6 transition hover:-translate-y-1.5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(134,232,249,0.15),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,176,121,0.12),transparent_22%)] opacity-0 transition group-hover:opacity-100" />
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#baf4ff]">
              {FLOW_STAGES[index]}
            </span>
          </div>
          <h3 className="mt-8 max-w-sm text-xl font-semibold leading-8 text-white">
            {item.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-200/76">
            {item.body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function EngineeringFlow() {
  const steps = ['Understand', 'Improve', 'Prevent', 'Build'];

  return (
    <div className="glass-panel relative overflow-hidden rounded-[28px] p-5 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(134,232,249,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,176,121,0.12),transparent_28%)]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#baf4ff]">Engineering Flow</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-slate-300/75">
            Focus Lens
          </span>
        </div>
        <div className="relative mt-7 grid grid-cols-4 gap-2">
          <div className="absolute left-[12%] right-[12%] top-3 h-px bg-[linear-gradient(90deg,rgba(134,232,249,0.16),rgba(134,232,249,0.58),rgba(255,176,121,0.22))]" />
          {steps.map((step, index) => (
            <div key={step} className="relative flex min-w-0 flex-col items-center text-center">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#86e8f9]/35 bg-[#86e8f9]/12 text-[9px] font-semibold text-[#dffbff]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mt-2 text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-200/80 sm:text-[9px]">
                {step}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-slate-200/72">
          Understand the system. Improve what matters. Prevent what repeats. Build what lasts.
        </p>
      </div>
    </div>
  );
}

export default function WhatIDo() {
  const [items, setItems] = useState<Service[]>(FALLBACK_SERVICES);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <section id="what-i-do" className="section-shell px-4 md:px-8">
      <SpaceSectionBackdrop variant="medium" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-end">
            <div>
              <p className="section-kicker">Focus</p>
              <h2 className="section-title text-balance mt-4 text-4xl font-semibold text-white md:text-5xl">
                Systems thinking that turns complexity into automation.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-200/78">
                I look beyond individual components to understand the whole system — people, processes, data, and technology — then find root causes and build solutions that simplify, automate, and prevent recurring problems.
              </p>
            </div>
            <EngineeringFlow />
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
