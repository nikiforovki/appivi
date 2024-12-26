export interface SignInProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenSingUp?: () => void;
}

export interface SignInForm {
  email: string;
  password: string;
}
