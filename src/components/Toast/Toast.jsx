/* ============================================================
   components/Toast/Toast.jsx
   Small reusable toast notification. Controlled by the parent —
   pass `show`, `message`, and `onClose`. Auto-dismisses after
   `duration` ms (default 4s).

   Purely a visual affordance — marked aria-hidden so it doesn't
   double up with whatever accessible confirmation (e.g. an
   aria-live status region) the calling component already shows.
   ============================================================ */

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Toast.css';

export default function Toast({ show, message, onClose, duration = 4000, type = 'success' }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  return (
    <div className="toast-region" aria-hidden="true">
      <AnimatePresence>
        {show && (
          <motion.div
            className={`toast toast-${type}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span className="toast-icon" aria-hidden="true">{type === 'success' ? '✓' : '⚠'}</span>
            <span className="toast-message">{message}</span>
            <button className="toast-close" onClick={onClose} aria-label="Dismiss notification">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
