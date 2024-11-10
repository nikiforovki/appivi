import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser, createUser } from '../../Redux/slices/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoIvi from '../../../public/img/LogoIvi';
import { SlActionUndo } from 'react-icons/sl';
import { FormData, User } from './interfaces';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 50px;
  background-color: rgb(30, 33, 61);

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 1000;
  background-color: rgb(30, 33, 61);
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  height: 77px;
  width: 56px;
  margin-right: 40px;
`;

const Menu = styled.nav`
  ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    gap: 15px;
  }

  li {
    display: block;
  }

  a {
    text-decoration: none;
    color: #fff;
    transition: all 0.3s ease;
  }

  a:hover {
    color: #007bff;
  }
`;

const Content = styled.main`
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const FormTitle = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const FormButton = styled.button`
  width: 80%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ShowPasswordButton = styled.button`
  position: absolute;
  right: 20px;
  top: 40%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 18px; /* Размер иконки */
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

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      console.log('User signed up successfully');
      navigate('/authdetalis');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(`Sign up failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingClickUp = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <Logo>
          <LogoIvi />
        </Logo>
        <StyledCloseButton onClick={handleSingClickUp}>
          <SlActionUndo />
        </StyledCloseButton>
      </Header>
      <Content>
        <FormContainer>
          <FormTitle>Создать аккаунт</FormTitle>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <FormInput
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}

            <PasswordContainer>
              <FormInput
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
            </PasswordContainer>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}

            <PasswordContainer>
              <FormInput
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
              />
            </PasswordContainer>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}

            <FormButton type="submit" disabled={isLoading}>
              {isLoading ? 'Регистрация...' : 'Создать'}
            </FormButton>
          </form>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SignUp;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import styled from 'styled-components';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../Redux/slices/userSlice';
// import { createUser } from '../../Redux/slices/userSlice';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import LogoIvi from '../../../public/img/LogoIvi';
// import { SlActionUndo } from 'react-icons/sl';
// import { FormData, User } from '../../interfaces/FormData'

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   max-width: 1320px;
//   margin: 0 auto;
//   padding: 20px 50px;
//   background-color: rgb(30, 33, 61);

//   @media (max-width: 768px) {
//     padding: 20px 10px;
//   }
// `;

// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: sticky;
//   top: 0;
//   width: 100%;
//   height: auto;
//   z-index: 1000;
//   background-color: rgb(30, 33, 61);
//   padding: 10px 20px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `;

// const Logo = styled.div`
//   height: 77px;
//   width: 56px;
//   margin-right: 40px;
// `;

// const Menu = styled.nav`
//   ul {
//     list-style-type: none;
//     padding-left: 0;
//     display: flex;
//     gap: 15px;
//   }

//   li {
//     display: block;
//   }

//   a {
//     text-decoration: none;
//     color: #fff;
//     transition: all 0.3s ease;
//   }

//   a:hover {
//     color: #007bff;
//   }
// `;

// const Content = styled.main`
//   padding-top: 60px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const FormContainer = styled.div`
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 400px;
//   text-align: center;
// `;

// const FormTitle = styled.h2`
//   color: #333;
//   font-size: 24px;
//   margin-bottom: 20px;
// `;

// const FormInput = styled.input`
//   width: 90%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 16px;
// `;

// const FormButton = styled.button`
//   width: 80%;
//   padding: 10px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 14px;
//   margin-top: 10px;
// `;

// const PasswordContainer = styled.div`
//   position: relative;
// `;

// const ShowPasswordButton = styled.button`
//   position: absolute;
//   right: 20px;
//   top: 40%;
//   transform: translateY(-50%);
//   background: none;
//   border: none;
//   color: #007bff;
//   cursor: pointer;
//   font-size: 18px; /* Размер иконки */
// `;

// const StyledCloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background-color: transparent;
//   border: none;
//   font-size: 18px;
//   color: white;
//   cursor: pointer;
// `;

// const SignUp: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [error, setError] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [showPassword, setShowPassword] = useState<boolean>(false);

//   const handleSignUp = async (data) => {
//     const { email, password, confirmPassword } = data;

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       const user = userCredential.user;
//       await dispatch(
//         createUser({
//           id: user.uid,
//           email: user.email,
//           password: password,
//           subscription: '',
//         }),
//       );
//       console.log('User signed up successfully');
//       navigate('/authdetalis');
//     } catch (error) {
//       console.error('Error signing up:', error);
//       setError(`Sign up failed: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSingClickUp = () => {
//     navigate('/');
//   };

//   return (
//     <Container>
//       <Header>
//         <Logo>
//           <LogoIvi />
//         </Logo>
//         <StyledCloseButton onClick={handleSingClickUp}>
//           <SlActionUndo />
//         </StyledCloseButton>
//       </Header>
//       <Content>
//         <FormContainer>
//           <FormTitle>Создать аккаунт</FormTitle>
//           <form onSubmit={handleSubmit(handleSignUp)}>
//             <FormInput
//               {...register('email', { required: 'Email is required' })}
//               type="email"
//               placeholder="Email"
//             />
//             {errors.email && (
//               <ErrorMessage>{errors.email.message}</ErrorMessage>
//             )}

//             <PasswordContainer>
//               <FormInput
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: {
//                     value: 6,
//                     message: 'Password must be at least 6 characters',
//                   },
//                 })}
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//               />
//               <ShowPasswordButton
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </ShowPasswordButton>
//             </PasswordContainer>
//             {errors.password && (
//               <ErrorMessage>{errors.password.message}</ErrorMessage>
//             )}

//             <PasswordContainer>
//               <FormInput
//                 {...register('confirmPassword', {
//                   required: 'Confirm Password is required',
//                   validate: (value) =>
//                     value === watch('password') || 'Passwords do not match',
//                 })}
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Confirm Password"
//               />

//             </PasswordContainer>
//             {errors.confirmPassword && (
//               <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
//             )}

//             <FormButton type="submit" disabled={isLoading}>
//               {isLoading ? 'Регистрация...' : 'Создать'}
//             </FormButton>
//           </form>
//           {error && <ErrorMessage>{error}</ErrorMessage>}
//         </FormContainer>
//       </Content>
//     </Container>
//   );
// };

// export default SignUp;
