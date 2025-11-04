import { useEffect, useState } from 'react';

type Service = { title: string; body: string };

export default function WhatIDo() {
  const [items, setItems] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <section id="what-i-do" className="relative bg-[#101418] py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20 md:opacity-30"
           style={{ backgroundImage: "url('/images/desk.jpg')" }} />
      <div className="absolute inset-0 bg-[#101418]/80" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
          <span className="h-[2px] w-10 bg-[#1fa8c5]" />
          <span>What I Do</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="border-b border-white/10 pb-5">
              <h3 className="text-sm font-semibold tracking-wide mb-2">{item.title.toUpperCase()}</h3>
              <p className="text-slate-200/90 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}