export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  subscription: string;
  token: string;
}

export interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSingUp: () => void;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface SubscriptionRequest {
  email: string;
  token: string;
  id: string;
  subscription: string;
  status: string;
  error: string | null;
}

interface ErrorResponse {
  message: string;
  code?: number;
}
