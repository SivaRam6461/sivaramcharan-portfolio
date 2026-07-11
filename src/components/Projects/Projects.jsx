/* ============================================================
   components/Projects/Projects.jsx
   Filterable project card grid.
   Filter buttons show/hide cards by category.
   ============================================================ */


import { Reveal, RevealGroup, RevealItem } from '../Reveal/Reveal';
import { projects, projectFilters } from '../../data/portfolioData';
import './Projects.css';
import { useState, useEffect } from 'react';

/* ── Small SVG icons used in buttons ── */
const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

/* Each project image ships as 480w/720w/960w WebP variants
   (see public/images/*-480w.webp, *-720w.webp). This builds the
   srcset from the base 960w path referenced in portfolioData.js. */
function buildSrcSet(src) {
  const dot = src.lastIndexOf('.');
  const base = src.slice(0, dot);
  const ext = src.slice(dot);
  return [
    `${encodeURI(`${base}-480w${ext}`)} 480w`,
    `${encodeURI(`${base}-720w${ext}`)} 720w`,
    `${encodeURI(src)} 960w`,
  ].join(', ');
}

const THUMB_SIZES = '(max-width: 480px) 100vw, (max-width: 1100px) 45vw, 480px';

/* ── Single project card ── */
function ProjectCard({ project }) {
   const [isHovering, setIsHovering] = useState(false);
const [current, setCurrent] = useState(0);

  // auto slide when card is hovered or clicked
useEffect(() => {
  if (!isHovering) return;
  if (!project?.images || project.images.length === 0) return;

  const interval = setInterval(() => {
    setCurrent((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  }, 1500);

  return () => clearInterval(interval);
}, [isHovering, project?.images]);
  
  return (
    <RevealItem className="project-card"
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => {
    setIsHovering(false);
    setCurrent(0); // reset to first image
  }}>
     {/* ---------------------------------------------------------------------------------------------- */}
      {/* IMAGE SLIDER */}
      <div className="project-thumb slider" onClick={() => setCurrent(0)}>
        {project.images && project.images.length > 0 ? (
  <div
    className="slider-track"
    style={{
      transform: `translateX(-${current * 100}%)`
    }}
  >
    {project.images.map((img, i) => (
      <img
        key={i}
        src={img}
        srcSet={buildSrcSet(img)}
        sizes={THUMB_SIZES}
        alt={`${project.title} — screenshot ${i + 1} of ${project.images.length}`}
        loading="lazy"
        decoding="async"
      />
    ))}
  </div>
) : (
  <span className="project-emoji">{project.emoji}</span>
)}

        <div className="project-badges">
          <span className="badge-cat">{project.category}</span>
          {project.featured && <span className="badge-feat">⭐ Featured</span>}
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------------------- */}

      {/* Card body */}
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {/* Tech stack pills */}
        <div className="project-tech">
          {project.tech.map((t) => (
            <span className="tech-tag" key={t}>{t}</span>
          ))}
        </div>

        {/* Action buttons — only rendered when a real URL exists */}
        <div className="project-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
               className="project-btn project-btn-primary">
              <ExternalLinkIcon /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
               className="project-btn project-btn-ghost">
              <GithubIcon /> GitHub
            </a>
          )}
        </div>
      </div>
    </RevealItem>
  );
}

/* ── Main section component ── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects">
      <div className="section">

        {/* Header row: title + filter tabs */}
        <div className="projects-header">
          <Reveal>
            <span className="section-label">What I've built</span>
            <h2 className="section-title">
              My <span className="gradient-text">Projects</span>
            </h2>
          </Reveal>

          {/* Filter buttons — generated from projectFilters in portfolioData */}
          <Reveal className="filter-tabs">
            {projectFilters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </Reveal>
        </div>

        {/* Project cards — filtered list. Keyed on activeFilter so the
            stagger animation replays when the filter changes. */}
        <RevealGroup className="projects-grid" key={activeFilter}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </RevealGroup>

      </div>
    </section>
  );
}
