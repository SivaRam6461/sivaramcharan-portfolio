/* ============================================================
   src/utils/scroll.js
   Single source of truth for programmatic scrolling.
   Every component navigates through Lenis when available, and
   falls back to native smooth scroll when it isn't (e.g. SSR,
   initial mount before Lenis initialises).

   Scroll subscription supports multiple listeners (Set-based);
   the Lenis handler is bound once per instance and fans out.
   ============================================================ */

let lenisInstance = null;
let boundInstance = null;
const scrollCallbacks = new Set();

const flush = (opts) => {
  scrollCallbacks.forEach((cb) => {
    try {
      cb(opts);
    } catch (err) {
      /* a broken listener must not break the others */
    }
  });
};

const bindInstance = () => {
  if (lenisInstance && boundInstance !== lenisInstance) {
    boundInstance = lenisInstance;
    lenisInstance.on('scroll', flush);
  }
};

export const setLenis = (instance) => {
  lenisInstance = instance;
  if (instance) {
    bindInstance();
  } else {
    boundInstance = null;
  }
};

export const getLenis = () => lenisInstance;

/* Register a scroll listener. Returns an unsubscribe function.
   Safe to call before Lenis initialises (children effects run
   before the root's) — the callback is queued in the Set and
   picked up when setLenis() binds the instance. */
export const onLenisScroll = (callback) => {
  scrollCallbacks.add(callback);
  bindInstance();
  return () => scrollCallbacks.delete(callback);
};

export const triggerLenisScroll = (scrollProgress) => {
  flush({ progress: scrollProgress });
};

const NAV_OFFSET = -80; // fixed navbar height

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: NAV_OFFSET, duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollToTop = () => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.1 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Lock body scroll while an overlay/modal is open. Stops Lenis so the
// background can't scroll behind a fixed-position dialog.
export const lockScroll = () => {
  if (lenisInstance) lenisInstance.stop();
  document.body.style.overflow = 'hidden';
};

export const unlockScroll = () => {
  document.body.style.overflow = '';
  if (lenisInstance) lenisInstance.start();
};
