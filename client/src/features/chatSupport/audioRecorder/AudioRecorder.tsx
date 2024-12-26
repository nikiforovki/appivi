import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AudioRecorderLocalProps } from './types';

const StyledRecordButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff3333;
  }

  &:active {
    background-color: #cc0000;
  }
`;

const StyledAudioPlayer = styled.audio`
  position: relative;
  display: block;
  width: 50%;
  border-radius: 5px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px #0000001a;
  margin-left: 200px;
  bottom: 40px;
`;

const AudioRecorder: React.FC<AudioRecorderLocalProps> = ({
  onAudioRecorded,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        onAudioRecorded(audioBlob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <StyledRecordButton
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </StyledRecordButton>
      {audioUrl && <StyledAudioPlayer src={audioUrl} controls />}
    </div>
  );
};

export default AudioRecorder;
