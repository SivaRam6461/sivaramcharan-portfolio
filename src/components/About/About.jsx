/* ============================================================
   components/About/About.jsx
   Two-column section: animated avatar + stats | bio + tags
   ============================================================ */

import { Reveal, RevealGroup, RevealItem } from '../Reveal/Reveal';
import { personalInfo, stats, aboutTags } from '../../data/portfolioData';
import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="section">

        {/* ── Left: Avatar ring + stat cards ── */}
        <Reveal direction="left" className="about-visual">
          {/* Spinning dashed ring with gradient circle */}
          <div className="avatar-ring">
            <div className="avatar-outer" aria-hidden="true" />
            <div className="avatar-inner" aria-hidden="true">{personalInfo.initials}</div>
            <div className="avatar-badge">🎓 B.Tech AI</div>
          </div>

          {/* 2×2 stat tiles */}
          <RevealGroup className="stats-grid" stagger={0.08}>
            {stats.map((s) => (
              <RevealItem className="stat-card" key={s.label}>
                <span className="stat-num gradient-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        {/* ── Right: Bio text ── */}
        <Reveal direction="right" className="about-text">
          <span className="section-label">Get to know me</span>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>

          <p>
            I'm a Full Stack Developer specializing in the{' '}
            <span>MERN stack</span>, currently pursuing my B.Tech in
            Artificial Intelligence. I love turning complex problems into
            clean, elegant web experiences.
          </p>
          <p>
            Through internships at <span>Cognifyz Technologies</span> and{' '}
            <span>Internshala</span>, I've worked on real-world projects —
            from REST API design to full-stack apps with JWT authentication
            and database integration.
          </p>
          <p>
            I believe in writing code that's not just functional — but
            readable, scalable, and maintainable. Always learning, always
            building.
          </p>

          {/* Tag chips */}
          <div className="about-tags">
            {aboutTags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>

          {/* Resume download */}
          <a href={personalInfo.resumeUrl} download className="btn-primary"
             style={{ display: 'inline-flex' }}>
            Download Resume ↓
          </a>
        </Reveal>

      </div>
    </section>
  );
}
