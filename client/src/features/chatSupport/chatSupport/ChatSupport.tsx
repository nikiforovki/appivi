import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, addMessage, setMessages } from '@/app/redux/slices/chatSlice';
import LoginForm from '../loginForm/LoginForm';
import Messages from '../messages/Messages';
import MessageInput from '../messageInput/MessageInput';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { Message, ChatState } from './types';

const socketUrl = process.env.REACT_APP_SOCKET_URL;
const apiUrl = process.env.REACT_APP_API_URL;
const uploadUrl = process.env.REACT_APP_UPLOAD_URL;

if (!socketUrl) {
  throw new Error('REACT_APP_SOCKET_URL is not defined');
}
if (!apiUrl) {
  throw new Error('REACT_APP_API_URL is not defined');
}
if (!uploadUrl) {
  throw new Error('REACT_APP_UPLOAD_URL is not defined');
}

const socket = io(socketUrl);

const StyledConteiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledChatContainer = styled.div`
  position: relative;
  width: 90vw;
  height: 600px;
  background-color: #e9dbff;
  border-radius: 20px;
  padding: 10px;

  @media (min-width: 768px) {
    width: 75vw;
  }

  @media (min-width: 1024px) {
    width: 66.67vw;
  }

  @media (min-width: 1280px) {
    width: 58.33vw;
  }

  @media (min-width: 1536px) {
    width: 50vw;
  }

  @media (min-width: 1920px) {
    width: 45vw;
  }
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
      fetch(`${apiUrl}/chat`)
        .then((response) => response.json())
        .then((data) => dispatch(setMessages([...messages, ...data.chats])))
        .catch((error) =>
          console.error('Error fetching chat messages:', error),
        );

      socket.on('newMessage', (newChat: Message) => {
        console.log('New message received:', newChat);
        dispatch(addMessage(newChat));
      });

      return () => {
        socket.off('newMessage');
      };
    }
  }, [email, name, dispatch]);

  const handleLogin = useCallback(() => {
    if (userEmail.trim() === '' || userName.trim() === '') return;
    dispatch(setUser({ email: userEmail, name: userName }));
  }, [userEmail, userName, dispatch]);

  const handleClose = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const sendMessage = useCallback(() => {
    if (isFileSelected) {
      sendFile();
    } else {
      if (newMessage.trim() === '') return;

      fetch(`${apiUrl}/chat`, {
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
        })
        .catch((error) => console.error('Error sending message:', error));
    }
  }, [isFileSelected, newMessage, email, name]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setSelectedFile(event.target.files[0]);
        setIsFileSelected(true);
      }
    },
    [],
  );
  const sendFile = useCallback(() => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    if (email !== null && name !== null) {
      formData.append('sender', 'user');
      formData.append('email', email);
      formData.append('name', name);
    }

    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedFile(null);
        setIsFileSelected(false);
      })
      .catch((error) => console.error('Error uploading file:', error));
  }, [selectedFile, email, name]);

  const handleAudioRecorded = useCallback(
    async (audioBlob: Blob) => {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recorded-audio.wav');

      if (email !== null && name !== null) {
        formData.append('sender', 'user');
        formData.append('email', email);
        formData.append('name', name);
      }

      try {
        const response = await fetch(uploadUrl, {
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
    },
    [email, name],
  );

  if (!email || !name) {
    return (
      <StyledConteiner>
        <LoginForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
          handleLogin={handleLogin}
          onClose={handleClose}
        />
      </StyledConteiner>
    );
  }

  return (
    <StyledConteiner>
      <StyledChatContainer>
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
      </StyledChatContainer>
    </StyledConteiner>
  );
};

export default ChatSupport;
