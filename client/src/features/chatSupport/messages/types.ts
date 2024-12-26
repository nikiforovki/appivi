export interface MessageItem {
  id: number;
  message: string;
  sender: string;
  timestamp: Date;
  type?: 'text' | 'file';
}

export interface MessagesProps {
  messages: MessageItem[];
  email: string;
  name: string;
}
