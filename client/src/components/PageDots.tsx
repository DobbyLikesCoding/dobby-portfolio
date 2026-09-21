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
      const activationLine = window.innerHeight / 2;
      const renderedSections = sections.flatMap((section) => {
        const element = document.getElementById(section.id);
        return element ? [{ id: section.id, rect: element.getBoundingClientRect() }] : [];
      });
      const containingSection = renderedSections.find(
        ({ rect }) => rect.top <= activationLine && rect.bottom > activationLine,
      );
      const nearestSection = renderedSections.reduce<(typeof renderedSections)[number] | undefined>(
        (closest, section) => {
          if (!closest) return section;
          return Math.abs(section.rect.top - activationLine) < Math.abs(closest.rect.top - activationLine)
            ? section
            : closest;
        },
        undefined,
      );

      setActive(containingSection?.id ?? nearestSection?.id ?? sections[0]?.id ?? '');
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
        hidden md:flex flex-col gap-4 fixed right-5 top-1/2 -translate-y-1/2 z-50
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
                  ? 'bg-[#86e8f9] border-transparent shadow-[0_0_16px_rgba(134,232,249,0.45)]'
                  : 'bg-white/10 border-white/12 hover:bg-white/18'}
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
                bg-[rgba(8,16,25,0.92)]
                px-2.5
                py-1
                text-xs
                text-slate-100
                shadow-[0_10px_24px_rgba(0,0,0,0.24)]
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
