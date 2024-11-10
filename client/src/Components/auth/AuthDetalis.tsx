import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SubscriptionCheckbox from '../PersonalAccount/SubscriptionCheckbox';
import { setSubscription, fetchUser } from '../../Redux/slices/userSlice';
import UserComponent from '../../Components/UserComponent';
import styled from 'styled-components';
import LogoIvi from '../../../public/img/LogoIvi';
import { useSelector, useDispatch } from 'react-redux';
import { SlActionUndo } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { User, SubscriptionRequest } from './interfaces';
import SubscriptionModal from './SubscriptionModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 50px;
  background-color: var(--background-color);
  color: #090629;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 1000;
  background-color: var(--background-color);
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: 50px;
  margin-right: 20px;
`;

const UserInfo = styled.div`
  font-weight: bold;
  color: var(--text-color);
  font-size: 20px;
`;

const Subscription = styled.div`
  font-weight: bold;
  color: var(--text-color);
  font-size: 20px;
  margin-top: 20px;
`;

const ChooseSubscription = styled.div`
  font-weight: bold;
  color: var(--text-color);
  font-size: 20px;
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;

const Menu = styled.nav`
  ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    gap: 15px;
  }

  li {
    display: block;
  }

  a {
    text-decoration: none;
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  a:hover {
    color: var(--primary-color);
  }
`;

const Content = styled.main`
  flex: 1;
  padding-top: 60px;
`;

const Footer = styled.footer`
  background-color: var(--background-color);
  padding: 20px;
  text-align: center;
  border-top: 2px solid var(--secondary-color);
`;

const SubscribeButton = styled.button`
  background-color: var(--primary-color);
  width: 200px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: var(--text-color);
  cursor: pointer;
`;
const AuthDetalis: React.FC = () => {
  const user: User = useSelector((state: { user: User }) => state.user);
  const dispatch = useDispatch();
  const [selectedSubscription, setSelectedSubscription] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = 'someUserId';
    dispatch(fetchUser(userId));
  }, [dispatch]);

  const handleSubscriptionChange = (subscription: string) => {
    setSelectedSubscription(subscription);
  };

  const handleSubscribeClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    const requestBody: SubscriptionRequest = {
      email: user?.email,
      token: user?.token,
      id: user?.id,
      subscription: selectedSubscription,
      status: 'succeeded',
      error: null,
    };

    console.log('Отправка запроса на сохранение подписки:', requestBody);

    sendSubscriptionToServer(requestBody)
      .then((result) => {
        console.log('Подписка успешно сохранена на сервере:', result);
        dispatch(setSubscription(result.subscription.subscription));
      })
      .catch((error) => {
        console.error('Ошибка при сохранении подписки на сервере:', error);
      });
  };

  const sendSubscriptionToServer = async (data: SubscriptionRequest) => {
    try {
      const response = await fetch('http://localhost:5100/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      throw error;
    }
  };

  const handleSingClickUp = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <LogoIvi />
        <StyledCloseButton onClick={handleSingClickUp}>
          <SlActionUndo />
        </StyledCloseButton>
      </Header>
      <UserInfo>Пользователь</UserInfo>
      {user ? (
        <>
          <UserInfo>{user.email}</UserInfo>
          <Subscription>
            Текущая подписка: {user.subscription || 'Нет подписки'}
          </Subscription>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
      <Subscription>Выбрать подписку</Subscription>
      <ChooseSubscription>
        <SubscriptionCheckbox onSubscriptionChange={handleSubscriptionChange} />
      </ChooseSubscription>
      <SubscribeButton onClick={handleSubscribeClick}>
        Подписаться
      </SubscribeButton>
      <Content>
        <Outlet />
      </Content>
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </Container>
  );
};

export default AuthDetalis;
