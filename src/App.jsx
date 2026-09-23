/* ============================================================
   src/App.jsx  —  Root component
   Awwwards-grade portfolio app assembly with Lenis smooth scroll
   ============================================================ */

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useLenis from './hooks/useLenis';

import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CommandPalette from './components/CommandPalette/CommandPalette';
import CustomCursor from './components/CustomCursor/CustomCursor';
import BackToTop from './components/BackToTop/BackToTop';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import EasterEgg from './components/EasterEgg/EasterEgg';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import GithubStats from './components/GithubStats/GithubStats';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-slate-950 focus:font-mono focus:font-bold focus:rounded-xl">
        Skip to main content
      </a>

      <CustomCursor />
      <ScrollProgress />
      <EasterEgg />

      <AnimatePresence mode="wait">
        {loading && (
          <Preloader
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#0b0c10] text-white selection:bg-orange-500/30 selection:text-orange-400 overflow-x-clip">
        <Navbar onOpenCmd={() => setCmdOpen(true)} />
        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} onOpen={() => setCmdOpen(true)} />

        <main id="main-content" className="relative">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <GithubStats />
          <Experience />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
