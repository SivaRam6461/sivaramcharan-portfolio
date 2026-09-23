/* ============================================================
   src/components/Footer/Footer.jsx
   Concept 4: Scroll-Pinned Reveal Footer with Vertical Slide-Up
   Fixed: whileInView approach for Lenis smooth scroll compatibility
   ============================================================ */

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, MapPin, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';
import { personalInfo } from '../../data/portfolioData';
import { scrollToTop, scrollToId } from '../../utils/scroll';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'GitHub',     href: '#github-telemetry' },
  { label: 'Contact',    href: '#contact' },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Footer() {
  const footerRef = useRef(null);

  const scrollTop = () => scrollToTop();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-10 bg-[#0b0c10] border-t border-white/10 overflow-hidden"
    >
      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-56 bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
      {/* Top fade from background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0b0c10]/80 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-12 space-y-16">

        {/* CLOSING KINETIC HEADLINE — staggered slide-up on scroll entry */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center space-y-8"
        >
          {/* Overline label */}
          <motion.div variants={slideUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span>Let's create something great</span>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            variants={slideUp}
            className="font-head text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight"
          >
            <span className="text-white block">READY TO</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-white block">
              BUILD IT? →
            </span>
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            variants={slideUp}
            className="text-slate-400 font-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Open for full-time roles, product builds &amp; AI/automation collaborations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={slideUp} className="flex items-center justify-center flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 text-slate-950 font-mono text-sm font-extrabold shadow-xl shadow-orange-500/25 hover:shadow-orange-500/45 hover:scale-105 transition-all"
            >
              Open a Channel →
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-orange-500/40 text-white font-mono text-sm font-bold transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>@SivaRam6461</span>
            </a>
          </motion.div>

          {/* Status pills */}
          <motion.div variants={slideUp} className="flex items-center justify-center flex-wrap gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open for Projects
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold">
              <MapPin className="w-3 h-3" />
              India · IST
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-slate-300 font-mono text-xs font-bold">
              <Code2 className="w-3 h-3 text-amber-400" />
              AI · Automation · SaaS
            </span>
          </motion.div>
        </motion.div>

        {/* BOTTOM 3-COLUMN BAR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/favicon.svg"
              alt="Sivaram Charan logo"
              width="40"
              height="40"
              className="w-10 h-10 rounded-full shadow-lg shadow-orange-500/25 shrink-0"
            />
            <div>
              <span className="font-head text-sm font-bold text-white block">Sivaram Charan</span>
              <span className="text-[11px] font-mono text-slate-400">
                Full Stack AI Developer © {new Date().getFullYear()}
              </span>
            </div>
          </div>

          {/* Center: Quick Nav Links */}
          <nav className="flex items-center justify-center flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href.slice(1))}
                className="text-xs font-mono text-slate-400 hover:text-orange-400 transition-colors font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Socials + Back to Top */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-full bg-white/[0.06] hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-white hover:text-orange-400 transition-all"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full bg-white/[0.06] hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-white hover:text-orange-400 transition-all"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <button
              onClick={scrollTop}
              className="p-3 rounded-full bg-orange-500/20 hover:bg-orange-500 border border-orange-500/50 text-orange-400 hover:text-slate-950 transition-all shadow-lg shadow-orange-500/20 group"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Bottom Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center font-mono text-[11px] text-slate-600 pb-2"
        >
          Crafted with precision using React · Framer Motion · Tailwind CSS · Vite
        </motion.div>

      </div>
    </footer>
  );
}
