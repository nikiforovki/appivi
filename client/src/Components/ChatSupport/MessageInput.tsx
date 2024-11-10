import React from 'react';
import styled from 'styled-components';
import AudioRecorder from './AudioRecorder';
import SimpleButton from './SimpleButton';

const Input = styled.input`
  width: 95%;
  padding: 5px;
`;

const Button = styled.button`
  width: 20%;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 30px;
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAudioRecorded: (audioBlob: Blob) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  handleFileChange,
  handleAudioRecorded,
}) => {
  return (
    <div>
      <Input
        type="text"
        value={newMessage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewMessage(e.target.value)
        }
        placeholder="Введите сообщение..."
      />
      <Button onClick={sendMessage}>Отправить</Button>
      <FileInput type="file" onChange={handleFileChange} />
      <AudioRecorder onAudioRecorded={handleAudioRecorded} />
      <SimpleButton />
    </div>
  );
};

export default MessageInput;
