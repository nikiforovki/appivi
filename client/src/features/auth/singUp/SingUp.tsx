import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { createUser } from '@app/create-user';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FormData } from './types';
import { AppDispatch } from '@app/store';
import {
  StyledContainer,
  StyledContent,
  StyledFormContainer,
  StyledFormTitle,
  StyledFormInput,
  StyledFormButton,
  StyledErrorMessage,
  StyledPasswordContainer,
  ShowPasswordButton,
  StyledCloseButton,
} from './SingUp.styled';

const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp: SubmitHandler<FormData> = async (data) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await dispatch(
        createUser({
          id: user.uid,
          email: user.email,
          password: password,
          subscription: '',
        }),
      );
      navigate('/authdetalis');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(`Sign up failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingClickUp = () => {
    navigate('/');
  };

  return (
    <StyledContainer>
      <StyledContent>
        <StyledFormContainer>
          <StyledCloseButton onClick={handleSingClickUp}>
            <FaTimes />
          </StyledCloseButton>
          <StyledFormTitle>Создать аккаунт</StyledFormTitle>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <StyledFormInput
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <StyledErrorMessage>{errors.email.message}</StyledErrorMessage>
            )}

            <StyledPasswordContainer>
              <StyledFormInput
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
              />
              <ShowPasswordButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </ShowPasswordButton>
            </StyledPasswordContainer>
            {errors.password && (
              <StyledErrorMessage>{errors.password.message}</StyledErrorMessage>
            )}

            <StyledPasswordContainer>
              <StyledFormInput
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
              />
            </StyledPasswordContainer>
            {errors.confirmPassword && (
              <StyledErrorMessage>
                {errors.confirmPassword.message}
              </StyledErrorMessage>
            )}

            <StyledFormButton type="submit" disabled={isLoading}>
              {isLoading ? 'Регистрация...' : 'Создать'}
            </StyledFormButton>
          </form>
          {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
        </StyledFormContainer>
      </StyledContent>
    </StyledContainer>
  );
};

export default SignUp;
