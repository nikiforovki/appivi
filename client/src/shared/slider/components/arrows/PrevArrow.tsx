import React from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { StyledArrowButton } from './ArrowButton';
import { StyledArrowIcon } from './ArrowIcon';

export const PrevArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <StyledArrowButton onClick={onClick} style={{ left: '0' }}>
      <StyledArrowIcon>
        <SlArrowLeft />
      </StyledArrowIcon>
    </StyledArrowButton>
  );
};
