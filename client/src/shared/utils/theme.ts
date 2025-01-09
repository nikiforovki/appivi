import { Theme } from './types';

export const darkTheme: Theme = {
  background: '#1E213D',
  text: '#fff',
  primary: '#6c63ff',
  secondary: '#333',
};

export const lightTheme: Theme = {
  background: '#D3D3D3',
  text: '#0a0909',
  primary: '#8a8aff',
  secondary: '#f0f0f0',
};

export const toggleTheme = (
  currentTheme: Theme,
  setTheme: (theme: Theme) => void,
) => {
  const newTheme = currentTheme === darkTheme ? lightTheme : darkTheme;
  setTheme(newTheme);

  document.body.classList.toggle('dark-mode', newTheme === darkTheme);
  document.body.classList.toggle('light-mode', newTheme !== darkTheme);

  localStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
};

export const applyTheme = (theme: Theme) => {
  document.body.classList.toggle('dark-mode', theme === darkTheme);
  document.body.classList.toggle('light-mode', theme !== darkTheme);
};
