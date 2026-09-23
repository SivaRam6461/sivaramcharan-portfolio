import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../utils/scroll';

export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const lenis = new Lenis({
      duration: 1.1,
      // Softer ease-in-out: long expo ease above feels like the page
      // "sticks" then lurches when many scroll listeners also run.
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: !prefersReducedMotion,
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      autoRaf: true,
    });

    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);
}
