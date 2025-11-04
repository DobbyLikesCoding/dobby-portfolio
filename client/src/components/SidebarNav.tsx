// src/components/SidebarNav.tsx
const links = [
  { href: '#about', label: '01. About' },
  { href: '#experience', label: '02. Experience' },
  { href: '#projects', label: '03. Projects' },
  { href: '#contact', label: '04. Contact' },
];

export function SidebarNav() {
  return (
    <aside
      className="
        hidden
        lg:flex
        fixed
        left-10
        top-1/2
        -translate-y-1/2
        flex-col
        gap-3
        z-50       /* 본문보다 위에 */
        pointer-events-auto
      "
    >
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="text-slate-400 hover:text-teal-300 font-mono text-xs tracking-tight transition"
        >
          {l.label}
        </a>
      ))}
      <div className="w-px h-16 bg-slate-700 mt-3 mx-auto" />
    </aside>
  );
}
