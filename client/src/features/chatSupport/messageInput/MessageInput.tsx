import React from 'react';
import styled from 'styled-components';
import AudioRecorder from '../audioRecorder/AudioRecorder';
import { MessageInputProps } from './types';

const StyledInput = styled.input`
  width: 95%;
  padding: 5px;
`;

const StyledButton = styled.button`
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 30px;
`;

const StyledFileInput = styled.input`
  margin-top: 10px;
`;

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  handleFileChange,
  handleAudioRecorded,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <StyledInput
        type="text"
        value={newMessage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewMessage(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение..."
      />
      <StyledButton onClick={sendMessage}>Отправить</StyledButton>
      <StyledFileInput type="file" onChange={handleFileChange} />
      <AudioRecorder onAudioRecorded={handleAudioRecorded} />
    </div>
  );
};

export default MessageInput;
