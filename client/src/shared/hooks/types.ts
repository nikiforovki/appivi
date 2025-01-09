export interface ThemeContextType {
  theme: any;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
