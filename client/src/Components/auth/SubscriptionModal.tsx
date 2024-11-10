import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validationSchema';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 350px;
  position: relative;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Loader = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #007bff;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  padding: 10px;
`;

const StyledCloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: black;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SubscriptionModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
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
    <ModalOverlay>
      <ModalContent>
        <StyledCloseButton onClick={onClose}>
          <FaTimes />
        </StyledCloseButton>
        <ModalTitle>Введите данные карты</ModalTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormGroup>
            <Label>Номер карты:</Label>
            <Input
              type="text"
              placeholder="Состоит из 16 цифр (Пример: 5432...)"
              {...register('cardNumber')}
            />
            {errors.cardNumber && (
              <ErrorMessage>{errors.cardNumber.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>CSV:</Label>
            <Input
              type="text"
              placeholder="CSV состоит из 3 цифр (Пример: 438)"
              {...register('csv')}
            />
            {errors.csv && <ErrorMessage>{errors.csv.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>Срок действия:</Label>
            <Input
              type="text"
              placeholder="Указан на её лицевой стороне (Пример: 03/05)"
              {...register('expires')}
            />
            {errors.expires && (
              <ErrorMessage>{errors.expires.message}</ErrorMessage>
            )}
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : 'Подписаться'}
          </Button>
          {loading && <Loader>Применение подписки...</Loader>}
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SubscriptionModal;
