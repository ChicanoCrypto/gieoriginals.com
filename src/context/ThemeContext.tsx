import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('gie-theme') as Theme;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('gie-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS variables based on theme
    if (theme === 'light') {
      document.documentElement.style.setProperty('--bg-primary', '#F2F2F0');
      document.documentElement.style.setProperty('--bg-secondary', '#FFFFFF');
      document.documentElement.style.setProperty('--text-primary', '#0B0B0C');
      document.documentElement.style.setProperty('--text-secondary', '#5A5A5A');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#0B0B0C');
      document.documentElement.style.setProperty('--bg-secondary', '#1a1a1a');
      document.documentElement.style.setProperty('--text-primary', '#F6F6F6');
      document.documentElement.style.setProperty('--text-secondary', '#B8B8B8');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
