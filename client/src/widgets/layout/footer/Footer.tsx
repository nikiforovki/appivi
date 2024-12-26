import React from 'react';
import styled from 'styled-components';
import BtnChatUsers from './ui/BtnChat';

const StyledFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledNavMenu = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledNavColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;

  @media (max-width: 768px) {
    display: none;
  }

  h3 {
    color: white;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: white;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const StyledSupportColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Footer: React.FC = () => {
  return (
    <StyledFooterContainer>
      <StyledNavMenu>
        <StyledNavColumn>
          <h3>О нас</h3>
          <ul>
            <li>
              <a href="#home">О компании</a>
            </li>
            <li>
              <a href="#home">Вакансии</a>
            </li>
            <li>
              <a href="#home">Программа бета-тестирования</a>
            </li>
            <li>
              <a href="#home">Информация для партнёров</a>
            </li>
            <li>
              <a href="#home">Размещение рекламы</a>
            </li>
            <li>
              <a href="#home">Пользовательское соглашение</a>
            </li>
            <li>
              <a href="#home">Политика конфиденциальности</a>
            </li>
            <li>
              <a href="#home">Комплаенс</a>
            </li>
          </ul>
        </StyledNavColumn>
        <StyledNavColumn>
          <h3>Разделы</h3>
          <ul>
            <li>
              <a href="#about">Мой Иви</a>
            </li>
            <li>
              <a href="#about">Что нового</a>
            </li>
            <li>
              <a href="#about">Фильмы</a>
            </li>
            <li>
              <a href="#about">Сериалы</a>
            </li>
            <li>
              <a href="#about">Мультфильмы</a>
            </li>
            <li>
              <a href="#about">ТВ</a>
            </li>
            <li>
              <a href="#about">Что посмотреть</a>
            </li>
            <li>
              <a href="#about">Активация сертификата</a>
            </li>
          </ul>
        </StyledNavColumn>
        <StyledSupportColumn>
          <h3>Служба поддержки</h3>
          <span>Мы всегда готовы вам помочь.</span>
          <span>Наши операторы онлайн 24/7</span>
          <BtnChatUsers />
        </StyledSupportColumn>
      </StyledNavMenu>
    </StyledFooterContainer>
  );
};

export default Footer;
