/* ============================================================
   src/components/CommandPalette/CommandPalette.jsx
   Global Command Palette in Orange & White Theme
   Keyboard accessible: ↑↓ navigate, Enter select, Esc close.
   ============================================================ */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, User, Code2, FolderGit2, Briefcase, Mail, Volume2, Download, ExternalLink, X } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { playSound, toggleMute } from '../../utils/audio';
import { scrollToId } from '../../utils/scroll';

const COMMAND_ITEMS = [
  {
    category: 'Navigation',
    items: [
      { id: 'about', label: 'Go to About Section', icon: User, action: (close) => { scrollToId('about'); close(); } },
      { id: 'skills', label: 'Go to Skills Matrix', icon: Code2, action: (close) => { scrollToId('skills'); close(); } },
      { id: 'projects', label: 'Go to Case Studies', icon: FolderGit2, action: (close) => { scrollToId('projects'); close(); } },
      { id: 'experience', label: 'Go to Experience & Education', icon: Briefcase, action: (close) => { scrollToId('experience'); close(); } },
      { id: 'contact', label: 'Go to Contact Portal', icon: Mail, action: (close) => { scrollToId('contact'); close(); } },
    ],
  },
  {
    category: 'Actions & Social',
    items: [
      { id: 'resume', label: 'Download Resume PDF', icon: Download, action: () => window.open(personalInfo.resumeUrl, '_blank', 'noopener,noreferrer') },
      { id: 'github', label: 'Open GitHub Profile', icon: ExternalLink, action: () => window.open(personalInfo.github, '_blank', 'noopener,noreferrer') },
      { id: 'linkedin', label: 'Open LinkedIn Profile', icon: ExternalLink, action: () => window.open(personalInfo.linkedin, '_blank', 'noopener,noreferrer') },
      { id: 'sound', label: 'Toggle UI Audio Mute', icon: Volume2, action: () => toggleMute() },
    ],
  },
];

export default function CommandPalette({ isOpen, onClose, onOpen }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef(null);
  // Ref always holds the latest flattened results, so the keydown handler
  // can read current navigation state without re-subscribing.
  const flatItemsRef = useRef([]);

  // Reset the active row whenever the query or open-state changes.
  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [query, isOpen]);

  // Keep Tab focus inside the dialog while open (modal focus trap).
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusables = () =>
      [...dialog.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')]
        .filter((el) => !el.hasAttribute('disabled'));
    const handler = (e) => {
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener('keydown', handler);
    return () => dialog.removeEventListener('keydown', handler);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const items = flatItemsRef.current;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playSound('open');
        if (isOpen) onClose();
        else if (onOpen) onOpen();
        return;
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (items.length ? (i + 1) % items.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (items.length ? (i - 1 + items.length) % items.length : 0));
      } else if (e.key === 'Enter') {
        const item = items[activeIndex];
        if (item) {
          e.preventDefault();
          playSound('click');
          item.action(onClose);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpen, activeIndex]);

  if (!isOpen) return null;

  const run = (item) => {
    playSound('click');
    item.action(onClose);
  };

  const filteredCommands = COMMAND_ITEMS.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
  })).filter((cat) => cat.items.length > 0);

  const flatItems = filteredCommands.flatMap((c) => c.items);
  flatItemsRef.current = flatItems;

  // Running index across categories so ↑↓ maps to a single flat list.
  let flatIdx = -1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-[#12141c] border border-white/20 rounded-3xl p-4 shadow-2xl overflow-hidden space-y-4"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/15">
            <Search className="w-5 h-5 text-orange-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or section..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search commands"
              className="w-full bg-transparent font-body text-sm text-white outline-none placeholder:text-slate-400"
            />
            <button
              onClick={onClose}
              aria-label="Close command palette"
              className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto space-y-4 px-2">
            {filteredCommands.map((cat, i) => (
              <div key={i} className="space-y-2">
                <span className="font-mono text-[10px] text-orange-400 uppercase tracking-widest px-2 font-bold">
                  {cat.category}
                </span>
                <div className="space-y-1">
                  {cat.items.map((item) => {
                    flatIdx += 1;
                    const isActive = flatIdx === activeIndex;
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        role="option"
                        aria-selected={isActive}
                        ref={(el) => {
                          if (isActive && el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
                        }}
                        onClick={() => run(item)}
                        onMouseEnter={() => setActiveIndex(flatIdx)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group border ${
                          isActive
                            ? 'bg-orange-500/20 border-orange-500/50'
                            : 'border-transparent hover:bg-orange-500/10 hover:border-orange-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComp className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                          <span className={`font-mono text-xs font-semibold ${isActive ? 'text-orange-300' : 'text-white group-hover:text-orange-300'}`}>
                            {item.label}
                          </span>
                        </div>
                        <ArrowRight className={`w-4 h-4 transition-all ${isActive ? 'text-orange-400 translate-x-1' : 'text-slate-400 group-hover:text-orange-400 group-hover:translate-x-1'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {flatItems.length === 0 && (
              <p className="font-mono text-xs text-slate-400 text-center py-6">
                No matching commands.
              </p>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-slate-400 px-2">
            <span>Use ↑↓ to navigate · Enter to select</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}