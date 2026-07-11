/* ============================================================
   hooks/useTypewriter.js
   Cycles through an array of words with a typing + deleting
   animation. Returns the current visible string.

   Usage:
     const text = useTypewriter(['React Dev', 'MERN Engineer']);
   ============================================================ */

import { useState, useEffect } from 'react';

export default function useTypewriter(words, typingSpeed = 85, deletingSpeed = 45, pauseMs = 1600) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Still typing the current word
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        // Finished typing — start pause then delete
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        // Deleting characters
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        // Finished deleting — move to next word
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return text;
}
