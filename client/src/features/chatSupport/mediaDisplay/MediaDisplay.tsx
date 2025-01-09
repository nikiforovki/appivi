import React from 'react';
import { MediaDisplayProps } from './types';
import { API_ROUTES } from '@shared/api-routes';

const MediaDisplay: React.FC<MediaDisplayProps> = ({ filename }) => {
  const fileUrl = `${process.env.REACT_APP_BASE_URL}${API_ROUTES.UPLOAD_RESOURCE}/${encodeURIComponent(filename)}`;

  if (!filename || !filename.includes('.')) {
    return <div>Неверный файл</div>;
  }

  const fileExtension = filename.split('.').pop()?.toLowerCase();
  const isImage = ['jpg', 'jpeg', 'webp', 'png', 'gif'].includes(
    fileExtension || '',
  );
  const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExtension || '');
  const isAudio = ['mp3', 'wav', 'ogg'].includes(fileExtension || '');

  return (
    <div>
      {isImage && (
        <img src={fileUrl} alt="Загруженное" style={{ maxWidth: '50%' }} />
      )}
      {isVideo && (
        <video controls style={{ maxWidth: '50%' }}>
          <source src={fileUrl} type={`video/${fileExtension}`} />
          Ваш браузер не поддерживает тег video.
        </video>
      )}
      {isAudio && (
        <audio controls style={{ maxWidth: '20%' }}>
          <source src={fileUrl} type={`audio/${fileExtension}`} />
          Ваш браузер не поддерживает тег audio.
        </audio>
      )}
    </div>
  );
};

export default MediaDisplay;
