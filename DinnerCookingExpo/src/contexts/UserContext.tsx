import {Auth, User} from 'firebase/auth';
import React from 'react';

import type { UserDetails } from '../interfaces/UserDetails';

const UserContext = React.createContext({
  userData: null as User | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUserData: (userData: User) => {},
  logout: () => {},
  finishIntro: () => {},
  auth: {} as Auth,
  userDetails: {} as UserDetails,
});

export default UserContext;
