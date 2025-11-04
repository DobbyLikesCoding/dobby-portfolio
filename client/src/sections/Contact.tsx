// src/sections/Contact.tsx
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-16 md:py-20 text-slate-100 overflow-hidden"
    >
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/snow.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#101418]/85" />

      <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6">
        <h2 className="text-3xl font-serif">Get In Touch</h2>
        <p className="text-slate-200 max-w-2xl mx-auto">
          Have a sweet project in mind or just want to say hi? Feel free to send me a message!
        </p>
        <form className="grid gap-4 text-left">
          <input
            type="text"
            placeholder="Name"
            className="bg-transparent border border-slate-500/70 px-4 py-3 rounded outline-none focus:border-[#1fa8c5]"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent border border-slate-500/70 px-4 py-3 rounded outline-none focus:border-[#1fa8c5]"
          />
          <input
            type="text"
            placeholder="Subject"
            className="bg-transparent border border-slate-500/70 px-4 py-3 rounded outline-none focus:border-[#1fa8c5]"
          />
          <textarea
            rows={4}
            placeholder="Message"
            className="bg-transparent border border-slate-500/70 px-4 py-3 rounded outline-none focus:border-[#1fa8c5]"
          />
          <button
            type="submit"
            className="justify-self-start px-6 py-3 bg-[#0f90af] rounded hover:bg-[#0c7d97] transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* 아래 그라데이션 푸터 */}
      <div className="mt-10 bg-gradient-to-r from-[#00acc1] via-[#3175ff] to-[#7b2fff] py-6 text-center text-sm">
        <p className="text-slate-50">© {new Date().getFullYear()} SungHyun Chang</p>
      </div>
    </section>
  );
}