type ExperienceItemProps = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  skills?: string[];
};

export function ExperienceItem({
  company,
  role,
  period,
  location,
  bullets,
  skills = [],
}: ExperienceItemProps) {
  return (
    <li className="border-l-2 border-teal-400/60 pl-4">
      <p className="text-xs text-slate-400 font-mono">{period}</p>
      <h3 className="text-lg text-slate-100 font-semibold">
        {role} · <span className="text-slate-300">{company}</span>
      </h3>
      {location ? <p className="text-xs text-slate-500 mb-2">{location}</p> : null}
      <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {skills.length ? (
        <ul className="flex flex-wrap gap-2 mt-3">
          {skills.map((s) => (
            <li
              key={s}
              className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-md text-xs text-slate-200"
            >
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
