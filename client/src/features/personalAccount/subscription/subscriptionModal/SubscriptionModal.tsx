import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '../subscriptionModalValidationSchema/SubscriptionModalValidationSchema';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SubscriptionModalProps, FormData } from './types';
import {
  StyledModalOverlay,
  StyledModalContent,
  StyledModalTitle,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledLoader,
  StyledErrorMessage,
  StyledCloseButton,
} from './SubscriptionModal.styled';
const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (data: FormData) => {
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
    <StyledModalOverlay>
      <StyledModalContent>
        <StyledCloseButton onClick={onClose}>
          <FaTimes />
        </StyledCloseButton>
        <StyledModalTitle>Введите данные карты</StyledModalTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <StyledFormGroup>
            <StyledLabel>Номер карты:</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Состоит из 16 цифр (Пример: 5432...)"
              {...register('cardNumber')}
            />
            {errors.cardNumber && (
              <StyledErrorMessage>
                {errors.cardNumber.message}
              </StyledErrorMessage>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <StyledLabel>CSV:</StyledLabel>
            <StyledInput
              type="text"
              placeholder="CSV состоит из 3 цифр (Пример: 438)"
              {...register('csv')}
            />
            {errors.csv && (
              <StyledErrorMessage>{errors.csv.message}</StyledErrorMessage>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <StyledLabel>Срок действия:</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Указан на её лицевой стороне (Пример: 03/05)"
              {...register('expires')}
            />
            {errors.expires && (
              <StyledErrorMessage>{errors.expires.message}</StyledErrorMessage>
            )}
          </StyledFormGroup>
          <StyledButton type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : 'Подписаться'}
          </StyledButton>
          {loading && <StyledLoader>Применение подписки...</StyledLoader>}
        </form>
      </StyledModalContent>
    </StyledModalOverlay>
  );
};

export default SubscriptionModal;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import validationSchema from '../subscriptionModalValidationSchema/SubscriptionModalValidationSchema';
// import { FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { SubscriptionModalProps, FormData } from './types';

// const StyledModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const StyledModalContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 5px;
//   width: 350px;
//   position: relative;
// `;

// const StyledModalTitle = styled.h2`
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const StyledFormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const StyledLabel = styled.label`
//   display: block;
//   margin-bottom: 5px;
// `;

// const StyledInput = styled.input`
//   width: 300px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const StyledButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   margin-top: 20px;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const StyledLoader = styled.div`
//   margin-top: 20px;
//   font-size: 16px;
//   color: #007bff;
// `;

// const StyledErrorMessage = styled.span`
//   color: red;
//   font-size: 12px;
//   padding: 10px;
// `;

// const StyledCloseButton = styled.button`
//   background-color: transparent;
//   border: none;
//   font-size: 18px;
//   color: black;
//   cursor: pointer;
//   position: absolute;
//   top: 10px;
//   right: 10px;
// `;

// const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: yupResolver(validationSchema),
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFormSubmit = async (data: FormData) => {
//     setLoading(true);

//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     onSubmit();
//     setLoading(false);
//     onClose();
//   };

//   if (!isOpen) return null;

//   const handleSingClickUp = () => {
//     navigate('/');
//   };

//   return (
//     <StyledModalOverlay>
//       <StyledModalContent>
//         <StyledCloseButton onClick={onClose}>
//           <FaTimes />
//         </StyledCloseButton>
//         <StyledModalTitle>Введите данные карты</StyledModalTitle>
//         <form onSubmit={handleSubmit(handleFormSubmit)}>
//           <StyledFormGroup>
//             <StyledLabel>Номер карты:</StyledLabel>
//             <StyledInput
//               type="text"
//               placeholder="Состоит из 16 цифр (Пример: 5432...)"
//               {...register('cardNumber')}
//             />
//             {errors.cardNumber && (
//               <StyledErrorMessage>
//                 {errors.cardNumber.message}
//               </StyledErrorMessage>
//             )}
//           </StyledFormGroup>
//           <StyledFormGroup>
//             <StyledLabel>CSV:</StyledLabel>
//             <StyledInput
//               type="text"
//               placeholder="CSV состоит из 3 цифр (Пример: 438)"
//               {...register('csv')}
//             />
//             {errors.csv && (
//               <StyledErrorMessage>{errors.csv.message}</StyledErrorMessage>
//             )}
//           </StyledFormGroup>
//           <StyledFormGroup>
//             <StyledLabel>Срок действия:</StyledLabel>
//             <StyledInput
//               type="text"
//               placeholder="Указан на её лицевой стороне (Пример: 03/05)"
//               {...register('expires')}
//             />
//             {errors.expires && (
//               <StyledErrorMessage>{errors.expires.message}</StyledErrorMessage>
//             )}
//           </StyledFormGroup>
//           <StyledButton type="submit" disabled={loading}>
//             {loading ? 'Загрузка...' : 'Подписаться'}
//           </StyledButton>
//           {loading && <StyledLoader>Применение подписки...</StyledLoader>}
//         </form>
//       </StyledModalContent>
//     </StyledModalOverlay>
//   );
// };

// export default SubscriptionModal;
