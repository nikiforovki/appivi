import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { LoginFormProps } from './types';

const StyledConteinerChatFormName = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 400px;
  height: auto;
  // background-color: rgba(116, 95, 250, 0.55);
  background-color: #745ffa8c;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-width: 300px;
`;

const StyledInputForm = styled.input`
  width: 100%;
  max-width: 300px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const StyledButtonForm = styled.button`
  width: 100%;
  max-width: 200px;
  height: 40px;
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
    <StyledConteinerChatFormName>
      <StyledCloseButton onClick={handleClose}>
        <FaTimes />
      </StyledCloseButton>
      <StyledInputForm
        type="email"
        value={userEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserEmail(e.target.value)
        }
        placeholder="Введите ваш email"
      />
      <StyledInputForm
        type="text"
        value={userName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserName(e.target.value)
        }
        placeholder="Введите ваше имя"
      />
      <StyledButtonForm onClick={handleSubmit}>Войти</StyledButtonForm>
    </StyledConteinerChatFormName>
  );
};

export default LoginForm;
