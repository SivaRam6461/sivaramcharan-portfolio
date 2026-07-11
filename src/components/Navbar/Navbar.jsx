/* ============================================================
   components/Navbar/Navbar.jsx
   Sticky top navbar with:
   - Active link tracking on scroll
   - Dark/light theme toggle
   - Mobile hamburger menu
   - Resume download button
   ============================================================ */

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo, testimonials } from '../../data/portfolioData';
import './Navbar.css';

// Navigation items — label shown, id is the section to scroll to.
// "Reviews" only appears once real testimonials exist in portfolioData.js.
const NAV_ITEMS = [
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'GitHub',     id: 'github' },
  { label: 'Experience', id: 'experience' },
  ...(testimonials.length > 0 ? [{ label: 'Reviews', id: 'testimonials' }] : []),
  { label: 'Contact',    id: 'contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled]   = useState(false);  // frosted glass effect
  const [menuOpen, setMenuOpen]   = useState(false);  // mobile menu
  const [activeId, setActiveId]   = useState('');     // highlighted link

  // Add/remove .scrolled class based on scroll position
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Find which section is currently in view
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth scroll to section when nav link clicked
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // close mobile menu
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        {/* Logo */}
        <a href="#hero" className="nav-logo gradient-text"
           onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          {personalInfo.initials}
        </a>

        {/* Desktop navigation links */}
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                className={activeId === item.id ? 'active' : ''}
                aria-current={activeId === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side controls */}
        <div className="nav-right">
          {/* Command palette trigger — Ctrl/Cmd+K also opens it globally */}
          <button
            className="cmdk-trigger"
            onClick={() => window.dispatchEvent(new Event('toggle-command-palette'))}
            aria-label="Open command palette"
            title="Command palette (Ctrl+K)"
          >
            <kbd>{navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
          </button>

          {/* Theme toggle — sun in dark mode, moon in light mode */}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>

          {/* Resume download — hidden on mobile via CSS */}
          <a href={personalInfo.resumeUrl} download className="btn-primary"
             style={{ padding: '9px 20px', fontSize: '0.82rem' }}>
            Resume ↓
          </a>

          {/* Mobile hamburger button */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <ul className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a href={personalInfo.resumeUrl} download>Download Resume ↓</a>
        </li>
      </ul>
    </>
  );
}
