/* ============================================================
   components/Reveal/Reveal.jsx
   Framer Motion scroll-reveal primitives, replacing the old
   IntersectionObserver + CSS-class approach (useScrollReveal).

   <Reveal>            — single element fade/slide-in on scroll
   <RevealGroup>        — stagger container; wrap <Reveal> children
                           and they'll animate in sequence
   ============================================================ */

import { motion } from 'framer-motion';

const DIRECTIONS = {
  up:    { hidden: { opacity: 0, y: 30 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 30 },  visible: { opacity: 1, x: 0 } },
};

const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -60px 0px' };

/**
 * Single reveal element. Use inside a <RevealGroup> for staggered
 * sequences, or standalone for a one-off fade/slide-in.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  as = 'div',
  ...rest
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      variants={DIRECTIONS[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Stagger container — animates its Reveal/RevealItem children in
 * sequence as the group enters the viewport.
 */
export function RevealGroup({ children, className = '', stagger = 0.12, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ staggerChildren: stagger }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside <RevealGroup> — inherits stagger timing from the parent. */
export function RevealItem({ children, direction = 'up', duration = 0.5, className = '', as = 'div', ...rest }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      variants={DIRECTIONS[direction]}
      transition={{ duration, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </Component>
  );
}
