/* ============================================================
   components/CommandPalette/CommandPalette.jsx
   Ctrl/Cmd+K opens a searchable list of quick actions — jump to
   a section, toggle theme, open socials, copy email, download
   resume. Esc closes it; arrow keys + Enter navigate/execute.
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo } from '../../data/portfolioData';
import './CommandPalette.css';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function CommandPalette() {
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const triggerElRef = useRef(null);

  const commands = useMemo(() => [
    { id: 'home', label: 'Go to Home', keywords: 'hero top', action: () => scrollTo('hero') },
    { id: 'about', label: 'Go to About', keywords: 'bio', action: () => scrollTo('about') },
    { id: 'skills', label: 'Go to Skills', keywords: 'tech stack', action: () => scrollTo('skills') },
    { id: 'projects', label: 'Go to Projects', keywords: 'work portfolio', action: () => scrollTo('projects') },
    { id: 'github-section', label: 'Go to GitHub Activity', keywords: 'stats contributions', action: () => scrollTo('github') },
    { id: 'experience', label: 'Go to Experience', keywords: 'journey timeline education', action: () => scrollTo('experience') },
    { id: 'contact', label: 'Go to Contact', keywords: 'form message', action: () => scrollTo('contact') },
    {
      id: 'theme',
      label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      keywords: 'theme dark light toggle',
      action: toggleTheme,
    },
    {
      id: 'resume',
      label: 'Download Resume',
      keywords: 'cv pdf',
      action: () => {
        const a = document.createElement('a');
        a.href = personalInfo.resumeUrl;
        a.download = '';
        a.click();
      },
    },
    {
      id: 'github-profile',
      label: 'Open GitHub Profile',
      keywords: 'code repos',
      action: () => window.open(personalInfo.github, '_blank', 'noopener'),
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      keywords: 'career network',
      action: () => window.open(personalInfo.linkedin, '_blank', 'noopener'),
    },
    {
      id: 'copy-email',
      label: `Copy Email (${personalInfo.email})`,
      keywords: 'contact mail address',
      action: () => navigator.clipboard?.writeText(personalInfo.email),
    },
  ], [isDark, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      c.label.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const closePalette = () => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
    triggerElRef.current?.focus();
  };

  const runCommand = (cmd) => {
    if (!cmd) return;
    cmd.action();
    closePalette();
  };

  /* Global Ctrl/Cmd+K to open, Esc to close */
  useEffect(() => {
    const onKeyDown = (e) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        triggerElRef.current = document.activeElement;
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape' && open) {
        closePalette();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  /* Also open via a visible navbar button (custom event keeps this decoupled) */
  useEffect(() => {
    const onExternalToggle = () => {
      triggerElRef.current = document.activeElement;
      setOpen((prev) => !prev);
    };
    window.addEventListener('toggle-command-palette', onExternalToggle);
    return () => window.removeEventListener('toggle-command-palette', onExternalToggle);
  }, []);

  /* Focus search input on open, reset selection when results change */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => { setActiveIndex(0); }, [query]);

  const onListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(filtered[activeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={closePalette}
        >
          <motion.div
            className="cmdk-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmdk-input-row">
              <span className="cmdk-input-icon" aria-hidden="true">⌘</span>
              <input
                ref={inputRef}
                type="text"
                className="cmdk-input"
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKeyDown}
                aria-label="Search commands"
                aria-activedescendant={filtered[activeIndex] ? `cmdk-item-${filtered[activeIndex].id}` : undefined}
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
              />
              <kbd className="cmdk-esc">Esc</kbd>
            </div>

            <ul className="cmdk-list" id="cmdk-list" role="listbox">
              {filtered.length === 0 && (
                <li className="cmdk-empty">No matching commands</li>
              )}
              {filtered.map((cmd, i) => (
                <li
                  key={cmd.id}
                  id={`cmdk-item-${cmd.id}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  className={`cmdk-item ${i === activeIndex ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => runCommand(cmd)}
                >
                  {cmd.label}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
