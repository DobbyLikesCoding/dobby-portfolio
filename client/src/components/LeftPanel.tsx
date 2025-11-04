// src/components/LeftPanel.tsx
import { useEffect, useState } from 'react';
import { getLinks, getProfile } from '../lib/api';

type Profile = {
  name: string;
  title: string;
  summary?: string;
  location?: string;
  github?: string;
  linkedIn?: string;
};

type Links = {
  resumeUrl?: string;
  coverLetterUrl?: string;
  portfolioPdfUrl?: string;
};

const NAV = [
  { href: '#about', label: 'ABOUT' },
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#projects', label: 'PROJECTS' },
];

export function LeftPanel() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Links | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
    getLinks().then(setLinks);
  }, []);

  return (
    <aside className="flex flex-col justify-between h-full px-6 py-10 lg:px-10 lg:py-14 gap-10">
      <div className="space-y-10">
        {/* 이름 / 타이틀 / 한줄 */}
        <div>
          <h1
            className="text-4xl lg:text-[3rem] font-bold tracking-tight text-slate-50"
            style={{ lineHeight: 1.05 }}
          >
            {profile?.name ?? 'Your Name'}
          </h1>
          <p className="mt-2 text-lg text-slate-300">
            {profile?.title ?? 'Software Engineer'}
          </p>
          <p className="mt-4 text-sm text-slate-400 max-w-xs leading-relaxed">
            {profile?.summary ??
              'I build accessible, reliable digital experiences for the web.'}
          </p>
        </div>

        {/* 네비게이션 (줄 + 텍스트) */}
        <nav className="space-y-4">
          {NAV.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-4 group
                text-sm tracking-wide
                ${idx === 0 ? 'text-slate-100' : 'text-slate-500'}
              `}
            >
              <span
                className={`
                  h-px w-10
                  ${idx === 0 ? 'bg-slate-100' : 'bg-[#1f2a3f] group-hover:bg-slate-200'}
                `}
              />
              <span className="group-hover:text-slate-100 transition">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* 하단: 소셜 + 문서 */}
      <div className="flex items-center gap-4 text-slate-500 text-sm">
        {/* 실제에선 아이콘(svg) 쓰면 됨 */}
        {profile?.github && (
          <a href={profile.github} target="_blank" className="hover:text-slate-100">
            GitHub
          </a>
        )}
        {profile?.linkedIn && (
          <a href={profile.linkedIn} target="_blank" className="hover:text-slate-100">
            LinkedIn
          </a>
        )}
        {links?.resumeUrl && (
          <a href={links.resumeUrl} target="_blank" className="hover:text-slate-100">
            Resume
          </a>
        )}
        {links?.portfolioPdfUrl && (
          <a href={links.portfolioPdfUrl} target="_blank" className="hover:text-slate-100">
            Portfolio
          </a>
        )}
      </div>
    </aside>
  );
}
