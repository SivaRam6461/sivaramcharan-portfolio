/* ============================================================
   context/ThemeContext.jsx
   Provides isDark boolean + toggleTheme() to the whole app.
   Reads / saves preference in localStorage.
   ============================================================ */

import { createContext, useContext, useState, useEffect } from 'react';

// Default value prevents undefined errors if used outside provider
const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  // Initialise from localStorage, fallback to dark
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('sc-theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    // Apply or remove .light class on <body>
    document.body.classList.toggle('light', !isDark);
    try {
      localStorage.setItem('sc-theme', isDark ? 'dark' : 'light');
    } catch { /* ignore */ }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Named hook — call useTheme() in any component to access theme
export function useTheme() {
  return useContext(ThemeContext);
}
