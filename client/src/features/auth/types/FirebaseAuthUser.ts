import { User } from 'firebase/auth';

export interface FirebaseAuthUser extends User {
  accessToken?: string;
}
