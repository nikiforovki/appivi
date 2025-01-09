import React from 'react';
import styled from 'styled-components';
import { FreeTrialButtonProps } from './types';

const StyledFreeTrialButtonWrapper = styled.button<{ $hideOnMobile?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 32px;
  border-radius: 8px;
  background-color: #f30745;
  color: white;
  font-family: 'HelveticaNeue', sans-serif;
  cursor: pointer;

  ${({ $hideOnMobile }) =>
    $hideOnMobile &&
    `
    @media (max-width: 1100px) {
      display: flex; 
    }
    @media (min-width: 1101px) {
      display: none;
    }
  `}

  ${({ $hideOnMobile }) =>
    !$hideOnMobile &&
    `
    @media (max-width: 1100px) {
      display: none; 
    }
    @media (min-width: 1101px) {
      display: flex; 
    }
  `}
`;

const FreeTrialButton: React.FC<FreeTrialButtonProps> = ({
  onClick,
  hideOnMobile,
}) => {
  return (
    <StyledFreeTrialButtonWrapper
      onClick={onClick}
      $hideOnMobile={hideOnMobile}
    >
      Смотреть 60 дней бесплатно
    </StyledFreeTrialButtonWrapper>
  );
};

export default FreeTrialButton;
