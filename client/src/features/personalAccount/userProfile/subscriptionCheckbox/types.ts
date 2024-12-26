import { ChangeEvent } from 'react';

export interface SubscriptionCheckboxProps {
  onSubscriptionChange: (subscription: string) => void;
}

export type SubscriptionChangeEvent = ChangeEvent<HTMLInputElement>;
