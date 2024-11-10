import React from 'react';
import styled from 'styled-components';

export const StyleBtn = styled.button`
  width: 50%;
  height: 20%;
  background-color: #6c63ff;
`;

const SimpleButton: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default SimpleButton;
