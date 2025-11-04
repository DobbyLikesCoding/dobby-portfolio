export type Project = {
  id: number;
  name: string;
  period?: string;
  description: string;
  role?: string;
  tech: string[];
  highlights?: string[];
  repo?: string;
  link?: string;
};

export default function ProjectCard(p: Project) {
  return (
    <article className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6 hover:-translate-y-1 hover:border-teal-300 transition">
      <p className="text-teal-300 font-mono text-xs mb-2">Featured Project</p>
      <h3 className="text-xl font-semibold text-slate-100">{p.name}</h3>
      {p.period ? <p className="text-slate-400 text-xs mb-2">{p.period}</p> : null}
      <p className="text-slate-300 mt-3">{p.description}</p>
      {p.role ? <p className="text-slate-400 text-sm mt-3">Role: {p.role}</p> : null}
      {p.highlights?.length ? (
        <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}
      <ul className="flex gap-2 text-xs text-slate-300 mt-4 flex-wrap">
        {p.tech.map((t) => (
          <li key={t} className="px-2 py-1 bg-slate-900/40 rounded">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4 text-sm">
        {p.repo ? (
          <a className="text-slate-200 hover:text-teal-300 underline" href={p.repo} target="_blank">
            Repo
          </a>
        ) : null}
        {p.link ? (
          <a className="text-slate-200 hover:text-teal-300 underline" href={p.link} target="_blank">
            Live
          </a>
        ) : null}
      </div>
    </article>
  );
}
