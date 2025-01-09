import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatSupport from '@features/chat-support';

const StyledButton = styled.button`
  height: 40px;
  width: 196px;
  color: white;
  margin-top: 20px;
  background-color: #1f1b2e;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #35304a;
  }
`;

const BtnChatUsers = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const navigate = useNavigate();

  const toggleChat = () => {
    if (isChatVisible) {
      setIsChatVisible(false);
    } else {
      navigate('/chatSupport');
    }
  };

  return (
    <div>
      <StyledButton onClick={toggleChat}>
        {isChatVisible ? 'Закрыть чат' : 'Написать в чат'}
      </StyledButton>
      {isChatVisible && <ChatSupport />}
    </div>
  );
};

export default BtnChatUsers;
