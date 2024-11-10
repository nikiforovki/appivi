import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/slices/userSlice';
import { FaTimes } from 'react-icons/fa';
import { SignInProps, SignInForm } from './interfaces';

const StyledContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background-color: #090629df;
  border: 2px solid rgba(255, 255, 255, 0.43);
  border-radius: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Styledh2 = styled.h2`
  color: white;
  font-size: 34px;
`;

const StyledInputsWrapper = styled.div`
  margin-left: 50px;
  max-width: 450px;
`;

const StyledInput = styled.input`
  width: 80%;
  margin-bottom: 20px;
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 5px;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white;
  }
`;

const StyledInputEmail = styled(StyledInput)`
  margin-right: 10px;
`;

const StyledInputPassword = styled(StyledInput)`
  margin-right: 10px;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

const StyledSignInButton = styled.button`
  width: 80%;
  height: 40px;
  background-color: #009688;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

const TextRegistration = styled.div`
  font-size: 16px;
  color: #6e6c6c;
  margin-top: 20px;
  margin-bottom: 30px;
  cursor: pointer;

  &:hover {
    color: #fdfdfd;
    text-decoration: underline;
  }
`;

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose, onOpenSingUp }) => {
  const [error, setError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInUser: SubmitHandler<SignInForm> = (values) => {
    setError('');
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Пользователь вошел успешно:', user);
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          }),
        );
        setError('');
        onClose?.();
        navigate('/authdetalis');
      })
      .catch((error) => {
        console.error('Ошибка входа:', error);
        setError(`Вход не удался: ${error.message}`);
      });
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
      <Styledh2>Вход в систему</Styledh2>
      <StyledInputsWrapper>
        <form onSubmit={handleSubmit(signInUser)}>
          <StyledInputEmail
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

          <StyledInputPassword
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
      </StyledInputsWrapper>
      <TextRegistration onClick={handleSingClickUp}>
        Пройти регистрацию
      </TextRegistration>
    </StyledContainer>
  );
};

export default SignIn;
