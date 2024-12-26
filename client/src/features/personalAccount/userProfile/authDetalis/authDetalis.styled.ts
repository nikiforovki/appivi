import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 50px;
  background-color: var(--background-color);
  color: #090629;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 1000;
  background-color: var(--background-color);
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledUserInfo = styled.div`
  font-weight: bold;
  color: var(--text-color);
  font-size: 20px;
`;

export const StyledSubscription = styled.div`
  font-weight: bold;
  color: var(--text-color);
  font-size: 20px;
  margin-top: 20px;
`;

export const StyledChooseSubscription = styled.div`
  font-weight: bold;
  color: var(--text-color);
  font-size: 20px;
`;

export const StyledContent = styled.main`
  flex: 1;
  padding-top: 60px;
`;

export const StyledSubscribeButton = styled.button`
  background-color: var(--primary-color);
  width: 200px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

export const StyledLogoButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: none;
  }
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: none;
  }
`;
