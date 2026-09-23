/* ============================================================
    src/components/Projects/Projects.jsx
    Premium Editorial Project Archive with Cinematic Stacking Scroll
    ============================================================ */

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../Icons';
import { projects } from '../../data/portfolioData';
import { lockScroll, unlockScroll, onLenisScroll } from '../../utils/scroll';
import ProjectsStacking from './stacking-card';
import './Projects.css';

// Product-type filters only — categories appear solely when a real project matches.
// No empty SaaS / AI / Mobile pills (no projects of those types in data yet).
const CATEGORY_ORDER = ['Full Stack', 'Web'];
const FILTER_TABS = [
  { id: 'all', label: 'All Work' },
  ...CATEGORY_ORDER.filter(c => projects.some(p => (p.tags || []).includes(c))).map(c => ({ id: c, label: c })),
];

const variantSrcSet = (src) => {
  const match = src.match(/^(.*)\.([^.]+)$/);
  if (!match) return undefined;
  const [, base, ext] = match;
  return `${base}-480w.${ext} 480w, ${base}-720w.${ext} 720w, ${src} 1024w`;
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);

  const filteredProjects = useMemo(
    () => projects.filter(p => activeCategory === 'all' || (p.tags || []).includes(activeCategory)),
    [activeCategory]
  );

  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const off = onLenisScroll((opts) => {
      scrollProgress.set(opts.progress ?? 0);
    });
    scrollProgress.set(0);
    return off;
  }, []);

  const progressWidth = useTransform(scrollProgress, [0, 1], [0, 100]);

  // Case study modal
  useEffect(() => {
    if (!selectedProject) return;
    const prevFocus = document.activeElement;
    const dialog = dialogRef.current;
    const focusables = dialog ? [...dialog.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')] : [];
    (focusables[0] || dialog)?.focus();
    lockScroll();
    const onKeydown = (e) => {
      if (e.key === 'Escape') { setSelectedProject(null); return; }
      if (e.key === 'Tab' && focusables.length) {
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => { document.removeEventListener('keydown', onKeydown); unlockScroll(); prevFocus?.focus?.(); };
  }, [selectedProject]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-bg-grid" aria-hidden="true" />
      <div className="projects-bg-dots" aria-hidden="true" />
      <div className="projects-bg-word" aria-hidden="true">WORK</div>

      <div className="projects-container">

        {/* ═══ SECTION HEADER ═══ */}
        <div className="projects-header">
          <div className="projects-eyebrow">
            <span className="projects-eyebrow-dot" />
            <span>04 // Selected Work</span>
          </div>
          <h2 className="projects-heading">IDEAS.<br />BUILT.<br /><span className="accent">SHIPPED.</span></h2>
          <p className="projects-desc">Real products and experiences — full-stack builds and web work — from idea to working software.</p>
          <div className="projects-handwriting">proof is in <span>the build.</span><span className="arrow">↘</span></div>
        </div>

        {/* ═══ FILTER NAVIGATION ═══ */}
        <div className="projects-filter-wrapper">
          <div className="projects-filter-label">Explore by</div>
          <div className="projects-filter-row">
            {FILTER_TABS.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`projects-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}>{cat.label}</button>
            ))}
          </div>
        </div>

        {/* ═══ PROGRESS BAR ═══ */}
        <div style={{ position: 'sticky', top: '80px', zIndex: '5', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(11,11,11,0.08)', position: 'relative' }}>
            <motion.div style={{ height: '100%', background: '#FF4F12', width: progressWidth }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#0B0B0B' }}>
              PROJECTS
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#FF4F12' }}>
              {filteredProjects.length > 0 ? `01 / 0${filteredProjects.length}` : '00 / 00'}
            </span>
          </div>
        </div>

        {/* ═══ STACKING SCROLL CONTAINER ═══ */}
        <div className="projects-stack-container">
          <ProjectsStacking projects={filteredProjects} onView={setSelectedProject} />
        </div>

        {/* ═══ SECTION ENDING ═══ */}
        <div className="projects-ending">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#FF4F12', marginBottom: '16px' }}>
            0{filteredProjects.length} / 0{filteredProjects.length}
          </div>
          <h3 className="projects-ending-title">MORE IS<br /><span className="accent">ALWAYS</span><br />BEING BUILT.</h3>
          <div className="projects-ending-handwriting">the next one <span>could be yours.</span><span className="arrow">↗</span></div>
        </div>

      </div>

      {/* ═══ CASE STUDY MODAL ═══ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="case-study-overlay" onClick={() => setSelectedProject(null)}>
            <motion.div
              ref={dialogRef} role="dialog" aria-modal="true"
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} className="case-study-modal"
            >
              <div className="case-study-header">
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <span className="case-study-meta-item">{selectedProject.category}</span>
                    {selectedProject.featured && <span className="case-study-meta-item" style={{ background: 'rgba(251,191,36,0.1)', color: '#b45309', borderColor: 'rgba(251,191,36,0.3)' }}>Featured</span>}
                  </div>
                  <h3 className="case-study-title">{selectedProject.title}</h3>
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }} className="case-study-close" aria-label="Close Case Study"><X className="w-4 h-4" /></button>
              </div>
              <div className="case-study-meta">
                <span className="case-study-meta-item">Role: {selectedProject.role || '—'}</span>
                <span className="case-study-meta-item">Type: {selectedProject.category}</span>
              </div>
              <div className="case-study-image-frame">
                <motion.img src={selectedProject.coverImage || selectedProject.image || '/images/p1.webp'} alt={selectedProject.title} srcSet={variantSrcSet(selectedProject.coverImage || selectedProject.image || '/images/p1.webp')} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
              </div>
              <div className="case-study-section-label">The Challenge</div>
              <p className="case-study-text">{selectedProject.challenge || 'Turning a product idea into a clear, usable digital experience.'}</p>
              <div className="case-study-section-label">The Solution</div>
              <p className="case-study-text">{selectedProject.solution || 'Designed and built the product workflow across interface, services, and data.'}</p>
              {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                <>
                  <div className="case-study-section-label">Key Deliverables</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
                    {selectedProject.keyFeatures.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '8px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', color: '#555', lineHeight: '1.5' }}>
                        <CheckCircle2 className="w-4 h-4 text-[#FF4F12] shrink-0 mt-0.5" /><span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="case-study-section-label">Technology</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                {(selectedProject.tech || selectedProject.tags || []).map((t, i) => (
                  <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', padding: '4px 10px', borderRadius: '100px', background: 'rgba(11,11,11,0.04)', border: '1px solid rgba(11,11,11,0.08)', color: '#555' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingTop: '20px', borderTop: '1px solid rgba(11,11,11,0.08)' }}>
                {selectedProject.liveUrl && <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="project-card-btn primary" style={{ padding: '12px 28px', fontSize: '12px' }}>VIEW LIVE <ArrowUpRight className="w-4 h-4" /></a>}
                {selectedProject.githubUrl && <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="project-card-btn ghost" style={{ padding: '12px 28px', fontSize: '12px' }}><GithubIcon className="w-4 h-4" /> GITHUB</a>}
                <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }} className="project-card-btn ghost" style={{ padding: '12px 28px', fontSize: '12px', borderColor: '#FF4F12', color: '#FF4F12' }}>Close Case Study</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
