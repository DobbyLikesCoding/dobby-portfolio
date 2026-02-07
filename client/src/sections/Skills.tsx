import { useEffect, useState } from 'react';

type SkillsData = {
  development: string[];
  tools: string[];
  knowledge: string[];
  softskill: string[];
};

export default function Skills() {
  const [skills, setSkills] = useState<SkillsData | null>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then(setSkills)
      .catch(console.error);
  }, []);

  if (!skills) return null;

  return (
    <section id="skills" className="bg-[#111314] text-slate-100 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Skills</h2>
        <div className="mt-3 h-1 w-24 bg-cyan-400/80 rounded-full" />

        {/* ===== Row 1: DEVELOPMENT only ===== */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <span className="text-slate-200">⚙️</span>
            <h3 className="text-sm md:text-base font-extrabold tracking-[0.15em]">
              DEVELOPMENT
            </h3>
          </div>

          <ul
            className="mt-6 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3"
            aria-label="Development skills"
          >
            {skills.development.map((s) => (
              <li
                key={s}
                className="aspect-square rounded-full
                           border border-white/10
                           bg-white/[0.015]
                           text-[11px] sm:text-xs
                           flex items-center justify-center
                           text-slate-300
                           hover:bg-white/[0.04]
                           transition-colors"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Row 2: TOOLS / KNOWLEDGE / SOFTSKILL (3 columns) ===== */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* TOOLS */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-slate-200">🛠️</span>
              <h3 className="text-sm md:text-base font-extrabold tracking-[0.15em]">
                TOOLS
              </h3>
            </div>

            <ul className="mt-7 space-y-2" aria-label="Tools list">
              {skills.tools.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 text-slate-300">✓</span>
                  <span className="text-sm md:text-base text-slate-300">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* KNOWLEDGE */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-slate-200">💡</span>
              <h3 className="text-sm md:text-base font-extrabold tracking-[0.15em]">
                KNOWLEDGE
              </h3>
            </div>

            <ul className="mt-7 space-y-2" aria-label="Knowledge list">
              {skills.knowledge.map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-0.5 text-slate-300">✓</span>
                  <span className="text-sm md:text-base text-slate-300">{k}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SOFTSKILL */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-slate-200">✨</span>
              <h3 className="text-sm md:text-base font-extrabold tracking-[0.15em]">
                SOFTSKILL
              </h3>
            </div>

            <ul className="mt-7 space-y-2" aria-label="Softskill list">
              {skills.softskill.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-0.5 text-slate-300">✓</span>
                  <span className="text-sm md:text-base text-slate-300">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
