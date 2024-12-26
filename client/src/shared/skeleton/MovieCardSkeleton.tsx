import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StyledCard = styled.div`
  width: 150px;
  height: 200px;
  background: linear-gradient(to right, #333 8%, #444 18%, #333 33%);
  border-radius: 15px;
  overflow: hidden;
  margin: 10px;

  @media (max-width: 768px) {
    width: 100px;
    height: 50px;
  }
`;

const MovieCardSkeleton: React.FC = () => {
  return (
    <StyledCard>
      <Skeleton height={60} />
      <Skeleton width="70%" style={{ marginBottom: '10px' }} />
      <Skeleton width="50%" style={{ marginBottom: '10px' }} />
    </StyledCard>
  );
};

export default MovieCardSkeleton;
