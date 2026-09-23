/* ============================================================
   src/components/CustomCursor/CustomCursor.jsx
   Fluid Custom Cursor in Orange & White Theme
   ============================================================ */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], input, textarea, .cursor-pointer');
      
      if (clickable) {
        setCursorVariant('hover');
        if (target.closest('[data-cursor="view"]')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small trailing pointer dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-orange-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Outer fluid trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center font-mono text-[9px] font-bold tracking-widest text-orange-300 border border-orange-500/50 bg-orange-500/15 backdrop-blur-[2px]"
        animate={{
          x: mousePosition.x - (cursorVariant === 'hover' ? 24 : 16),
          y: mousePosition.y - (cursorVariant === 'hover' ? 24 : 16),
          width: cursorVariant === 'hover' ? 48 : 32,
          height: cursorVariant === 'hover' ? 48 : 32,
          scale: cursorVariant === 'hover' ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {cursorText}
      </motion.div>
    </>
  );
}
