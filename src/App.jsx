/* ============================================================
   App.jsx  —  Root component
   Renders the Preloader first (hides once the real page load
   finishes), then mounts the navbar, all sections, and footer.
   Each section handles its own scroll-reveal via Framer Motion
   (see components/Reveal/Reveal.jsx).
   ============================================================ */

import { useState } from 'react';

import Preloader  from './components/Preloader/Preloader';
import Navbar     from './components/Navbar/Navbar';
import Footer     from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import BackToTop  from './components/BackToTop/BackToTop';
import CommandPalette from './components/CommandPalette/CommandPalette';
import CustomCursor from './components/CustomCursor/CustomCursor';
import EasterEgg  from './components/EasterEgg/EasterEgg';
import Hero       from './components/Hero/Hero';
import About      from './components/About/About';
import Skills     from './components/Skills/Skills';
import Projects   from './components/Projects/Projects';
import GithubStats from './components/GithubStats/GithubStats';
import Experience from './components/Experience/Experience';
import Testimonials from './components/Testimonials/Testimonials';
import Contact    from './components/Contact/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <CustomCursor />
      <EasterEgg />
      <Preloader onDone={() => setLoading(false)} />
      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />
          <CommandPalette />
          <main id="main-content">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <GithubStats />
            <Experience />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}
