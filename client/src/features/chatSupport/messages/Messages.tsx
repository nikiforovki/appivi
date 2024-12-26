import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import MediaDisplay from '../mediaDisplay/MediaDisplay';
import { MessagesProps } from './types';

const StyledMessagesContainer = styled.div`
  height: 400px;
  overflow-y: scroll;
  margin-bottom: 10px;
  margin-top: 40px;
`;

const StyledMessage = styled.div<{ sender: string }>`
  width: 400px;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.sender === 'user' ? '#6e6c6c' : '#6e6c6c'}; /* Используем hex */
  margin-left: ${(props) => (props.sender === 'user' ? 'auto' : '0')};
  margin-right: ${(props) => (props.sender === 'user' ? '0' : 'auto')};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

// const Message = styled.div<{ sender: string }>`
//   width: 400px;
//   margin-bottom: 5px;
//   padding: 10px;
//   border-radius: 10px;
//   background-color: ${(props) =>
//     props.sender === 'user' ? 'rgb(110,108,108)' : '#6e6c6c'};
//   margin-left: ${(props) => (props.sender === 'user' ? 'auto' : '0')};
//   margin-right: ${(props) => (props.sender === 'user' ? '0' : 'auto')};
//   white-space: pre-wrap;
//   word-wrap: break-word;
// `;

const Messages: React.FC<MessagesProps> = ({ messages, email, name }) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const lastMessage = messagesContainerRef.current.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  return (
    <StyledMessagesContainer ref={messagesContainerRef}>
      {messages.map((message) => (
        <StyledMessage key={message.id} sender={message.sender}>
          <strong>
            {message.sender === 'user' ? `${name} (${email})` : 'Техподдержка'}:
          </strong>{' '}
          {message.type === 'file' ? (
            <MediaDisplay filename={message.message} />
          ) : (
            message.message
          )}
        </StyledMessage>
      ))}
    </StyledMessagesContainer>
  );
};

export default Messages;
