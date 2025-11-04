import { useEffect, useState } from 'react';

type AboutData = {
  headline: string;
  body: string[];
};

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then(setAbout)
      .catch(console.error);
  }, []);

  if (!about) return null;

  return (
    <section id="about" className="bg-[#111314] py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center md:text-left fade-in">
        {/* 헤드라인 */}
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
          {about.headline}
        </h1>

        {/* 서브헤드 */}
        <h3 className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 max-w-3xl mx-auto md:mx-0">
          {about.body[0]}
        </h3>

        {/* ✅ 라인(divider) */}
        <div className="w-20 h-[2px] bg-[#14b8a6] mx-auto md:mx-0 mb-10"></div>

        {/* 본문 */}
        <div className="md:flex md:items-start md:gap-10">
          {/* 이미지 */}
          <div className="flex justify-center md:justify-start mb-10 md:mb-0">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-[#111314] outline outline-2 outline-[#14b8a6]">
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 텍스트 본문 */}
          <div className="flex-1 text-slate-200 space-y-5 text-sm md:text-base leading-relaxed">
            {about.body.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}