/* ============================================================
   components/Preloader/Preloader.jsx
   Hides as soon as the page has actually finished loading
   (window 'load' event), with a small minimum display time so
   it never just flashes, and a safety fallback in case 'load'
   is slow or never fires. Calls onDone() once fully hidden so
   the parent can mount the rest of the app.
   ============================================================ */

import { useState, useEffect } from 'react';
import './Preloader.css';

const MIN_DISPLAY_MS = 500;   // avoid a jarring flash on fast loads
const FADE_MS = 600;          // must match the CSS transition duration
const MAX_WAIT_MS = 4000;     // safety net if 'load' never fires

export default function Preloader({ onDone }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const elapsed = performance.now() - start;
      const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);
      setTimeout(() => {
        setHidden(true);
        setTimeout(() => onDone?.(), FADE_MS);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }

    const fallback = setTimeout(finish, MAX_WAIT_MS);

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(fallback);
    };
  }, [onDone]);

  return (
    <div
      className={`preloader ${hidden ? 'hide' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      aria-hidden={hidden}
    >
      {/* Spinning rings with initials in center */}
      <div className="loader-ring">
        <div className="loader-initials gradient-text">SRC</div>
      </div>

      {/* Indeterminate progress bar — real load time isn't measurable, so this loops instead of faking a fixed duration */}
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}
