import { useEffect, useState } from 'react';

type Project = {
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  code?: string;
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  return (
    <section id="portfolio" className="bg-[#101418] py-16 md:py-20 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-8">
        <h2 className="text-3xl font-serif">Some of My Work</h2>
        {projects.map((p) => (
          <article key={p.title} className="bg-[#161a1e] rounded-md overflow-hidden border border-white/5">
            <div className="h-72 bg-[#0f172a] flex items-center justify-center">
              <span className="text-slate-500">{p.title}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{p.description}</p>
              <div className="flex gap-2 flex-wrap mb-3">
                {p.tech.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 bg-slate-800 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-xs">
                {p.demo && (
                  <a href={p.demo} className="text-teal-400 hover:underline" target="_blank">
                    Demo
                  </a>
                )}
                {p.code && (
                  <a href={p.code} className="text-sky-400 hover:underline" target="_blank">
                    Code
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}