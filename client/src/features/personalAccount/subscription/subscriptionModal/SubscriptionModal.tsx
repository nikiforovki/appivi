import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '../subscriptionModalValidationSchema/SubscriptionModalValidationSchema';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SubscriptionModalProps, FormData } from './types';
import {
  StyledModalOverlay,
  StyledModalContent,
  StyledModalTitle,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledLoader,
  StyledErrorMessage,
  StyledCloseButton,
} from './SubscriptionModal.styled';
const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    onSubmit();
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  const handleSingClickUp = () => {
    navigate('/');
  };

  return (
    <StyledModalOverlay>
      <StyledModalContent>
        <StyledCloseButton onClick={onClose}>
          <FaTimes />
        </StyledCloseButton>
        <StyledModalTitle>Введите данные карты</StyledModalTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <StyledFormGroup>
            <StyledLabel>Номер карты:</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Состоит из 16 цифр (Пример: 5432...)"
              {...register('cardNumber')}
            />
            {errors.cardNumber && (
              <StyledErrorMessage>
                {errors.cardNumber.message}
              </StyledErrorMessage>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <StyledLabel>CSV:</StyledLabel>
            <StyledInput
              type="text"
              placeholder="CSV состоит из 3 цифр (Пример: 438)"
              {...register('csv')}
            />
            {errors.csv && (
              <StyledErrorMessage>{errors.csv.message}</StyledErrorMessage>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <StyledLabel>Срок действия:</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Указан на её лицевой стороне (Пример: 03/05)"
              {...register('expires')}
            />
            {errors.expires && (
              <StyledErrorMessage>{errors.expires.message}</StyledErrorMessage>
            )}
          </StyledFormGroup>
          <StyledButton type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : 'Подписаться'}
          </StyledButton>
          {loading && <StyledLoader>Применение подписки...</StyledLoader>}
        </form>
      </StyledModalContent>
    </StyledModalOverlay>
  );
};

export default SubscriptionModal;
