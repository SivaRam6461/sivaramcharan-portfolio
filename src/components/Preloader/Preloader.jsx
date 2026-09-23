/* ============================================================
   src/components/Preloader/Preloader.jsx
   Initial Loading Screen in Orange & White Theme
   ============================================================ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  'HELLO',
  'NAMASTE',
  'DESIGN',
  'ENGINEERING',
  'FULL STACK',
  'AI DEVELOPMENT',
  'AUTOMATION',
  'SAAS PRODUCTS',
  'SIVARAM CHARAN',
];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Word cycler + progress counter run on their own timers; both are
  // cleared by the effect cleanup on unmount (no side effects in updaters).
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev < WORDS.length - 1 ? prev + 1 : prev));
    }, 180);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 20);

    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // When progress hits 100, briefly hold then signal completion.
  useEffect(() => {
    if (progress < 100) return;
    const timer = setTimeout(() => onComplete?.(), 300);
    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#0b0c10] flex flex-col justify-between p-8 md:p-16 select-none font-mono"
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>SIVARAM CHARAN PORTFOLIO v2.0</span>
        </div>
        <span>{String(progress).padStart(3, '0')} %</span>
      </div>

      {/* Center Word Cycler */}
      <div className="my-auto flex flex-col items-center justify-center text-center space-y-4">
        <div className="h-16 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="font-head text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
            >
              {WORDS[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">
          INITIALIZING DIGITAL ENVIRONMENT
        </span>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full space-y-2">
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>LOCATION: INDIA</span>
          <span>SYSTEM READY</span>
        </div>
      </div>
    </motion.div>
  );
}