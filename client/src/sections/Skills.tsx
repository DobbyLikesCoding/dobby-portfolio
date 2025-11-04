import { useEffect, useState } from 'react';

type SkillsData = {
  development: string[];
  design: string[];
  tools: string[];
  knowledge: string[];
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
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
        <h2 className="text-3xl font-serif">Skills</h2>
        <div className="grid lg:grid-cols-4 gap-10">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="flex items-center gap-3 text-sm uppercase tracking-wide mb-5">
                <span className="h-[2px] w-10 bg-[#1fa8c5]" />
                {category}
              </h3>
              <ul className="space-y-2 text-sm text-slate-200/90">
                {items.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-[#1fa8c5]">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}