import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider } from 'react-redux';
import { store, persistor } from '@/app/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { makeServer } from './server';
import './firebase';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
