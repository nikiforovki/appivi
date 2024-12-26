import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoIvi from '@/shared/assets/icons/LogoIvi';
import SignIn from '@/features/auth/singin/Singin';
import FreeTrialButton from '@/shared/ui/free-Trial-Button/FreeTrialButton';
import BtnLogin from '@/features/auth/ui/BtnLogin/BtnLogin';
import BtnSearchIcon from './ui/BtnSearchIcon/BtnSearchIcon';

const StyledHeaderContainer = styled.div`
  display: flex;
  max-width: 1320px;
  padding: 0 10px 0 10px;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const StyledLogoNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const StyledNavMenu = styled.nav`
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

const StyledBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const StyledLogoButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: none;
  }
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

  const handleSingClickUp = () => {
    navigate('/');
  };

  return (
    <StyledHeaderContainer>
      <StyledLogoNavContainer>
        <StyledLogoButton onClick={handleSingClickUp}>
          <LogoIvi />
        </StyledLogoButton>
        <StyledNavMenu>
          <ul>
            <li>
              <Link to="/singup">Регистрация</Link>
            </li>
            <li>
              <Link to="/films">Фильмы</Link>
            </li>
            <li>
              <a href="/serials">Сериалы</a>
            </li>
            <li>
              <a href="/cartoons">Мультфильмы</a>
            </li>
          </ul>
        </StyledNavMenu>
      </StyledLogoNavContainer>
      <StyledBtnContainer>
        <FreeTrialButton
          hideOnMobile={false}
          onClick={handleNavigateToSingUp}
        />
        <BtnSearchIcon onClick={handleNavigateToCatalog} />
        <BtnLogin onClick={handleOpenModal} />
      </StyledBtnContainer>
      <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />
    </StyledHeaderContainer>
  );
};

export default Header;
