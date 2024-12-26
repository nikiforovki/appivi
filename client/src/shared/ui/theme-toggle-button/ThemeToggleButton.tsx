import React from 'react';
import styled from 'styled-components';
import { toggleTheme } from '@/shared/utils/theme';
import { useTheme } from '@/shared/context/ThemeContext';

const StyledButton = styled.button`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <StyledButton onClick={() => toggleTheme(theme, setTheme)}>
      Переключить тему
    </StyledButton>
  );
};

export default ThemeToggleButton;
