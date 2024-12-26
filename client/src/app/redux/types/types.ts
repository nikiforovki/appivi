export interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  subscription: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | null;
  error: any;
}

export interface Message {
  id: string;
  message: string;
  sender: string;
  timestamp: Date;
}

export interface ChatState {
  email: string | null;
  name: string | null;
  messages: Message[];
}
