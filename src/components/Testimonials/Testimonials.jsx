/* ============================================================
   components/Testimonials/Testimonials.jsx
   Client/colleague reviews with a star rating each. Renders
   nothing at all while `testimonials` in portfolioData.js is
   empty — the section and its nav link only appear once real
   entries are added there.
   ============================================================ */

import { Reveal, RevealGroup, RevealItem } from '../Reveal/Reveal';
import { testimonials } from '../../data/portfolioData';
import './Testimonials.css';

function StarRating({ rating }) {
  return (
    <div className="star-rating" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'star filled' : 'star'} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

function initialsOf(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials">
      <div className="section">

        <Reveal style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 8px' }}>
          <span className="section-label">What people say</span>
          <h2 className="section-title">
            Client <span className="gradient-text">Reviews</span>
          </h2>
        </Reveal>

        <RevealGroup className="testimonials-grid">
          {testimonials.map((t) => (
            <RevealItem className="testimonial-card" key={t.id}>
              {typeof t.rating === 'number' && <StarRating rating={t.rating} />}

              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>

              <div className="testimonial-author">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" loading="lazy" />
                ) : (
                  <div className="testimonial-avatar testimonial-initials" aria-hidden="true">
                    {initialsOf(t.name)}
                  </div>
                )}
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">
                    {t.role}{t.company ? ` · ${t.company}` : ''}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

      </div>
    </section>
  );
}
