import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from '@/shared/ui/error-boundary/ErrorBoundary';
import '@/app/styles/main.css';
import SignUp from '@/features/auth/singUp/SingUp';
import SignIn from '@/features/auth/singin/Singin';
import AuthDetalis from '@/features/personalAccount/userProfile/authDetalis/AuthDetalis';
import Layout from '@/widgets/layout/Layout';
import ChatSupport from '@/features/chatSupport/chatSupport/ChatSupport';
import MovieCatalog from '@/widgets/movie/movie-catalog/MovieCatalog';
import Films from '@/pages/FilmsList/FilmsList';
import Serials from '@/pages/SerialsList/SerialsList';
import Cartoons from '@/pages/CartoonsList/CartoonsList';
import ThemeToggleButton from '@/shared/ui/theme-toggle-button/ThemeToggleButton';
import { ROUTES } from '@/shared/constants/routes';
import { ThemeProvider } from '@/shared/context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ThemeToggleButton />
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Layout />} />
            <Route path={ROUTES.AUTH_DETAILS} element={<AuthDetalis />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path={ROUTES.CHAT_SUPPORT} element={<ChatSupport />} />
            <Route path={ROUTES.CATALOG} element={<MovieCatalog />} />
            <Route path={ROUTES.FILMS} element={<Films />} />
            <Route path={ROUTES.SERIALS} element={<Serials />} />
            <Route path={ROUTES.CARTOONS} element={<Cartoons />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
