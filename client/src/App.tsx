import Intro from './sections/Intro';
import About from './sections/About';
import WhatIDo from './sections/WhatIDo';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import PageDots from './components/PageDots';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#101418] text-slate-100 min-h-dvh relative">
      {/* 오른쪽 고정 도트 */}
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

      {/* 섹션들 */}
      <Intro />
      <About />
      <WhatIDo />
      <Skills />
      <Experience />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;