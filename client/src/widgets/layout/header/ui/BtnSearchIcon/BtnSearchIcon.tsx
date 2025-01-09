import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@shared/search-icon';
import IconComponent from '@shared/icon-component';
import { BtnSearchIconProps } from './types';

const StyledBtnSearchIconWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 130px;
  height: 40px;
  background-color: #1f1b2e;
  border-radius: 8px;
  color: whitesmoke;
  border: 1px solid #1f1b2e;
  box-shadow: 0 2px 4px #1f1b2e;
  cursor: pointer;
  font-family: 'HelveticaNeue', sans-serif;
`;

const BtnSearchIcon: React.FC<BtnSearchIconProps> = ({ onClick }) => {
  return (
    <StyledBtnSearchIconWrapper onClick={onClick}>
      <SearchIcon />
      Поиск
      <IconComponent />
    </StyledBtnSearchIconWrapper>
  );
};

export default BtnSearchIcon;
