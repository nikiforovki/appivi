import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoIvi from '../../../public/img/LogoIvi';
import UserIcon from '../../../public/img/UserIcon';
import SearchIcon from '../../../public/img/SearchIcon';
import IconComponent from '../../../public/img/IconComponent';
import SignIn from '../auth/Singin';
import Films from '../Pages/Films';

const HeaderContainer = styled.div`
  display: flex;
  max-width: 1320px;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const LogoNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  height: 77px;
  width: 56px;
  margin-right: 40px;
`;

const NavMenu = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
    margin-right: 15px;
  }

  a {
    color: rgba(255, 255, 255, 0.43);
    text-decoration: none;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const BtnFree60 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 32px;
  border-radius: 8px;
  background-color: #f30745;
  color: white;
  cursor: pointer;
  font-family: 'HelveticaNeue', sans-serif;
`;

const BtnLogin = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background-color: #1f1b2e;
  border-radius: 8px;
  color: whitesmoke;
  gap: 10px;
  border: 1px solid #1f1b2e;
  box-shadow: 0 2px 4px #1f1b2e;
  cursor: pointer;
  font-family: 'HelveticaNeue', sans-serif;

  @media (max-width: 680px) {
    display: none;
  }
`;

const BtnSearchIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 130px;
  height: 40px;
  background-color: #1f1b2e;
  border-radius: 8px;2
  color: whitesmoke;
  border: 1px solid #1f1b2e;
  box-shadow: 0 2px 4px #1f1b2e;
  cursor: pointer;
  font-family: 'HelveticaNeue', sans-serif;

  @media (max-width: 680px) {
    display: none;
  }
`;

const UserBtn = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: rgba(108, 99, 255, 0.05);
  border: 2px solid rgba(108, 99, 255, 0.04);
`;

const TextRegistration = styled.div`
  font-size: 16px;
  color: with;
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigateToSingUp = () => {
    navigate('/singup');
  };

  const handleNavigateToCatalog = () => {
    navigate('/catalog');
  };

  return (
    <HeaderContainer>
      <LogoNavContainer>
        <Logo>
          <LogoIvi />
        </Logo>
        <NavMenu>
          <ul>
            <li>
              <Link to="/authdetalis">Мой Иви</Link>
            </li>
            <li>
              <Link to="/singup">Регистрация</Link>
            </li>
            <li>
              <Link to="/films">Фильмы</Link>
            </li>
            <li>
              <a href="#services">Сериалы</a>
            </li>
            <li>
              <a href="#contact">Мультфильмы</a>
            </li>
          </ul>
        </NavMenu>
      </LogoNavContainer>
      <BtnContainer>
        <BtnFree60 onClick={handleNavigateToSingUp}>
          Смотреть 60 дней бесплатно
        </BtnFree60>
        <BtnSearchIcon onClick={handleNavigateToCatalog}>
          <SearchIcon />
          Поиск
          <IconComponent />
        </BtnSearchIcon>
        <BtnLogin onClick={handleOpenModal}>
          <UserBtn>
            <UserIcon />
          </UserBtn>
          Войти
        </BtnLogin>
      </BtnContainer>
      <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />
    </HeaderContainer>
  );
};

export default Header;
