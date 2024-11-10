import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 150px;
  height: 250px;
  color: white;
  margin: 10px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

const CardSubscription = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  color: red;
`;

interface CardProps {
  title: string;
  img: string;
  subscription: string;
}

const Card: React.FC<CardProps> = ({ title, img, subscription }) => {
  return (
    <CardWrapper>
      <CardImage src={img} alt={title} />
      <CardTitle>{title}</CardTitle>
      <CardSubscription>{subscription}</CardSubscription>
    </CardWrapper>
  );
};

export default Card;
