// src/components/TopNav.tsx
const links = [
  { href: '#intro', label: 'Intro' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'What I Do' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

export function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0f172f]/90 backdrop-blur border-b border-[#16233b]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-semibold tracking-tight">Brittany Chiang</span>
        <nav className="hidden md:flex gap-5 text-sm text-slate-300">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#64ffda] transition">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}