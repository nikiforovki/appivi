import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import MediaDisplay from './MediaDisplay';

const MessagesContainer = styled.div`
  height: 400px;
  overflow-y: scroll;
  margin-bottom: 10px;
  margin-top: 40px;
`;

const Message = styled.div<{ sender: string }>`
  width: 400px;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.sender === 'user' ? 'rgba(255,252,252,0.83)' : '#ffffff'};
  margin-left: ${(props) => (props.sender === 'user' ? 'auto' : '0')};
  margin-right: ${(props) => (props.sender === 'user' ? '0' : 'auto')};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

interface MessageItem {
  id: number;
  sender: string;
  message: string;
  type?: string;
}

interface MessagesProps {
  messages: MessageItem[];
  email: string;
  name: string;
}

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
    <MessagesContainer ref={messagesContainerRef}>
      {messages.map((message) => (
        <Message key={message.id} sender={message.sender}>
          <strong>
            {message.sender === 'user' ? `${name} (${email})` : 'Техподдержка'}:
          </strong>{' '}
          {message.type === 'file' ? (
            <MediaDisplay filename={message.message} />
          ) : (
            message.message
          )}
        </Message>
      ))}
    </MessagesContainer>
  );
};

export default Messages;
