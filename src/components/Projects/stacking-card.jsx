/* ============================================================
    src/components/Projects/stacking-card.jsx
    Cinematic Stacking Cards — reference motion ported to this
    codebase (Lenis + framer-motion, JavaScript).

    Motion model (mirrors the reference component):
      • Root container progress  ≈ useScroll({ offset: ['start start','end end'] })
      • Card scale               = useTransform(progress, [i*0.25, 1], [1, targetScale])
      • targetScale              = 1 - (total - i) * 0.05
      • Image parallax           ≈ useScroll({ target: wrap, ['start end','start start'] })
                                  → useTransform(imgProgress, [0, 1], [2, 1])
      • Sticky full-screen wrappers; inner card offset
        top: calc(-5vh + i*25px), transform-origin: top center.

    Instead of useScroll (which conflicted with Lenis earlier),
    progress is measured from element rects on every Lenis
    scroll frame — same values the reference derives.
    ============================================================ */

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { GithubIcon } from '../Icons';
import { cn } from '@/lib/utils';
import { onLenisScroll } from '../../utils/scroll';
import './Projects.css';

const variantSrcSet = (src) => {
  const match = src.match(/^(.*)\.([^.]+)$/);
  if (!match) return undefined;
  const [, base, ext] = match;
  return `${base}-480w.${ext} 480w, ${base}-720w.${ext} 720w, ${src} 1024w`;
};
const IMG_LAZY = { loading: 'lazy', decoding: 'async', sizes: '(min-width: 1024px) 45vw, 100vw' };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Touch devices: skip per-card parallax (N× getBoundingClientRect per
// frame is a major source of mobile scroll jank).
const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

/* ── Single stacking card ── */
function StackingCard({ i, project, total, progress, onView }) {
  const wrapRef = useRef(null);
  const imgProgress = useMotionValue(0);

  // Reference ranges — guarded so the last cards (i*0.25 ≥ 1)
  // never produce a degenerate or reversed input range.
  const rangeStart = Math.min(i * 0.25, 0.95);
  const targetScale = 1 - (total - i) * 0.05;

  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  const imageScale = useTransform(imgProgress, [0, 1], [2, 1]);

  // Image parallax: 0 while the wrapper enters from the viewport
  // bottom → 1 when it reaches its sticky top (equivalent of the
  // reference's useScroll offset ['start end', 'start start']).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (prefersReducedMotion() || isCoarsePointer()) {
      imgProgress.set(1);
      return;
    }
    let stickTop = 0;
    let rafId = null;
    const readStick = () => {
      stickTop = parseFloat(getComputedStyle(el).top) || 0;
    };
    const update = () => {
      rafId = null;
      const rect = el.getBoundingClientRect();
      // Off-screen wrappers: don't thrash layout every frame.
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const vh = window.innerHeight;
      const denom = Math.max(vh - stickTop, 1);
      const p = 1 - (rect.top - stickTop) / denom;
      const clamped = Math.min(Math.max(p, 0), 1);
      if (Math.abs(clamped - imgProgress.get()) < 0.002) return;
      imgProgress.set(clamped);
    };
    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };
    const onResize = () => {
      readStick();
      schedule();
    };
    readStick();
    const off = onLenisScroll(schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    update();
    return () => {
      off();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [imgProgress]);

  const projectTech = project.tech || project.tags || [];
  const projectImage = project.coverImage || project.image || '/images/p1.webp';

  return (
    <div ref={wrapRef} className={cn('stack-card-wrap')}>
      <motion.div
        className="project-card"
        style={{ scale, '--stack-i': i }}
      >
        {/* Info column */}
        <div className="project-card-info">
          <div className="project-card-number">
            {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <span className="project-card-category">{project.category}</span>
          {project.featured && (
            <span
              className="project-card-category"
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                borderColor: 'rgba(251, 191, 36, 0.3)',
                color: '#b45309',
              }}
            >
              <Sparkles className="w-3 h-3 inline mr-1" />Featured
            </span>
          )}
          <h3 className="project-card-title">
            {project.title.toUpperCase().replace(/\s+/g, '\n')}
          </h3>
          <p className="project-card-desc">{project.subtitle}</p>
          <div className="project-card-tech">
            {projectTech.map((tag, idx) => (
              <span key={idx}>{tag}</span>
            ))}
          </div>
          <div className="project-card-actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="project-card-btn primary"
              >
                VIEW LIVE <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="project-card-btn ghost"
              >
                <GithubIcon className="w-3.5 h-3.5" /> GITHUB
              </a>
            )}
            <button
              type="button"
              onClick={() => onView?.(project)}
              className="project-card-btn ghost"
              style={{ borderColor: 'rgba(255,79,18,0.3)', color: '#FF4F12' }}
            >
              VIEW CASE STUDY <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual column */}
        <div className="project-card-visual">
          <div className="project-card-visual-frame">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="url">
              {project.liveUrl
                ? new URL(project.liveUrl).hostname
                : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.dev`}
            </span>
            <Globe className="w-3 h-3 text-[#aaa]" />
          </div>
          <div style={{ height: '100%', overflow: 'hidden' }}>
            <motion.img
              src={projectImage}
              alt={project.title}
              srcSet={variantSrcSet(projectImage)}
              style={{ scale: imageScale }}
              className="project-card-visual-image"
              {...IMG_LAZY}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Root: measured stacking container ── */
export default function ProjectsStacking({ projects = [], onView }) {
  const containerRef = useRef(null);
  const progress = useMotionValue(0);

  // Section-local progress — equivalent of the reference's
  // useScroll({ target: container, offset: ['start start', 'end end'] }):
  // 0 when the container top hits the viewport top,
  // 1 when the container bottom hits the viewport bottom.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    let rafId = null;
    const update = () => {
      rafId = null;
      // Off-screen: skip layout reads entirely (mobile-friendly).
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const denom = rect.height - window.innerHeight;
      const p = denom > 0 ? -rect.top / denom : 0;
      const clamped = Math.min(Math.max(p, 0), 1);
      if (Math.abs(clamped - progress.get()) < 0.001) return;
      progress.set(clamped);
    };
    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };
    const off = onLenisScroll(schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      off();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [progress, projects.length]);

  return (
    <div ref={containerRef} className="projects-stack-scroll">
      {projects.map((project, i) => (
        <StackingCard
          key={project.id}
          i={i}
          project={project}
          total={projects.length}
          progress={progress}
          onView={onView}
        />
      ))}
    </div>
  );
}
