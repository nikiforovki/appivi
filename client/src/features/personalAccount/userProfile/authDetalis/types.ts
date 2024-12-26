export interface User {
  email: string;
  token: string;
  id: string;
  subscription?: string;
}

export interface SubscriptionRequest {
  email: string;
  token: string;
  id: string;
  subscription: string;
  status: 'succeeded' | 'failed';
  error: string | null;
}
