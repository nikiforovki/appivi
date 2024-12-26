import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 50px;
  background-color: #1e213d;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const StyledContent = styled.main`
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledFormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px #0000001a;
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
`;

export const StyledFormTitle = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const StyledFormInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const StyledFormButton = styled.button`
  width: 80%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

export const StyledPasswordContainer = styled.div`
  position: relative;
`;

export const ShowPasswordButton = styled.button`
  position: absolute;
  right: 20px;
  top: 40%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 18px;
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: none;
  }
`;
