import {Auth, User} from 'firebase/auth';
import React from 'react';
import { UserFirebase } from '../interfaces/FirebaseSchema';

const UserContext = React.createContext({
  userData: null as User | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUserData: (userData: User) => {},
  logout: () => {},
  finishIntro: () => {},
  auth: {} as Auth,
  userDetails: {} as UserFirebase,
});

export default UserContext;
