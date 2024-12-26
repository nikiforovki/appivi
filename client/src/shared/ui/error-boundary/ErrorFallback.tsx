import React from 'react';
import { ErrorFallbackProps } from './types';

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div role="alert">
    <p>Что-то пошло не так:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Попробовать снова</button>
  </div>
);

export default ErrorFallback;
