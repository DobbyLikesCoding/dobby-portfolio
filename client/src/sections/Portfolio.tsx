// src/sections/Portfolio.tsx
const PROJECTS = [
  {
    title: 'CrowdDJ',
    desc: 'A realtime Spotify request queue for parties.',
    tags: ['React.js', 'Sass', 'Firebase', 'Spotify API'],
  },
  {
    title: 'Screentime 2.0',
    desc: 'Customer-facing update for Starry Station to manage content.',
    tags: ['JavaScript', 'CSS', 'Backbone'],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-[#101418] py-16 md:py-20 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-8">
        <h2 className="text-3xl font-serif">Some of My Work</h2>
        {PROJECTS.map((p) => (
          <article key={p.title} className="bg-[#161a1e] rounded-md overflow-hidden border border-white/5">
            {/* 이미지 자리 */}
            <div className="h-72 bg-[#0f172a] flex items-center justify-center">
              <span className="text-slate-500">[Screenshot here]</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 bg-slate-800 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}

        <div className="text-center pt-4">
          <button className="px-5 py-2 bg-[#12a3c7] text-slate-100 rounded hover:bg-[#0f90af] transition">
            See more projects
          </button>
        </div>
      </div>
    </section>
  );
}