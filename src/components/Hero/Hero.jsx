import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { scrollToId } from '../../utils/scroll';
import './Hero.css';

const STATS = [
  { value: '30+', label: 'PROJECTS\nDELIVERED' },
  { value: '10+', label: 'HAPPY\nCLIENTS' },
  { value: '3+', label: 'YEARS\nEXPERIENCE' },
];

const wordReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const lineReveal = {
  hidden: { width: 0 },
  visible: { width: '100%', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const heroRef = useRef(null);

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="hero-bg-image" aria-hidden="true" />

      {/* Left Content */}
      <div className="hero-content">
        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="hero-eyebrow"
        >
          <span className="hero-eyebrow-text">FULL STACK AI DEVELOPER</span>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={lineReveal}
            className="hero-eyebrow-line"
          />
        </motion.div>

        {/* Headline */}
        <h1 className="hero-headline">
          <span className="hero-headline-row">
            <span className="hero-headline-clip">
              <motion.span variants={wordReveal} initial="hidden" animate="visible" custom={0} className="hero-headline-word">I</motion.span>
            </span>
            <span className="hero-headline-clip">
              <motion.span variants={wordReveal} initial="hidden" animate="visible" custom={1} className="hero-headline-word">BUILD</motion.span>
            </span>
          </span>
          <span className="hero-headline-row">
            <span className="hero-headline-clip">
              <motion.span variants={wordReveal} initial="hidden" animate="visible" custom={2} className="hero-headline-word">DIGITAL</motion.span>
            </span>
            <span className="hero-headline-clip">
              <motion.span variants={wordReveal} initial="hidden" animate="visible" custom={3} className="hero-headline-word">PRODUCTS</motion.span>
            </span>
          </span>
          <span className="hero-headline-row">
            <span className="hero-headline-clip">
              <motion.span variants={wordReveal} initial="hidden" animate="visible" custom={4} className="hero-headline-word">THAT</motion.span>
            </span>
            <span className="hero-headline-clip">
              <motion.span variants={wordReveal} initial="hidden" animate="visible" custom={5} className="hero-headline-word hero-headline-accent">THINK.</motion.span>
            </span>
          </span>
        </h1>

        {/* Description */}
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={1} className="hero-description">
          Full Stack AI Developer building intelligent web, mobile, SaaS and automation-driven products from idea to production.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="hero-ctas">
          <button onClick={() => scrollToId('projects')} className="hero-btn-primary">
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => scrollToId('contact')} className="hero-btn-secondary">
            <span>Let's Build Together</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Availability */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="hero-availability">
          <span className="hero-availability-dot" />
          <span>AVAILABLE FOR FREELANCE PROJECTS</span>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="hero-stats">
          {STATS.map((stat, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Profile Photo */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hero-photo"
      >
        <img
          src="/profile-image.png"
          alt="Sivaram Charan - Full Stack AI Developer"
          width={1296}
          height={1214}
          fetchpriority="high"
          decoding="async"
          className="hero-photo-img"
        />
      </motion.div>
    </section>
  );
}
