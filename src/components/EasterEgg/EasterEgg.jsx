/* ============================================================
   components/EasterEgg/EasterEgg.jsx
   Two small easter eggs for recruiters/developers who poke around:
   1. A styled console message for anyone who opens devtools.
   2. The Konami code (↑↑↓↓←→←→BA) triggers a confetti burst.
   ============================================================ */

import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import Toast from '../Toast/Toast';
import './EasterEgg.css';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const CONFETTI_COLORS = ['var(--cyan)', 'var(--purple)', 'var(--pink)', 'var(--green)'];
const CONFETTI_COUNT = 60;

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 2.5 + Math.random() * 1.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 6 + Math.random() * 6,
      rotate: Math.random() * 360,
    }))
  );

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.size,
            height: p.size * 0.4,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function EasterEgg() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);

  /* Console message for curious developers/recruiters */
  useEffect(() => {
    const styles = [
      'color: #00f5ff; font-weight: bold; font-size: 14px;',
      'color: #94a3b8; font-size: 12px;',
      'color: #a855f7; font-weight: bold; font-size: 12px;',
    ];
    console.log('%cLooking under the hood? I like that.', styles[0]);
    console.log(
      '%cHi, I\'m Sivaram — this portfolio is built with React + Vite, hand-written CSS, and Framer Motion.',
      styles[1]
    );
    console.log(`%cLet's talk: ${personalInfo.email}`, styles[2]);
  }, []);

  /* Konami code listener */
  useEffect(() => {
    let progress = 0;

    const onKeyDown = (e) => {
      const expected = KONAMI_SEQUENCE[progress];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (key === expected) {
        progress += 1;
        if (progress === KONAMI_SEQUENCE.length) {
          setShowConfetti(true);
          setShowToast(true);
          setTimeout(() => setShowConfetti(false), 4000);
          progress = 0;
        }
      } else {
        progress = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <Toast
        show={showToast}
        message="Konami code unlocked! You clearly read the source — let's talk."
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
