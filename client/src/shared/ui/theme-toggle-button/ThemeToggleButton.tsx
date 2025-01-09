import React from 'react';
import styled from 'styled-components';
import { toggleTheme } from '@shared/toggle-theme';
import { useTheme } from '@shared/use-theme';
import { Theme } from '../../utils/types';

const StyledButton = styled.button<{ theme: Theme }>`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <StyledButton theme={theme} onClick={() => toggleTheme(theme, setTheme)}>
      Переключить тему
    </StyledButton>
  );
};

export default ThemeToggleButton;
