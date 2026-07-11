/* ============================================================
   components/Skills/Skills.jsx
   Displays skill categories as animated glassmorphism cards.
   Each card shows a top-border hover animation.
   ============================================================ */

import { Reveal, RevealGroup, RevealItem } from '../Reveal/Reveal';
import { skills } from '../../data/portfolioData';
import './Skills.css';

export default function Skills() {
  return (
    <section id="skills">
      <div className="section">

        {/* Section header */}
        <Reveal style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 8px' }}>
          <span className="section-label">What I work with</span>
          <h2 className="section-title">
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </Reveal>

        {/* Skill category cards */}
        <RevealGroup className="skills-grid">
          {skills.map((cat) => (
            <RevealItem className="skill-card" key={cat.id}>
              {/* Icon + category label */}
              <div className="skill-card-head">
                <span className="skill-icon">{cat.icon}</span>
                <span className="skill-cat">{cat.category}</span>
              </div>

              {/* Skill pills */}
              <div className="skill-pills">
                {cat.items.map((item) => (
                  <span className="skill-pill" key={item}>{item}</span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Currently learning strip */}
        <Reveal className="skills-footer">
          <span>Currently exploring:</span> TypeScript · Next.js · Docker · AWS
        </Reveal>

      </div>
    </section>
  );
}
