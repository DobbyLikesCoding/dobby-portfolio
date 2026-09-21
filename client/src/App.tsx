import Intro from './sections/Intro';
import About from './sections/About';
import WhatIDo from './sections/WhatIDo';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Portfolio from './sections/Projects';
import Contact from './sections/Contact';
import PageDots from './components/PageDots';
import Footer from './components/Footer';
import TopNav from './components/TopNav';
import SharedSectionsBackground from './components/SharedSectionsBackground';

function App() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#060b13] text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#040814_0%,#08111b_34%,#090f18_66%,#050912_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(93,176,255,0.14),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(255,165,123,0.09),transparent_20%),radial-gradient(circle_at_56%_74%,rgba(88,214,194,0.1),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.5),transparent)]" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-[#34c7e8]/12 blur-3xl animate-float-slow" />
        <div className="absolute right-[-5rem] top-[28rem] h-80 w-80 rounded-full bg-[#ffb07a]/08 blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#8198ff]/10 blur-3xl animate-float-slow" />
      </div>
      <SharedSectionsBackground />

      <TopNav />
      <PageDots
        sections={[
          { id: 'intro', label: 'Intro' },
          { id: 'about', label: 'About' },
          { id: 'what-i-do', label: 'What I Do' },
          { id: 'skills', label: 'Skills' },
          { id: 'experience', label: 'Experience' },
          { id: 'portfolio', label: 'Portfolio' },
          { id: 'contact', label: 'Contact' },
        ]}
      />

      <main className="relative z-10">
        <Intro />
        <div className="relative z-10">
          <About />
          <WhatIDo />
          <Skills />
          <Experience />
          <Portfolio />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
