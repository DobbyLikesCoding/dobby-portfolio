import { useEffect, useMemo, useState } from 'react';

type ProjectMedia =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string };
type ProjectMediaInput = ProjectMedia | string;

type Project = {
  title: string;
  description: string;
  tech: string[];
  images?: string[];
  web?: string;
  code?: string;

  details?: string[];
  tasks?: string[];
  media?: ProjectMediaInput[];
};

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
              {item.type === 'image' && (
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
              )}

              {item.type === 'video' && (
                <video
                  src={item.src}
                  controls
                  className="h-full w-full object-contain"
                />
              )}
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

  return (
    <section id="portfolio" className="bg-[#101418] py-20 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-20">
        <header>
          <h2 className="text-3xl font-serif mb-3">Some of My Work</h2>
          <div className="w-10 h-[2px] bg-teal-400" />
        </header>

        {projects.map((p) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setSelectedTitle(p.title)}
            className="w-full text-left group bg-transparent focus:outline-none focus:ring-0 active:outline-none">
            <article className="rounded-lg p-8 md:p-10 bg-transparent border-2 border-white/25 shadow-none transition hover:border-white/40">
              {/* Preview Images (desktop only) */}
              {p.images && (
                <div className="relative mb-12 h-[420px] hidden md:block">
                  {p.images[0] && (
                    <img
                      src={p.images[0]}
                      alt=""
                      className="absolute left-0 top-8 w-[65%] rounded-md shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"/>
                  )}
                  {p.images[1] && (
                    <img
                      src={p.images[1]}
                      alt=""
                      className="absolute left-0 top-8 w-[65%] rounded-md shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"/>
                  )}
                  {p.images[2] && (
                    <img
                      src={p.images[2]}
                      alt=""
                      className="absolute left-0 top-8 w-[65%] rounded-md shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"/>
                  )}
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div className="max-w-xl">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition">
                    {p.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-1 bg-slate-800 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* mini hint */}
                <div className="text-xs text-slate-400 shrink-0">
                  Click to view details →
                </div>
              </div>
            </article>
          </button>
        ))}
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
