// src/sections/Intro.tsx
import { useEffect, useState } from 'react';
import { getIntro } from '../lib/api';

type IntroData = {
  name: string;
  title: string;
  lead: string;
  cta: string;
};

export default function Intro() {
  const [data, setData] = useState<IntroData | null>(null);

  useEffect(() => {
    getIntro().then(setData);
  }, []);

  return (
    <section id="intro" className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <p className="text-sm text-[#64ffda] mb-2">Front End Software Engineer</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{data?.name}</h1>
      <p className="text-slate-300 mt-4 max-w-2xl">{data?.lead}</p>
      <a
        href="#about"
        className="inline-block mt-6 px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition"
      >
        {data?.cta ?? 'Learn More'}
      </a>
    </section>
  );
}
