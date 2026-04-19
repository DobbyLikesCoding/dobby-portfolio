import { useEffect, useMemo, useState } from 'react';

type ProjectMedia =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string };
type ProjectMediaInput = ProjectMedia | string;

type Project = {
  title: string;
  description: string;
  tech: string[];
  launched?: string;
  discontinued?: string;
  age?: string;
  images?: string[];
  web?: string;
  code?: string;

  details?: string[];
  tasks?: string[];
  media?: ProjectMediaInput[];
};

function ProjectMeta({ project }: { project: Project }) {
  const metaItems = [
    { key: 'launched', label: 'Launched', value: project.launched, icon: 'launch' as const },
    { key: 'discontinued', label: 'Discontinued', value: project.discontinued, icon: 'stop' as const },
    { key: 'age', label: 'Age', value: project.age, icon: 'time' as const },
  ].filter((item) => !!item.value);

  if (!metaItems.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {metaItems.map((item) => (
        <div
          key={item.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200"
        >
          <MetaIcon type={item.icon} />
          <span className="text-slate-400">{item.label}:</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function MetaIcon({ type }: { type: 'launch' | 'stop' | 'time' }) {
  if (type === 'launch') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </svg>
    );
  }

  if (type === 'stop') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-rose-300" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="8" />
        <path d="M9 9h6v6H9z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-amber-300" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function toMediaItem(item: ProjectMediaInput): ProjectMedia | null {
  if (typeof item === 'string') {
    const src = item.trim();
    if (!src) return null;
    return { type: 'image', src: src.startsWith('/') ? src : `/${src}` };
  }

  const src = item.src.trim();
  if (!src) return null;

  return { ...item, src: src.startsWith('/') || src.startsWith('http') ? src : `/${src}` };
}

function MediaViewer({ media }: { media?: ProjectMediaInput[] }) {
  const [activeVideo, setActiveVideo] = useState(0);

  const items = (media ?? []).map(toMediaItem).filter((m): m is ProjectMedia => !!m);
  const images = items.filter((m) => m.type === 'image');
  const videos = items.filter((m) => m.type === 'video');
  const safeActiveVideo = Math.min(activeVideo, Math.max(videos.length - 1, 0));
  const currentVideo = videos[safeActiveVideo];

  useEffect(() => {
    setActiveVideo((prev) => Math.min(prev, Math.max(videos.length - 1, 0)));
  }, [videos.length]);

  if (!items.length) return null;

  return (
    <div className="space-y-3">
      {!!images.length && (
        <div className="grid grid-cols-1 gap-3">
          {images.map((item, idx) => {
            const isQraftAxeImage =
              item.type === 'image' && item.src.includes('/images/qraft_axe/');
            return (
              <div
                key={`${item.type}-${idx}-${item.src}`}
                className="aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/20"
              >
                <img
                  src={item.src}
                  alt={item.alt ?? ''}
                  className={[
                    'h-full w-full object-contain',
                    isQraftAxeImage
                      ? 'bg-white p-3 [filter:brightness(1.28)_contrast(1.2)_saturate(1.08)]'
                      : '',
                  ].join(' ')}
                />
              </div>
            );
          })}
        </div>
      )}

      {!!videos.length && (
        <div className="space-y-3">
          <div className="text-xs font-semibold tracking-wide text-slate-300">
            Videos ({videos.length})
          </div>
          <div className="aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/20">
            {currentVideo && (
              <video
                src={currentVideo.src}
                controls
                className="h-full w-full object-contain"
              />
            )}
          </div>

          {videos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {videos.map((_, idx) => (
                <button
                  key={`video-${idx}`}
                  onClick={() => setActiveVideo(idx)}
                  className={[
                    'shrink-0 rounded-md border px-3 py-2 text-xs transition',
                    idx === safeActiveVideo
                      ? 'border-teal-400 text-teal-200 bg-teal-400/10'
                      : 'border-white/10 text-slate-300 hover:bg-white/5',
                  ].join(' ')}
                >
                  {`Video ${idx + 1}`}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // ESC 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-6">
      {/* overlay */}
      <button
        aria-label="Close modal overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      {/* panel */}
      <div className="relative mx-auto my-6 w-full max-w-5xl">
        <div className="max-h-[calc(100vh-3rem)] overflow-y-auto rounded-xl bg-[#0f1317]/90 backdrop-blur-md shadow-2xl border border-white/10 animate-modalIn [scrollbar-width:thin] [scrollbar-color:rgba(45,212,191,0.45)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-teal-400/40 hover:[&::-webkit-scrollbar-thumb]:bg-teal-300/55">
          <div className="flex items-start justify-between gap-4 p-6 border-b border-white/10">
            <div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-slate-300 text-sm mt-2">{project.description}</p>
              <div className="mt-3">
                <ProjectMeta project={project} />
              </div>
            </div>

            <button
              onClick={onClose}
              className="shrink-0 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              ✕
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Media */}
            <div className="lg:col-span-3">
              <MediaViewer media={project.media} />
              {!project.media?.length && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-slate-300 text-sm">
                  No media provided. (image/video/youtube)
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-5">
              {/* Details */}
              <div>
                 <div className="text-sm font-semibold mb-2 text-slate-100">Details</div>
                 <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                    {project.details?.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
              </div>
              
              {/* Tasks */}
              <div>
                <div className="text-sm font-semibold mb-2 text-slate-100">Tasks</div>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                    {project.tasks?.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
              </div>

              {/* Tech */}
              <div>
                <div className="text-sm font-semibold mb-2 text-slate-100">Tech</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 bg-slate-800 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                {project.web && (
                  <a
                    href={project.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10 transition"
                  >
                    WEB
                  </a>
                )}
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs border border-sky-400 text-sky-400 rounded hover:bg-sky-400/10 transition"
                  >
                    CODE
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 text-xs text-slate-400">
            Tip: click outside or press <span className="text-slate-200">ESC</span> to close.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const selectedProject = useMemo(
    () => projects.find((p) => p.title === selectedTitle) ?? null,
    [projects, selectedTitle]
  );
  const activeProject = projects[activeIndex] ?? null;
  const projectCount = projects.length;

  useEffect(() => {
    if (!projects.length) return;
    setActiveIndex((prev) => Math.min(prev, projects.length - 1));
  }, [projects.length]);

  function getProjectOffset(offset: number) {
    if (!projectCount) return null;
    const idx = (activeIndex + offset + projectCount) % projectCount;
    return projects[idx];
  }

  function getProjectCover(project: Project | null) {
    if (!project) return null;
    if (project.images?.[0]) return project.images[0];

    const mediaImage = (project.media ?? [])
      .map(toMediaItem)
      .find((m): m is ProjectMedia => !!m && m.type === 'image');
    return mediaImage?.src ?? null;
  }

  const prevProject = getProjectOffset(-1);
  const nextProject = getProjectOffset(1);

  return (
    <section id="portfolio" className="bg-[#101418] py-20 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
        <header>
          <h2 className="text-3xl font-serif mb-3">Projects</h2>
          <div className="w-10 h-[2px] bg-teal-400" />
        </header>

        {!!activeProject && (
          <div className="space-y-8">
            <div className="relative rounded-2xl border border-white/10 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(56,189,248,0.2),rgba(15,19,23,0.92)_58%)] px-3 py-5 md:px-6 md:py-8 overflow-hidden">
              {/* Desktop slider */}
              <div className="hidden md:flex relative h-[340px] items-center justify-center">
                {!!prevProject && (
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + projectCount) % projectCount)}
                    className="absolute left-4 z-10 w-[30%] max-w-[280px] overflow-hidden rounded-xl border border-white/10 opacity-75 hover:opacity-95 transition"
                  >
                    {getProjectCover(prevProject) ? (
                      <img
                        src={getProjectCover(prevProject)!}
                        alt={prevProject.title}
                        className="h-[220px] w-full object-cover"
                      />
                    ) : (
                      <div className="h-[220px] w-full bg-slate-900" />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedTitle(activeProject.title)}
                  className="relative z-20 w-[56%] max-w-[560px] overflow-hidden rounded-xl border border-white/20 shadow-2xl hover:scale-[1.01] transition"
                >
                  {getProjectCover(activeProject) ? (
                    <img
                      src={getProjectCover(activeProject)!}
                      alt={activeProject.title}
                      className="h-[290px] w-full object-cover"
                    />
                  ) : (
                    <div className="h-[290px] w-full bg-slate-900" />
                  )}
                </button>

                {!!nextProject && (
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % projectCount)}
                    className="absolute right-4 z-10 w-[30%] max-w-[280px] overflow-hidden rounded-xl border border-white/10 opacity-75 hover:opacity-95 transition"
                  >
                    {getProjectCover(nextProject) ? (
                      <img
                        src={getProjectCover(nextProject)!}
                        alt={nextProject.title}
                        className="h-[220px] w-full object-cover"
                      />
                    ) : (
                      <div className="h-[220px] w-full bg-slate-900" />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => (prev - 1 + projectCount) % projectCount)}
                  className="absolute left-2 z-30 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-sm hover:bg-black/50 transition"
                  aria-label="Previous project"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % projectCount)}
                  className="absolute right-2 z-30 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-sm hover:bg-black/50 transition"
                  aria-label="Next project"
                >
                  ›
                </button>
              </div>

              {/* Mobile slider */}
              <div className="md:hidden space-y-3">
                <button
                  type="button"
                  onClick={() => setSelectedTitle(activeProject.title)}
                  className="w-full overflow-hidden rounded-xl border border-white/20 shadow-xl"
                >
                  {getProjectCover(activeProject) ? (
                    <img
                      src={getProjectCover(activeProject)!}
                      alt={activeProject.title}
                      className="h-[220px] w-full object-cover"
                    />
                  ) : (
                    <div className="h-[220px] w-full bg-slate-900" />
                  )}
                </button>
                <div className="flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + projectCount) % projectCount)}
                    className="flex-1 rounded-md border border-white/20 bg-white/5 py-2 text-sm"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % projectCount)}
                    className="flex-1 rounded-md border border-white/20 bg-white/5 py-2 text-sm"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {projects.map((p, idx) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={[
                      'h-2.5 w-6.5 rounded-full border transition-all duration-250',
                      idx === activeIndex
                        ? 'w-8 border-teal-200/80 bg-gradient-to-r from-teal-300 to-cyan-300 shadow-[0_0_0_1.5px_rgba(45,212,191,0.14)]'
                        : 'border-slate-500/45 bg-slate-700/45 hover:border-slate-300/60 hover:bg-slate-500/55',
                    ].join(' ')}
                    aria-label={`Go to ${p.title}`}
                  />
                ))}
              </div>

              <div className="mt-4 pt-1 md:pt-2">
                <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-4 min-h-[190px]">
                  <div className="max-w-3xl flex-1 min-w-0 overflow-hidden">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{activeProject.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3 max-h-[68px] overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.5)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-500/40 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/60">
                      {activeProject.description}
                    </p>
                    <div className="mb-3">
                      <ProjectMeta project={activeProject} />
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-[92px] overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.5)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-500/40 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/60">
                      {activeProject.tech.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-1 bg-slate-800 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedTitle(activeProject.title)}
                    className="shrink-0 self-start md:self-auto inline-flex h-8 items-center gap-1.5 rounded-full border border-teal-300/35 bg-teal-400/10 px-3 text-[11px] font-medium text-teal-100 hover:bg-teal-400/20 transition"
                  >
                    <span>View details</span>
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedTitle(null)}
        />
      )}
    </section>
  );
}
