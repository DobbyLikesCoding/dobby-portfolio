export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.08),rgba(5,10,18,0.34))]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-200">Sunghyun Chang</p>
          <p className="mt-2 text-sm text-slate-400">Systems thinking. Practical automation. Real-world impact.</p>
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">© 2026</p>
      </div>
    </footer>
  );
}
