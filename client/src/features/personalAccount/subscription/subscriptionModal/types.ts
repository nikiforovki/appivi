export interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export interface FormData {
  cardNumber: string;
  csv: string;
  expires: string;
}
