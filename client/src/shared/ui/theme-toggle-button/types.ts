import { Theme } from '@/shared/utils/types';

export interface ThemeToggleButtonProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
