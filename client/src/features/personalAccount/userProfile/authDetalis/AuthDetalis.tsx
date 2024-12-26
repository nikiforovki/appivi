import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SubscriptionCheckbox from '../subscriptionCheckbox/SubscriptionCheckbox';
import { setSubscription } from '@/app/redux/slices/userSlice';
import LogoIvi from '@/shared/assets/icons/LogoIvi';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { User, SubscriptionRequest } from './types';
import SubscriptionModal from '@/features/personalAccount/subscription/subscriptionModal/SubscriptionModal';
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

const AuthDetails: React.FC = () => {
  const user: User = useSelector((state: { user: User }) => state.user);
  const dispatch = useDispatch();
  const [selectedSubscription, setSelectedSubscription] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [postSubscription, { isLoading, error }] =
    usePostSubscriptionMutation();
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserByEmailQuery(user.email);

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
    const requestBody: SubscriptionRequest = {
      email: user?.email,
      token: user?.token,
      id: user?.id,
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
