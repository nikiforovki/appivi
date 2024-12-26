import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StyledSkeletonWrapper = styled.div`
  max-width: 1200px;
  height: 500px;
  color: white;
  margin: 40px;
  overflow: hidden;
  border-radius: 30px;
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

const SkeletonCard: React.FC = () => {
  return (
    <StyledSkeletonWrapper>
      <Skeleton height="100%" />
    </StyledSkeletonWrapper>
  );
};

export default SkeletonCard;
