import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import SpaceSectionBackdrop from '../components/SpaceSectionBackdrop';

type ContactData = {
  headline: string;
  text: string;
  email: string;
  socials: { label: string; url: string }[];
};

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const FALLBACK_CONTACT: ContactData = {
  headline: 'Let’s build systems that make complex work simpler.',
  text: "I'm always interested in meaningful engineering problems—especially where systems, automation, and real-world operations come together.",
  email: 'samashe.chang@gmail.com',
  socials: [
    { label: 'Email', url: 'mailto:samashe.chang@gmail.com' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/samashe/' },
    { label: 'GitHub', url: 'https://github.com/DobbyLikesCoding' },
  ],
};

export default function Contact() {
  const [contact, setContact] = useState<ContactData>(FALLBACK_CONTACT);
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then(setContact)
      .catch(console.error);
  }, []);

  function updateField<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError('');
    if (status) setStatus('');
  }

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
      setError('Please fill in all fields before sending your message.');
      setStatus('');
      return;
    }

    if (!isValidEmail(trimmed.email)) {
      setError('Please enter a valid email address.');
      setStatus('');
      return;
    }

    const recipient = contact.email;
    const subject = encodeURIComponent(`[Portfolio] ${trimmed.subject}`);
    const body = encodeURIComponent(
      `Hi Sunghyun,\n\n${trimmed.message}\n\nName: ${trimmed.name}\nEmail: ${trimmed.email}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setError('');
    setStatus('Your email app should open with a drafted message ready to send.');
  }

  return (
    <section
      id="contact"
      className="section-shell px-4 text-slate-100 md:px-8"
    >
      <SpaceSectionBackdrop variant="medium" />

      <div className="relative mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-[0.84fr_1.16fr]">
        <Reveal>
          <div className="glass-panel flex h-full flex-col rounded-[34px] p-6 md:p-8">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title text-balance mt-4 text-4xl font-semibold text-white md:text-5xl">
              {contact.headline}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-slate-200/78 md:text-base">
              {contact.text}
            </p>

            <div className="mt-8 border-t border-white/10 pt-5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9f8ff]">Email</div>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 inline-block text-lg text-white transition hover:text-[#c9f8ff]"
                >
                  {contact.email}
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/samashe/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/DobbyLikesCoding"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#86e8f9] shadow-[0_0_10px_rgba(134,232,249,0.45)]" />
              <span>Open to engineering conversations</span>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <form
            onSubmit={handleSubmit}
            className="glass-panel grid h-full gap-3.5 rounded-[34px] p-4 text-left md:gap-4 md:p-8"
          >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="rounded-2xl border border-white/10 bg-[rgba(6,17,28,0.76)] px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 transition duration-200 focus:border-[#8feaf8]/60 focus:shadow-[0_0_0_3px_rgba(134,232,249,0.08)]"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="rounded-2xl border border-white/10 bg-[rgba(6,17,28,0.76)] px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 transition duration-200 focus:border-[#8feaf8]/60 focus:shadow-[0_0_0_3px_rgba(134,232,249,0.08)]"
          />
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(event) => updateField('subject', event.target.value)}
            className="rounded-2xl border border-white/10 bg-[rgba(6,17,28,0.76)] px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 transition duration-200 focus:border-[#8feaf8]/60 focus:shadow-[0_0_0_3px_rgba(134,232,249,0.08)]"
          />
          <textarea
            rows={4}
            placeholder="Message"
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className="min-h-[108px] rounded-2xl border border-white/10 bg-[rgba(6,17,28,0.76)] px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 transition duration-200 focus:border-[#8feaf8]/60 focus:shadow-[0_0_0_3px_rgba(134,232,249,0.08)]"
          />
          {error && (
            <p className="text-sm text-rose-200">{error}</p>
          )}
          {status && (
            <p className="text-sm text-[#dffbff]">{status}</p>
          )}
          <button
            type="submit"
            className="justify-self-start rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.12em] text-slate-950 transition duration-200 hover:bg-[#dff8ff]"
          >
            Send Message
          </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
