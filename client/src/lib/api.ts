// src/lib/api.ts
const API_BASE = '';

export async function getIntro() {
  const res = await fetch(`${API_BASE}/api/intro`);
  return res.json();
}

export async function getAbout() {
  const res = await fetch(`${API_BASE}/api/about`);
  return res.json();
}

export async function getServices() {
  const res = await fetch(`${API_BASE}/api/services`);
  return res.json();
}

export async function getSkills() {
  const res = await fetch(`${API_BASE}/api/skills`);
  return res.json();
}

export async function getExperience() {
  const res = await fetch(`${API_BASE}/api/experience`);
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${API_BASE}/api/projects`);
  return res.json();
}

export async function getContact() {
  const res = await fetch(`${API_BASE}/api/contact`);
  return res.json();
}

/**
 * 아래 둘은 왼쪽 패널(프로필/문서 링크)에서 쓰던 거라서
 * v2 스타일에서도 import 에러 안 나게 그냥 똑같이 내보내 줄게요.
 * 백엔드에 없으면 프런트에서 에러 안 나게 빈 객체 리턴하게 해뒀어요.
 */
export async function getProfile() {
  try {
    const res = await fetch(`${API_BASE}/api/profile`);
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return {
      name: 'Your Name',
      title: 'Front End Software Engineer',
      location: '',
    };
  }
}

export async function getLinks() {
  try {
    const res = await fetch(`${API_BASE}/api/links`);
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return {
      resumeUrl: '',
      coverLetterUrl: '',
      portfolioPdfUrl: '',
    };
  }
}
