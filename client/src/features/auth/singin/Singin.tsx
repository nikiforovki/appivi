import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@app/set-user';
import { FaTimes } from 'react-icons/fa';
import { SignInProps, SignInForm } from './types';
import {
  StyledContainer,
  StyledTitle,
  StyledFormWrapper,
  StyledEmailInput,
  StyledPasswordInput,
  StyledCloseButton,
  StyledSignInButton,
  StyledRegistrationText,
} from './SingIn.styled';

const SignIn: React.FC<SignInProps> = ({
  isOpen = false,
  onClose,
  onOpenSingUp,
}) => {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInUser: SubmitHandler<SignInForm> = async (values) => {
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      dispatch(
        setUser({
          email: user.email,
          token: token,
          id: user.uid,
          subscription: null,
          status: 'succeeded',
          error: null,
        }),
      );
      setError('');
      onClose?.();
      navigate('/authdetalis');
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  const handleSingUpClick = () => {
    if (typeof onOpenSingUp === 'function') {
      onOpenSingUp();
      navigate('/singup');
    } else {
      console.error('onOpenSingUp is not a function');
    }
  };

  if (!isOpen) return null;

  const handleSingClickUp = () => {
    navigate('/singup');
  };

  return (
    <StyledContainer>
      <StyledCloseButton onClick={onClose}>
        <FaTimes />
      </StyledCloseButton>
      <StyledTitle>Вход в систему</StyledTitle>
      <StyledFormWrapper>
        <form onSubmit={handleSubmit(signInUser)}>
          <StyledEmailInput
            {...register('email', {
              required: 'Электронная почта обязательна',
            })}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {errors.email.message}
            </p>
          )}

          <StyledPasswordInput
            {...register('password', {
              required: 'Пароль обязателен',
            })}
            type="password"
            placeholder="Пароль"
          />
          {errors.password && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {errors.password.message}
            </p>
          )}

          <StyledSignInButton type="submit">Войти в систему</StyledSignInButton>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        </form>
      </StyledFormWrapper>
      <StyledRegistrationText onClick={handleSingClickUp}>
        Пройти регистрацию
      </StyledRegistrationText>
    </StyledContainer>
  );
};

export default SignIn;
