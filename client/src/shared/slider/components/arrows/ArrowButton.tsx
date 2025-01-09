import styled from 'styled-components';

export const StyledArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  cursor: pointer;
  z-index: 10;
  border: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  outline: none;
  box-shadow: none;
  user-select: none;

  &:active {
    background: none;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
