import React from 'react';
import styled from 'styled-components';
import { CardProps } from './types';

const StyledCardWrapper = styled.div`
  width: 150px;
  height: 250px;
  color: white;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 6px #0000001a;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: 375px) and (max-width: 480px) {
    margin-left: 100px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    margin-left: 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    margin-left: 10px;
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    margin-left: 10px;
  }

  @media (min-width: 1280px) and (max-width: 1366px) {
    margin-left: 10px;
  }

  @media (min-width: 1366px) and (max-width: 1920px) {
    margin-left: 10px;
  }

  @media (min-width: 1920px) {
    margin-left: 10px;
  }
`;

const StyledCardImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const StyledCardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

const StyledCardSubscription = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  color: red;
`;

const Card2: React.FC<CardProps> = ({ title, img, subscription }) => {
  return (
    <StyledCardWrapper>
      <StyledCardImage src={img} alt={title} />
      <StyledCardTitle>{title}</StyledCardTitle>
      <StyledCardSubscription>{subscription}</StyledCardSubscription>
    </StyledCardWrapper>
  );
};

export default Card2;
