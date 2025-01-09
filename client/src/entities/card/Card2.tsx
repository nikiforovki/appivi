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
`;

const StyledCardImage = styled.img`
  width: 100%;
  height: 70%;
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
