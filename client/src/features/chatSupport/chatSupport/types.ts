export interface Message {
  id: string;
  message: string;
  sender: string;
  timestamp: Date;
  type?: 'text' | 'file';
}

export interface MessageItem {
  id: number;
  message: string;
  sender: string;
  timestamp: Date;
  type?: 'text' | 'file';
}

export interface ChatState {
  email: string | null;
  name: string | null;
  messages: MessageItem[];
}

export interface ChatSupportProps {
  email?: string;
  name?: string;
}
