import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import styled from 'styled-components';

const StyledSkeletonContainer = styled.div`
  margin-top: 50px;
`;

export const Skeleton1 = (props: IContentLoaderProps) => (
  <StyledSkeletonContainer>
    <ContentLoader
      speed={2}
      width={1200}
      height={500}
      viewBox="0 0 1200 500"
      backgroundColor="#c5c4c4"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="1200" height="500" />
    </ContentLoader>
  </StyledSkeletonContainer>
);

export const Skeleton2 = (props: IContentLoaderProps) => (
  <StyledSkeletonContainer>
    <ContentLoader
      speed={2}
      width={150}
      height={180}
      viewBox="0 0 200 300"
      backgroundColor="#c5c4c4"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="200" height="250" />
      <rect x="-1" y="260" rx="0" ry="0" width="199" height="20" />
      <rect x="0" y="290" rx="0" ry="0" width="197" height="28" />
    </ContentLoader>
  </StyledSkeletonContainer>
);
