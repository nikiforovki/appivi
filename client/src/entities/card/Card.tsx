import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SkeletonCard from '@shared/skeleton-card';
import { CardProps } from './types';

const StyledCardWrapper = styled.div`
  max-width: 1200px;
  height: 500px;
  color: white;
  margin: 40px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 6px #0000001a;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const StyledCardImage = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Card: React.FC<CardProps> = ({ title, img, subscription }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      setIsLoading(false);
    };

    return () => {
      image.onload = null;
    };
  }, [img]);

  return (
    <StyledCardWrapper>
      {isLoading ? <SkeletonCard /> : <StyledCardImage src={img} alt={title} />}
    </StyledCardWrapper>
  );
};

export default Card;
