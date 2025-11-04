import { useEffect, useState } from 'react';

type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  description: string;
  link?: string;
};

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    fetch('/api/experience')
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <section id="experience" className="relative py-14 md:py-20">
      <div className="absolute inset-0 bg-cover bg-center"
           style={{ backgroundImage: "url('/images/mountain.jpg')" }} />
      <div className="absolute inset-0 bg-[#101418]/85" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-serif mb-6">Experience</h2>

        <div className="space-y-8">
          {items.map((exp, i) => (
            <div key={i} className="bg-[#101418]/40 border border-white/5 rounded-md p-5">
              <h3 className="text-lg font-semibold text-slate-100">{exp.organization}</h3>
              <p className="text-sm text-[#1fa8c5] mb-2">
                {exp.role} ({exp.period})
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">{exp.description}</p>
              {exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  className="inline-block mt-2 text-xs text-sky-400 hover:underline"
                >
                  Visit
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}