import { useEffect, useState } from "react";

type ExperienceItem = {
  organization: string;
  role?: string;
  period: string;
  description: string;
  link?: string;
};

function getNodeIcon(org: string) {
  const lower = org.toLowerCase();
  if (lower.includes("university")) return "🎓"; // School
  else if (lower.includes("europe")) return "🥾";
  else return "💼"; // Work
}

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden py-16 md:py-24">
      {/* background image (blurred) */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-102 blur-sm"
        style={{ backgroundImage: "url('/images/mountain.jpg')" }}
      />

      {/* dark overlay (brightness control) */}
      <div className="absolute inset-0 bg-black/25" />

      {/* subtle color tint (optional, premium look) */}
      <div className="absolute inset-0 bg-[#101418]/40" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-serif text-center text-slate-100">
          Experience
        </h2>
        <div className="mx-auto mt-4 h-px w-12 bg-[#1fa8c5]/70" />

        {/* timeline */}
        <div className="relative mt-14">
          {/* timeline arrow (center) */}
          <div className="hidden md:flex absolute left-1/2 top-0 h-full -translate-x-1/2 flex-col items-center">
            <div className="flex-1 w-[2px] bg-gradient-to-b from-[#1fa8c5]/25 via-[#1fa8c5]/60 to-[#1fa8c5]/25"/>
            <div className="mt-4 text-[#1fa8c5] text-2xl leading-none animate-bounce">▼</div>
          </div>

          <div className="space-y-10 md:space-y-12">
            {items.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div key={i} className="relative grid md:grid-cols-[1fr_84px_1fr] items-start">

                  {/* LEFT CARD */}
                  <div className="hidden md:block">
                    {isLeft && (
                      <div className="pr-6 flex justify-end">
                        <Card exp={exp} align="left" />
                      </div>
                    )}
                  </div>

                  {/* CENTER (node + transparent period opposite side) */}
                  <div className="relative hidden md:flex flex-col items-center">
                    {/* node */}
                    <div className="relative mt-3 z-10">
                      <div className="w-12 h-12 rounded-full bg-[#0f1418]/80 ring-1 ring-white/10 flex items-center justify-center text-xl shadow-lg">
                        <span>{getNodeIcon(exp.organization)}</span>
                      </div>
                    </div>

                    {/* period (transparent) */}
                    <div
                      className={[
                        "absolute top-[32px]",
                        "text-[13px] font-bold tracking-wide text-slate-200 whitespace-nowrap",
                        isLeft ? "left-full ml-3" : "right-full mr-3",
                      ].join(" ")}
                    >
                      {exp.period}
                    </div>
                  </div>

                  {/* RIGHT CARD */}
                  <div className="hidden md:block">
                    {!isLeft && (
                      <div className="pl-6 flex justify-start">
                        <Card exp={exp} align="left" />
                      </div>
                    )}
                  </div>

                  {/* MOBILE: single column */}
                  <div className="md:hidden">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1fa8c5]" />
                      <span className="text-xs text-slate-300">{exp.period}</span>
                    </div>
                    <Card exp={exp} align="left" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ exp, align }: { exp: ExperienceItem; align: "left" | "right" }) {
  return (
    <div
      className={[
        "w-full max-w-[440px]",
        "bg-[#0f1418]/65 border border-white/10",
        "rounded-md px-6 py-5",
        "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        "backdrop-blur-[2px]",
        align === "right" ? "text-right" : "text-left",
      ].join(" ")}
    >
      <h3 className="text-[12px] font-semibold tracking-[0.18em] text-slate-100 uppercase">
        {exp.organization}
      </h3>

      <p className="text-sm text-[#1fa8c5] mt-2">{exp.role}</p>

      <p className="text-sm text-slate-200/90 leading-relaxed mt-3 whitespace-pre-line">
        {exp.description}
      </p>

      {exp.link && (
        <a
          href={exp.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 text-xs text-sky-400 hover:underline"
        >
          Visit
        </a>
      )}

    </div>
  );
}
