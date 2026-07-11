/* ============================================================
   components/ScrollProgress/ScrollProgress.jsx
   Thin fixed bar at the very top showing how far down the page
   the visitor has scrolled. Uses Framer Motion's scroll tracking
   + a spring for a smooth (not jumpy) fill.
   ============================================================ */

import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
