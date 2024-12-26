export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
