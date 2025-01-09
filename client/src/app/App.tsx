import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from '@shared/error-boundary';
import '@/app/styles/main.css';
import SignUp from '@features/sign-up';
import SignIn from '@features/sing-in';
import AuthDetalis from '@features/auth-detalis';
import Layout from '@widgets/layout';
import ChatSupport from '@features/chat-support';
import MovieCatalog from '@widgets/movie-catalog';
import Films from '@pages/films';
import Serials from '@pages/serials';
import Cartoons from '@pages/cartoons';
import ThemeToggleButton from '@shared/theme-toggle-button';
import { ROUTES } from '@shared/routes';
import { ThemeProvider } from '@shared/theme-provider';

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
