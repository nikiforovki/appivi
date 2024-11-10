import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBNOoc-cWELAOatflF2yTHZhHV1sxGr3sM',
  authDomain: 'appkino-827b1.firebaseapp.com',
  projectId: 'appkino-827b1',
  storageBucket: 'appkino-827b1.appspot.com',
  messagingSenderId: '1050261717867',
  appId: '1:1050261717867:web:f06b970e8704170d30822e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
