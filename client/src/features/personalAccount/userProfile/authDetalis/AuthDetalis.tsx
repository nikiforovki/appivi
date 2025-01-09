import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SubscriptionCheckbox from '../subscriptionCheckbox/SubscriptionCheckbox';
import { setSubscription } from '@app/create-user';
import LogoIvi from '@shared/logo-ivi';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SubscriptionRequest } from './types';
import SubscriptionModal from '@features/subscription-modal';
import {
  usePostSubscriptionMutation,
  useGetUserByEmailQuery,
} from '@/app/redux/api/movieApi';
import {
  StyledContainer,
  StyledHeader,
  StyledUserInfo,
  StyledSubscription,
  StyledChooseSubscription,
  StyledContent,
  StyledSubscribeButton,
  StyledLogoButton,
  StyledCloseButton,
} from './authDetalis.styled';
import { useAppSelector } from '@app/store';

const AuthDetails: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [postSubscription, { error }] = usePostSubscriptionMutation();
  const { data: userData, error: userError } = useGetUserByEmailQuery(
    user?.email ?? '',
    { skip: !user?.email },
  );

  useEffect(() => {
    if (userData) {
      dispatch(setSubscription(userData.subscription));
    }
  }, [userData, dispatch]);

  const handleSubscriptionChange = (subscription: string) => {
    setSelectedSubscription(subscription);
  };

  const handleSubscribeClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    if (!user) return;

    const requestBody: SubscriptionRequest = {
      email: user.email ?? '',
      token: user.token ?? '',
      id: user.id ?? '',
      subscription: selectedSubscription,
      status: 'succeeded',
      error: null,
    };

    try {
      const result = await postSubscription(requestBody).unwrap();
      dispatch(setSubscription(result.subscription.subscription));
    } catch (err) {
      console.error('Ошибка при сохранении подписки на сервере:', err);
    }
  };

  const handleSingClickUp = () => {
    navigate('/');
  };

  if (userError) {
    const errorMessage =
      'message' in userError
        ? userError.message
        : 'Ошибка при загрузке данных пользователя';
    return <p>{errorMessage}</p>;
  }

  if (error) {
    const errorMessage =
      'message' in error ? error.message : 'Ошибка при сохранении подписки';
    return <p>{errorMessage}</p>;
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLogoButton onClick={handleSingClickUp}>
          <LogoIvi />
        </StyledLogoButton>
        <StyledCloseButton onClick={handleSingClickUp}>
          <FaTimes />
        </StyledCloseButton>
      </StyledHeader>
      <StyledUserInfo>Пользователь</StyledUserInfo>
      {user ? (
        <>
          <StyledUserInfo>{user.email}</StyledUserInfo>
          <StyledSubscription>
            Текущая подписка: {user.subscription || 'Нет подписки'}
          </StyledSubscription>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
      <StyledSubscription>Выбрать подписку</StyledSubscription>
      <StyledChooseSubscription>
        <SubscriptionCheckbox onSubscriptionChange={handleSubscriptionChange} />
      </StyledChooseSubscription>
      <StyledSubscribeButton onClick={handleSubscribeClick}>
        Подписаться
      </StyledSubscribeButton>
      <StyledContent>
        <Outlet />
      </StyledContent>
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </StyledContainer>
  );
};

export default AuthDetails;
