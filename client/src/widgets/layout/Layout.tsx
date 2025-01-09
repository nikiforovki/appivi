import React from 'react';
import styled from 'styled-components';
import Header from '@widgets/header';
import Main from '@widgets/main';

const StyledPageContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #30, 33, 61;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
`;

const Layout = () => {
  return (
    <StyledPageContainer>
      <StyledContentContainer>
        <Header />
        <Main />
      </StyledContentContainer>
    </StyledPageContainer>
  );
};

export default Layout;
