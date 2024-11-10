import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ConteinerStyledChatFormName = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 200px;
  background-color: rgba(116, 95, 250, 0.55);
  border-radius: 20px;
  bottom: 20px;
`;

const InputStyledForm = styled.input`
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const ButtonStyledForm = styled.button`
  width: 200px;
  height: 30px;
  background-color: #1f1b2e;
  border-radius: 10px;
  color: rgba(253, 253, 253, 0.76);
  cursor: pointer;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

interface LoginFormProps {
  userEmail: string;
  setUserEmail: (email: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  handleLogin: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  userEmail,
  setUserEmail,
  userName,
  setUserName,
  handleLogin,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userName) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    handleLogin();
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <ConteinerStyledChatFormName>
      <StyledCloseButton onClick={handleClose}>
        <FaTimes />
      </StyledCloseButton>
      <InputStyledForm
        type="email"
        value={userEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserEmail(e.target.value)
        }
        placeholder="Введите ваш email"
      />
      <InputStyledForm
        type="text"
        value={userName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserName(e.target.value)
        }
        placeholder="Введите ваше имя"
      />
      <ButtonStyledForm onClick={handleSubmit}>Войти</ButtonStyledForm>
    </ConteinerStyledChatFormName>
  );
};

export default LoginForm;
