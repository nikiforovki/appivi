import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client';

import './styles/GlobalStyles.css';
import SignUp from './Components/auth/SingUp';
import SignIn from './Components/auth/Singin';
import AuthDetalis from './Components/auth/AuthDetalis';
import Layout from './Components/Layout/Layout';
import ChatSupport from './Components/ChatSupport/ChatSupport';
import MovieCatalog from './Components/Movie/MovieCatalog';
import Films from './Components/Pages/Films';
import { useTheme } from './hooks/useTheme';
const socket = socketIO('http://127.0.0.1:5100');

const darkTheme = {
  background: 'rgb(30, 33, 61)',
  text: '#fff',
  primary: '#6c63ff',
  secondary: '#333',
};

const lightTheme = {
  background: '#D3D3D3',
  text: '#333',
  primary: '#8a8aff',
  secondary: '#f0f0f0',
};

const App = () => {
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setTheme(prefersDarkMode ? darkTheme : lightTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
    document.body.classList.toggle('dark-mode', theme === darkTheme);
    document.body.classList.toggle('light-mode', theme !== darkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === darkTheme);
    document.body.classList.toggle('light-mode', theme !== darkTheme);
  }, [theme]);

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: '100vh',
      }}
    >
      <button
        onClick={toggleTheme}
        style={{ margin: '10px', padding: '10px', cursor: 'pointer' }}
      >
        Переключить тему
      </button>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/authdetalis" element={<AuthDetalis />} />
          <Route path="/singup" element={<SignUp />} />
          <Route path="/singin" element={<SignIn />} />
          <Route path="/chatSupport" element={<ChatSupport />} />
          <Route path="/catalog" element={<MovieCatalog />} />
          <Route path="/films" element={<Films />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
