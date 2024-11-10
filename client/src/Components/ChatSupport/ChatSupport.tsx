import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, addMessage, setMessages } from '../../Redux/slices/chatSlice';
import LoginForm from './LoginForm';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const socket = io('http://127.0.0.1:5100');

const ConteinerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ChatContainer = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  background-color: #e9dbff;
  border-radius: 20px;
  padding: 10px;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: black;
  cursor: pointer;
`;

interface Message {
  id: number;
  sender: string;
  message: string;
}

interface ChatState {
  messages: Message[];
  email: string;
  name: string;
}

const ChatSupport: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { messages, email, name } = useSelector(
    (state: { chat: ChatState }) => state.chat,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (email && name) {
      dispatch(
        setMessages([
          {
            id: 0,
            sender: 'support',
            message: 'Добро пожаловать! Чем мы можем вам помочь?',
          },
        ]),
      );
      fetch('http://127.0.0.1:5100/api/chat')
        .then((response) => response.json())
        .then((data) => dispatch(setMessages([...messages, ...data.chats])));

      socket.on('newMessage', (newChat: Message) => {
        console.log('New message received:', newChat);
        dispatch(addMessage(newChat));
      });

      return () => {
        socket.off('newMessage');
      };
    }
  }, [email, name, dispatch]);

  const handleLogin = () => {
    if (userEmail.trim() === '' || userName.trim() === '') return;
    dispatch(setUser({ email: userEmail, name: userName }));
  };

  const handleClose = () => {
    navigate('/');
  };

  const sendMessage = () => {
    if (isFileSelected) {
      sendFile();
    } else {
      if (newMessage.trim() === '') return;

      fetch('http://127.0.0.1:5100/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          sender: 'user',
          email: email,
          name: name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setNewMessage('');
        });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setIsFileSelected(true);
    }
  };

  const sendFile = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('sender', 'user');
    formData.append('email', email);
    formData.append('name', name);

    fetch('http://127.0.0.1:5100/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedFile(null);
        setIsFileSelected(false);
      });
  };

  const handleAudioRecorded = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recorded-audio.wav');
    formData.append('sender', 'user');
    formData.append('email', email);
    formData.append('name', name);

    try {
      const response = await fetch('http://127.0.0.1:5100/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Audio uploaded successfully:', data);
      } else {
        console.error('Failed to upload audio:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  if (!email || !name) {
    return (
      <ConteinerStyled>
        <LoginForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
          handleLogin={handleLogin}
        />
      </ConteinerStyled>
    );
  }

  return (
    <ConteinerStyled>
      <ChatContainer>
        <StyledCloseButton onClick={handleClose}>
          <FaTimes />
        </StyledCloseButton>
        <Messages messages={messages} email={email} name={name} />
        <div ref={messagesEndRef} />
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          handleFileChange={handleFileChange}
          handleAudioRecorded={handleAudioRecorded}
        />
      </ChatContainer>
    </ConteinerStyled>
  );
};

export default ChatSupport;
