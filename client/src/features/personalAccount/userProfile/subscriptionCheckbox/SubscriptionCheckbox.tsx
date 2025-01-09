import React, { useState } from 'react';
import styled from 'styled-components';
import { SubscriptionCheckboxProps, SubscriptionChangeEvent } from './types';

const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const SubscriptionOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SubscriptionLabel = styled.label`
  font-size: 16px;
  color: var(--text-color);
  margin-left: 10px;
`;

const SubscriptionCheckbox: React.FC<SubscriptionCheckboxProps> = ({
  onSubscriptionChange,
}) => {
  const [selectedSubscription, setSelectedSubscription] = useState('');

  const handleSubscriptionChange = (event: SubscriptionChangeEvent) => {
    const subscription = event.target.value;
    setSelectedSubscription(subscription);
    onSubscriptionChange(subscription);
  };

  return (
    <SubscriptionContainer>
      <SubscriptionOption>
        <input
          type="checkbox"
          value="Сериалы"
          checked={selectedSubscription === 'Сериалы'}
          onChange={handleSubscriptionChange}
        />
        <SubscriptionLabel>Сериалы</SubscriptionLabel>
      </SubscriptionOption>
      <SubscriptionOption>
        <input
          type="checkbox"
          value="Фильмы"
          checked={selectedSubscription === 'Фильмы'}
          onChange={handleSubscriptionChange}
        />
        <SubscriptionLabel>Фильмы</SubscriptionLabel>
      </SubscriptionOption>
      <SubscriptionOption>
        <input
          type="checkbox"
          value="Мультфильмы"
          checked={selectedSubscription === 'Мультфильмы'}
          onChange={handleSubscriptionChange}
        />
        <SubscriptionLabel>Мультфильмы</SubscriptionLabel>
      </SubscriptionOption>
      <SubscriptionOption>
        <input
          type="checkbox"
          value="Бесплатно"
          checked={selectedSubscription === 'Бесплатно'}
          onChange={handleSubscriptionChange}
        />
        <SubscriptionLabel>Бесплатно</SubscriptionLabel>
      </SubscriptionOption>
    </SubscriptionContainer>
  );
};

export default SubscriptionCheckbox;
