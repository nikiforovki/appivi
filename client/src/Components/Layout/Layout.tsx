import React from 'react';
import styled from 'styled-components';
import Header from '../Layout/Header';
import Main from '../Layout/Main';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #30, 33, 61;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #30, 33, 61;
`;

const Layout = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <Header />
        <Main />
      </ContentContainer>
    </PageContainer>
  );
};

export default Layout;
