/* ============================================================
   components/Hero/Hero.jsx
   Full-viewport landing section with:
   - Animated orb background + particle system
   - Typewriter role text
   - CTA buttons + social links
   ============================================================ */

import { useEffect, useRef } from 'react';
import useTypewriter from '../../hooks/useTypewriter';
import { personalInfo } from '../../data/portfolioData';
import './Hero.css';

// Words cycled by the typewriter animation
const ROLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'React Enthusiast',
  'API Architect',
  'Problem Solver',
];

// GitHub SVG icon
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// LinkedIn SVG icon
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Email SVG icon
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 7L2 7"/>
  </svg>
);

export default function Hero() {
  const typedText = useTypewriter(ROLES);
  const particlesRef = useRef(null);

  // Create floating dot particles on mount
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${100 + Math.random() * 20}%;
        width: ${Math.random() > 0.5 ? 3 : 2}px;
        height: ${Math.random() > 0.5 ? 3 : 2}px;
        background: ${Math.random() > 0.5 ? 'var(--cyan)' : 'var(--purple)'};
        animation-duration: ${5 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 8}s;
      `;
      container.appendChild(p);
    }

    // Clean up particles on unmount
    return () => { container.innerHTML = ''; };
  }, []);

  // Smooth scroll helper
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero">
      {/* Ambient glow orbs — purely decorative */}
      <div className="orb orb1" aria-hidden="true" />
      <div className="orb orb2" aria-hidden="true" />
      <div className="orb orb3" aria-hidden="true" />

      {/* Grid dot pattern — purely decorative */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Particle container — populated by useEffect, purely decorative */}
      <div className="particles" ref={particlesRef} aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="hero-content">
        {/* Availability badge */}
        <div className="hero-badge">
          <span className="dot" />
          Available for opportunities
        </div>

        {/* Name heading */}
        <h1 className="hero-name">
          Hi, I'm <span className="gradient-text">Sivaram </span>
        </h1>

        {/* Animated role typewriter */}
        <div className="typewriter-wrap">
          <span>{typedText}</span>
          <span className="cursor">|</span>
        </div>

        {/* Tagline */}
        <p className="hero-sub">{personalInfo.tagline}</p>

        {/* CTA buttons */}
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo('projects')}>
            View My Work →
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('contact')}>
            Let's Talk
          </button>
        </div>

        {/* Social icons */}
        <div className="hero-socials">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
            <GithubIcon />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="social-icon" title="Email">
            <EmailIcon />
          </a>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button className="scroll-indicator" onClick={() => scrollTo('about')} aria-label="Scroll to About section">
        <div className="scroll-line" aria-hidden="true" />
        <span>Scroll</span>
      </button>
    </section>
  );
}
