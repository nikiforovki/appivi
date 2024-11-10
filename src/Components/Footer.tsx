import React from 'react';
import styled from 'styled-components';
import LogoIvi from '../../public/img/LogoIvi.svg'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #140930;
  color: white;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin-right: 20px;
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
    color: white;
    text-decoration: none;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      {/*<Logo>*/}
      {/*  <img src={LogoIvi} alt="Логотип" />*/}
      {/*</Logo>*/}

      <NavMenu>
        <ul>
          <li>
          <a href="#home">Главная</a>
          </li>
          <li>
            <a href="#about">О нас</a>
          </li>
          <li>
            <a href="#services">Услуги</a>
          </li>
          <li>
            <a href="#contact">Контакты</a>
          </li>
        </ul>
      </NavMenu>
    </HeaderContainer>
  );
};

export default Header;
