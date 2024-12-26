import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { ErrorBoundaryProps } from './types';

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
