import styled from 'styled-components';

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 350px;
  position: relative;
`;

export const StyledModalTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const StyledFormGroup = styled.div`
  margin-bottom: 15px;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const StyledInput = styled.input`
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledLoader = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #007bff;
`;

export const StyledErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  padding: 10px;
`;

export const StyledCloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: black;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
