/* ============================================================
   components/Experience/Experience.jsx
   Vertical animated timeline showing internships + education.
   Data is pulled from portfolioData.js — add entries there.
   ============================================================ */

import { Reveal, RevealGroup, RevealItem } from '../Reveal/Reveal';
import { experience } from '../../data/portfolioData';
import './Experience.css';

/* ── Single timeline card ── */
function TimelineItem({ item }) {
  return (
    <RevealItem className="timeline-item">
      <div className="timeline-card">

        {/* Top row: role/company on left, period/badge on right */}
        <div className="timeline-top">
          <div>
            <div className="timeline-role">{item.role}</div>
            <div className="timeline-company">{item.company}</div>
          </div>
          <div className="timeline-meta">
            <span className="timeline-period">{item.period}</span>
            {/* Badge colour changes based on type */}
            <span className={`timeline-type-badge ${
              item.type === 'education' ? 'type-education' : 'type-internship'
            }`}>
              {item.type === 'education' ? '🎓 Education' : '💼 Internship'}
            </span>
          </div>
        </div>

        {/* Description paragraph */}
        <p className="timeline-desc">{item.description}</p>

        {/* Skill tags row */}
        <div className="timeline-skills">
          {item.skills.map((skill) => (
            <span className="tag" key={skill}>{skill}</span>
          ))}
        </div>

      </div>
    </RevealItem>
  );
}

/* ── Section ── */
export default function Experience() {
  return (
    <section id="experience">
      <div className="section">

        {/* Section header */}
        <Reveal style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 8px' }}>
          <span className="section-label">Where I've been</span>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
        </Reveal>

        {/* Timeline entries */}
        <RevealGroup className="timeline" stagger={0.15}>
          {experience.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </RevealGroup>

      </div>
    </section>
  );
}
