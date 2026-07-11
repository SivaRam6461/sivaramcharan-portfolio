/* ============================================================
   main.jsx  —  Application entry point
   Wraps <App> in ThemeProvider so every component can access
   isDark / toggleTheme via the useTheme() hook.
   ============================================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

// Global CSS — variables, resets, utility classes, animations
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
