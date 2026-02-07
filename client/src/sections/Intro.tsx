// src/sections/Intro.tsx
import { useEffect, useState } from 'react';

type IntroData = {
  name: string;
  title: string;
  lead: string;
  cta: string;
};

export default function Intro() {
  const [intro, setIntro] = useState<IntroData | null>(null);

  useEffect(() => {
    // .NET Program.cs 에서 정의한 /api/intro 호출
    fetch('/api/intro')
      .then((res) => res.json())
      .then((data: IntroData) => setIntro(data))
      .catch((err) => {
        console.error('failed to load /api/intro', err);
      });
  }, []);

  return (
    <section
      id="intro"
      className="
        relative
        min-h-[520px]
        md:min-h-screen
        w-full
        flex
        items-center
        justify-center
        text-center
        overflow-hidden
      "
    >
      {/* 배경 */}
      <div
        className="
          absolute
          inset-0
          bg-center
          bg-no-repeat
          bg-cover
          intro-bg
        "
        style={{ backgroundImage: "url('/images/intro-bg.jpg')" }}
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-[#101418]" />

      {/* 내용 */}
      <div className="relative z-10 px-4 md:px-6">
        <h1
          className="font-serif font-semibold text-white leading-tight"
          style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6rem)' }}
        >
          {intro ? intro.name : '...'}
        </h1>

        <p className="mt-4 uppercase tracking-[0.3em] text-base md:text-lg text-slate-100/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          {intro ? intro.title : ''}
        </p>

        {/* lead 문장은 원하면 보여주기 */}
        {intro?.lead ? (
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
            {intro.lead}
          </p>
        ) : null}
      </div>

      {/* scroll down 버튼 */}
      {/* <button
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-white/70 flex items-center justify-center"
      >
        <div className="w-3 h-3 border-b-2 border-r-2 border-white rotate-45 translate-y-1" />
      </button> */}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <button
          onClick={() =>
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="
            group
            relative
            flex
            flex-col
            items-center
            justify-center
            text-white
            bg-transparent          /* ✅ 배경 완전 투명 */
            border-0
            outline-none
            transition-all duration-300
          "
        >
          {/* 기본 원형 아이콘 */}
          <div
            className="
              w-12 h-12 rounded-full border border-white/80
              flex items-center justify-center
              bg-transparent        /* ✅ 내부도 완전 투명 */
              transition-all duration-300 ease-out
              group-hover:opacity-0
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"            /* ✅ 내부 채움 없음 */
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* hover 시 겹쳐서 표시되는 텍스트 + 화살표 */}
          <div
            className="
              absolute inset-0 flex flex-col items-center justify-center
              opacity-0
              transition-all duration-300 ease-out
              group-hover:opacity-100
              bg-transparent        /* ✅ 완전 투명 */
            "
          >
            <span className="text-[10px] font-medium tracking-widest uppercase text-white mb-0.5">
              Learn More
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white animate-bounce-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}
