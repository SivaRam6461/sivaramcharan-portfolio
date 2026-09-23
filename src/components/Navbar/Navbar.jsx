import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { scrollToId, scrollToTop } from '../../utils/scroll';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onOpenCmd }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOverHero, setIsOverHero] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Cache section offsets — re-reading layout every scroll frame
    // forces reflow and is a major source of scroll jank.
    let projectsEnd = window.innerHeight;
    const sectionTops = [];

    const measure = () => {
      const projectsSec = document.getElementById('projects');
      projectsEnd = projectsSec
        ? projectsSec.offsetTop + projectsSec.offsetHeight
        : window.innerHeight;
      sectionTops.length = 0;
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.id);
        sectionTops.push({ id: item.id, top: el ? el.offsetTop : Infinity });
      });
    };

    let rafId = null;
    const apply = () => {
      rafId = null;
      const scrollY = window.scrollY;
      setIsOverHero(scrollY + 64 < projectsEnd);

      const scrollPos = scrollY + 250;
      let next = sectionTops[0]?.id || 'hero';
      for (let i = sectionTops.length - 1; i >= 0; i--) {
        if (sectionTops[i].top <= scrollPos) {
          next = sectionTops[i].id;
          break;
        }
      }
      setActiveSection((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(apply);
    };

    measure();
    apply();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', () => {
      measure();
      schedule();
    });
    return () => {
      window.removeEventListener('scroll', schedule);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      scrollToTop();
    } else {
      scrollToId(id);
    }
  };

  const lightTheme = isOverHero;

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        lightTheme ? 'bg-[#faf9f7]/80 backdrop-blur-md' : 'bg-[#0b0c10]/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* LEFT: Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className="flex items-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 rounded py-2 px-1 min-h-[44px]"
          aria-label="Sivaram Charan - Back to top"
        >
          <span
            className={`font-grotesk text-[18px] font-bold tracking-tight transition-colors ${
              lightTheme ? 'text-[#1a1a1a]' : 'text-white'
            }`}
          >
            Sivaram Charan
          </span>
          <span className="w-2 h-2 rounded-full bg-[var(--orange-hero,#FF4F12)] mt-0.5" />
        </a>

        {/* CENTER: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative font-grotesk text-[13px] font-medium transition-colors duration-200 focus:outline-none focus-visible:text-orange-500 pb-1 ${
                  isActive
                    ? lightTheme
                      ? 'text-[#1a1a1a]'
                      : 'text-white'
                    : lightTheme
                      ? 'text-[#666] hover:text-[#1a1a1a]'
                      : 'text-[#999] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--orange-hero,#FF4F12)] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('contact');
            }}
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-grotesk font-semibold transition-all duration-300 ${
              lightTheme
                ? 'bg-[#1a1a1a] text-white hover:bg-[#333]'
                : 'bg-white text-[#0b0c10] hover:bg-gray-200'
            }`}
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Let's Talk */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('contact');
            }}
            className={`md:hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-grotesk font-semibold transition-all duration-300 ${
              lightTheme
                ? 'bg-[#1a1a1a] text-white hover:bg-[#333]'
                : 'bg-white text-[#0b0c10] hover:bg-gray-200'
            }`}
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3 h-3" />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              lightTheme
                ? 'text-[#1a1a1a] hover:bg-black/5'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden absolute top-16 left-4 right-4 rounded-2xl p-5 shadow-xl z-50 ${
              lightTheme
                ? 'bg-white border border-gray-100'
                : 'bg-[#1a1d29] border border-white/10'
            }`}
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-grotesk text-[15px] font-medium transition-colors ${
                      isActive
                        ? lightTheme
                          ? 'bg-orange-50 text-[var(--orange-hero,#FF4F12)]'
                          : 'bg-white/10 text-orange-400'
                        : lightTheme
                          ? 'text-[#555] hover:bg-gray-50 hover:text-[#1a1a1a]'
                          : 'text-[#999] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className={`mt-4 pt-4 border-t ${lightTheme ? 'border-gray-100' : 'border-white/10'}`}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  scrollToId('contact');
                }}
                className="w-full py-3 rounded-xl bg-[#1a1a1a] text-center font-grotesk text-[14px] font-semibold text-white flex items-center justify-center gap-2"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
