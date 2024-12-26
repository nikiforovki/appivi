export interface LoginFormProps {
  userEmail: string;
  setUserEmail: (email: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  handleLogin: () => void;
  onClose: () => void;
}
