import React from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { StyledArrowButton } from './ArrowButton';
import { StyledArrowIcon } from './ArrowIcon';

export const NextArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <StyledArrowButton onClick={onClick} style={{ right: '0' }}>
      <StyledArrowIcon>
        <SlArrowRight />
      </StyledArrowIcon>
    </StyledArrowButton>
  );
};
