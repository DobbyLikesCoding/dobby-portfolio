import { useEffect, useState } from "react";

type ExperienceItem = {
  organization: string;
  role?: string;
  period: string;
  description: string;
  link?: string;
  highlightText?: string;
  details?: string[];
  media?: string[];
  storyBlocks?: StoryBlock[];
};

type StoryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "imageRow"; images: { src: string; alt?: string }[] }
  | { type: "quote"; text: string; by?: string }
  | { type: "divider" };

function canOpenExperienceModal(item: ExperienceItem) {
  return !!(item.storyBlocks?.length || item.media?.length || item.details?.length);
}

function getNodeIcon(org: string) {
  const lower = org.toLowerCase();
  if (lower.includes("university")) return "🎓"; // School
  else if (lower.includes("europe")) return "🥾";
  else return "💼"; // Work
}

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem]);

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
              const canOpen = canOpenExperienceModal(exp);

              return (
                <div key={i} className="relative grid md:grid-cols-[1fr_84px_1fr] items-start">

                  {/* LEFT CARD */}
                  <div className="hidden md:block">
                    {isLeft && (
                      <div className="pr-6 flex justify-end">
                        <Card
                          exp={exp}
                          align="left"
                          onOpen={
                            canOpen
                              ? () => {
                                  setSelectedItem(exp);
                                }
                              : undefined
                          }
                        />
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
                        <Card
                          exp={exp}
                          align="left"
                          onOpen={
                            canOpen
                              ? () => {
                                  setSelectedItem(exp);
                                }
                              : undefined
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* MOBILE: single column */}
                  <div className="md:hidden">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1fa8c5]" />
                      <span className="text-xs text-slate-300">{exp.period}</span>
                    </div>
                    <Card
                      exp={exp}
                      align="left"
                      onOpen={
                        canOpen
                          ? () => {
                              setSelectedItem(exp);
                            }
                          : undefined
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedItem && (
        <ExperienceModal
          item={selectedItem}
          onClose={() => {
            setSelectedItem(null);
          }}
        />
      )}
    </section>
  );
}

function Card({
  exp,
  align,
  onOpen,
}: {
  exp: ExperienceItem;
  align: "left" | "right";
  onOpen?: () => void;
}) {
  return (
    <div
      className={[
        "w-full max-w-[440px]",
        "bg-[#0f1418]/65 border border-white/10",
        "rounded-md px-6 py-5",
        "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        "backdrop-blur-[2px]",
        align === "right" ? "text-right" : "text-left",
        onOpen ? "cursor-pointer hover:border-teal-300/45 transition-colors" : "",
      ].join(" ")}
      onClick={onOpen}
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
          onClick={(e) => e.stopPropagation()}
          className="inline-block mt-4 text-xs text-sky-400 hover:underline"
        >
          Visit
        </a>
      )}

      {onOpen && (
        <p className="mt-4 text-xs text-amber-300/95">Read more of my story →</p>
      )}

    </div>
  );
}

function ExperienceModal({
  item,
  onClose,
}: {
  item: ExperienceItem;
  onClose: () => void;
}) {
  const media = item.media ?? [];
  const details = item.details ?? [];
  const storyBlocks = item.storyBlocks ?? [];

  const hasStoryBlocks = storyBlocks.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-6">
      <button
        aria-label="Close modal overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <div className="relative mx-auto my-6 w-full max-w-4xl">
        <div className="max-h-[calc(100vh-3rem)] overflow-y-auto rounded-xl bg-[#0f1317]/90 backdrop-blur-md shadow-2xl border border-white/10 animate-modalIn [scrollbar-width:thin] [scrollbar-color:rgba(45,212,191,0.45)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-teal-400/40 hover:[&::-webkit-scrollbar-thumb]:bg-teal-300/55">
          <div className="flex items-start justify-between gap-4 p-6 border-b border-white/10">
            <div>
              <h3 className="text-xl font-semibold text-slate-100">{item.organization}</h3>
              {item.role && <p className="text-sm text-[#1fa8c5] mt-2">{item.role}</p>}
              <p className="text-slate-300 text-sm mt-2">{item.period}</p>
              {item.highlightText && (
                <p className="text-amber-300/95 text-sm md:text-base mt-3">{item.highlightText}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="shrink-0 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              ✕
            </button>
          </div>

          <div className="p-5 md:p-6 space-y-4">
            {hasStoryBlocks ? (
              <div className="space-y-4 md:space-y-5">
                {storyBlocks.map((block, idx) => {
                  if (block.type === "heading") {
                    return (
                      <h4 key={`${block.type}-${idx}`} className="text-xl md:text-2xl font-semibold text-slate-100">
                        {block.text}
                      </h4>
                    );
                  }

                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={`${block.type}-${idx}`}
                        className="text-xs md:text-sm leading-relaxed text-slate-200/95 whitespace-pre-line"
                      >
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "image") {
                    return (
                      <div
                        key={`${block.type}-${idx}-${block.src}`}
                        className="rounded-lg overflow-hidden border border-white/10 bg-black/20 p-2"
                      >
                        <div className="h-[260px] md:h-[360px] lg:h-[420px] flex items-center justify-center">
                          <img
                            src={block.src}
                            alt={block.alt ?? item.organization}
                            className="max-h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    );
                  }

                  if (block.type === "imageRow") {
                    return (
                      <div
                        key={`${block.type}-${idx}`}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {block.images.map((img) => (
                          <div
                            key={`${img.src}-${idx}`}
                            className="rounded-lg overflow-hidden border border-white/10 bg-black/20 p-2"
                          >
                            <div className="h-[220px] md:h-[280px] lg:h-[320px] flex items-center justify-center">
                              <img
                                src={img.src}
                                alt={img.alt ?? item.organization}
                                className="max-h-full w-full object-contain"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <figure
                        key={`${block.type}-${idx}`}
                        className="rounded-lg border border-teal-300/30 bg-teal-300/5 px-5 py-4"
                      >
                        <blockquote className="text-xs md:text-sm italic text-slate-100/95 whitespace-pre-line">
                          {block.text}
                        </blockquote>
                        {block.by && (
                          <figcaption className="mt-2 text-[11px] md:text-xs text-teal-200/90">
                            - {block.by}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  return (
                    <div
                      key={`${block.type}-${idx}`}
                      className="h-px w-full bg-white/15"
                    />
                  );
                })}
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-200/90 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>

                {!!details.length && (
                  <div>
                    <div className="text-sm font-semibold mb-2 text-slate-100">Story</div>
                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                      {details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!!media.length && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {media.map((src) => (
                      <div
                        key={src}
                        className="rounded-lg overflow-hidden border border-white/10 bg-black/20 p-2"
                      >
                        <div className="h-[220px] md:h-[280px] lg:h-[320px] flex items-center justify-center">
                          <img
                            src={src}
                            alt="Experience media"
                            className="max-h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
