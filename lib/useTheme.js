'use client';
import { useState, useEffect } from 'react';

/**
 * useTheme
 * Mirrors the real YLH site's theme system: body gets class
 * "light-mode" or no class (dark is default, no class needed
 * since :root already defines dark values).
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('ylh_theme');
    const dark = saved !== 'light';
    setIsDark(dark);
    document.body.classList.toggle('light-mode', !dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.body.classList.toggle('light-mode', !next);
    localStorage.setItem('ylh_theme', next ? 'dark' : 'light');
  };

  return { isDark, toggleTheme };
}
