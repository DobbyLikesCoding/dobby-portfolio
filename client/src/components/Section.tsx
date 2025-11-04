// src/components/Section.tsx
import type { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  id: string;
  title: string;
  index: string;
}>;

export function Section({ id, title, index, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-teal-300 font-mono text-sm">{index}.</span>
        <h2 className="text-3xl font-semibold text-slate-100">{title}</h2>
        <div className="h-px bg-slate-700 flex-1" />
      </div>
      {children}
    </section>
  );
}
