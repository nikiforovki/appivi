import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  getApps,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDiTSbF7LMdy28rrvAt_MQFSx7SF3ss4aM',
  authDomain: 'appkino-2deb5.firebaseapp.com',
  projectId: 'appkino-2deb5',
  storageBucket: 'appkino-2deb5.appspot.com',
  messagingSenderId: '420268142569',
  appId: '1:420268142569:web:53a3afc16482636e93a578',
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}

export async function registerUser(
  email: string,
  password: string,
): Promise<boolean> {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return false;
  }
}
