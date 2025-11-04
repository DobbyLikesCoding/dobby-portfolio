// src/components/PageDots.tsx
import { useEffect, useState } from 'react';

export default function PageDots({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let current = sections[0]?.id ?? '';
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        if (mid >= el.offsetTop) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  // intro는 숨기지만, 배열엔 남겨둔다.
  const visibleSections = sections;

  const dotSize = 'w-3.5 h-3.5'; // 도트 크기 조절용

  return (
    <div
      className={`
        hidden md:flex flex-col gap-4 fixed right-4 top-1/2 -translate-y-1/2 z-50
        transition-opacity duration-300
        ${active === 'intro' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {visibleSections.map((s) => {
        const isActive = active === s.id;
        return (
          <div key={s.id} className="relative group">
            <button
              onClick={() =>
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className={`
                ${dotSize}
                p-0
                rounded-full
                border
                transition
                duration-150
                ${isActive
                  ? 'bg-teal-400 border-transparent shadow-[0_0_12px_rgba(45,212,191,0.4)]'
                  : 'bg-white/10 border-white/10 hover:bg-white/30'}
              `}
            >
              <span className="sr-only">{s.label}</span>
            </button>

            {/* hover하면 name 보이기 */}
            <span
              className={`
                pointer-events-none
                absolute
                right-[140%]
                top-1/2
                -translate-y-1/2
                whitespace-nowrap
                rounded-md
                bg-slate-900/90
                px-2.5
                py-1
                text-xs
                text-slate-100
                shadow-lg
                opacity-0
                scale-95
                group-hover:opacity-100
                group-hover:scale-100
                transition
              `}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}