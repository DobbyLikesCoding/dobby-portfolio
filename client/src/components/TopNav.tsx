import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const links = [
  { href: '#intro', label: 'Intro' },
  { href: '#about', label: 'About' },
  { href: '#what-i-do', label: 'Focus' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Journey' },
  { href: '#portfolio', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export default function TopNav() {
  const [active, setActive] = useState('intro');
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Use rendered positions instead of offsetTop so nested/animated layout does not
      // select the next section before it is actually at the center of the viewport.
      const activationLine = window.innerHeight / 2;
      const renderedSections = links.flatMap((link) => {
        const id = link.href.replace('#', '');
        const element = document.getElementById(id);
        return element ? [{ id, rect: element.getBoundingClientRect() }] : [];
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
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      setActive(containingSection?.id ?? nearestSection?.id ?? 'intro');
      setProgress(scrollHeight > 0 ? Math.min(window.scrollY / scrollHeight, 1) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function navigate(href: string) {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div className="mx-auto overflow-hidden rounded-[999px] border border-white/12 bg-[rgba(9,15,22,0.62)] shadow-[0_18px_40px_rgba(6,10,16,0.22)] backdrop-blur-xl">
        <motion.div
          className="h-[2px] origin-left bg-[linear-gradient(90deg,#86e8f9,#7c8fff,#ffb07a)]"
          animate={{ scaleX: progress }}
          transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.45 }}
        />
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={() => navigate('#intro')}
          className="group flex items-center gap-3 bg-transparent p-0 text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7ce0f2]/30 bg-[#7ce0f2]/12 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dffaff] transition group-hover:scale-110 group-hover:rotate-6">
            SC
          </span>
          <div className="hidden sm:block">
            {/* <div className="text-[11px] uppercase tracking-[0.28em] text-slate-300/80">
              Portfolio 2026
            </div> */}
            <div className="text-sm font-medium text-white">Sunghyun Chang</div>
          </div>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = id === active;
            return (
              <button
                key={link.href}
                type="button"
                onClick={() => navigate(link.href)}
                className={[
                  'relative rounded-full px-3 py-2 text-[12px] tracking-[0.12em] transition hover:-translate-y-0.5',
                  isActive
                    ? 'bg-white text-slate-900 shadow-[0_8px_22px_rgba(255,255,255,0.14)]'
                    : 'bg-transparent text-slate-300 hover:bg-white/10 hover:text-white',
                ].join(' ')}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-glow"
                    className="absolute inset-0 -z-10 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white md:hidden"
        >
          Menu
        </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-6xl rounded-[28px] border border-white/12 bg-[rgba(8,14,20,0.9)] p-3 shadow-[0_18px_40px_rgba(5,10,15,0.28)] backdrop-blur-xl md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {links.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = id === active;
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => navigate(link.href)}
                  className={[
                    'rounded-2xl px-3 py-3 text-left text-[12px] tracking-[0.12em] transition',
                    isActive
                      ? 'bg-white text-slate-900'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10',
                  ].join(' ')}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
