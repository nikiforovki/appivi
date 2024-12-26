import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 300px;
  background-color: #090629df;
  border: 2px solid #ffffff6e;
  border-radius: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTitle = styled.h2`
  color: white;
  font-size: 34px;
`;

export const StyledFormWrapper = styled.div`
  margin-left: 50px;
  max-width: 450px;
`;

export const StyledInput = styled.input`
  width: 80%;
  margin-bottom: 20px;
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 5px;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white;
  }
`;

export const StyledEmailInput = styled(StyledInput)`
  margin-right: 10px;
`;

export const StyledPasswordInput = styled(StyledInput)`
  margin-right: 10px;
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

export const StyledSignInButton = styled.button`
  width: 80%;
  height: 40px;
  background-color: #009688;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

export const StyledRegistrationText = styled.div`
  font-size: 16px;
  color: #6e6c6c;
  margin-top: 20px;
  margin-bottom: 30px;
  cursor: pointer;

  &:hover {
    color: #fdfdfd;
    text-decoration: underline;
  }
`;
