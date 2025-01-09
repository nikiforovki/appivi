import React, { createContext, useState, useEffect, useContext } from 'react';
import { darkTheme, lightTheme, applyTheme } from '@/shared/utils/theme';
import { Theme } from '@/shared/utils/types';
import { ThemeContextType } from './types';

const initialContextValue: ThemeContextType = {
  theme: darkTheme,
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(initialContextValue);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setTheme(darkTheme);
    } else if (savedTheme === 'light') {
      setTheme(lightTheme);
    } else {
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setTheme(prefersDarkMode ? darkTheme : lightTheme);
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
