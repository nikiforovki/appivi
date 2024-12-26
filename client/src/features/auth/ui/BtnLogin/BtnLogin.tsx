import React from 'react';
import styled from 'styled-components';
import UserIcon from '@/shared/assets/icons/UserIcon';
import { BtnLoginProps } from './types';

const BtnLoginWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background-color: #1f1b2e;
  border-radius: 8px;
  color: whitesmoke;
  gap: 10px;
  border: 1px solid #1f1b2e;
  box-shadow: 0 2px 4px #1f1b2e;
  cursor: pointer;
  font-family: 'HelveticaNeue', sans-serif;

  // @media (max-width: 680px) {
  //   display: none;
  // }
`;

const UserBtn = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: rgba(108, 99, 255, 0.05);
  border: 2px solid rgba(108, 99, 255, 0.04);
`;

const BtnLogin: React.FC<BtnLoginProps> = ({ onClick }) => {
  return (
    <BtnLoginWrapper onClick={onClick}>
      <UserBtn>
        <UserIcon />
      </UserBtn>
      Войти
    </BtnLoginWrapper>
  );
};

export default BtnLogin;
