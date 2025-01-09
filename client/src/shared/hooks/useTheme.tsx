import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeContextType, ThemeProviderProps } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

const darkTheme = {
  background: 'rgb(30, 33, 61)',
  text: '#fff',
  primary: '#6c63ff',
  secondary: '#333',
};

const lightTheme = {
  background: '#D3D3D3',
  text: '#333',
  primary: '#8a8aff',
  secondary: '#f0f0f0',
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme ? JSON.parse(savedTheme) : darkTheme;
  });

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setTheme(prefersDarkMode ? darkTheme : lightTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('appTheme', JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
