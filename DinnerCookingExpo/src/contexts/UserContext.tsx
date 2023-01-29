import React, { useContext, useState, useEffect } from 'react';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { UserFirebase } from '../interfaces/FirebaseSchema';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore/lite';
import DatabaseContext from './DatabaseContext';
import { FirebaseError } from 'firebase/app';

export type UserContextType = {
  currentUser: User | null;
  userDetails: UserFirebase | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const defaultUserValues = {
  currentUser: null,
  userDetails: null,
  login: (email: string, password: string): Promise<void> =>
    new Promise(async (resolve, reject) => {
      resolve();
    }),
  signup: (email: string, password: string): Promise<void> =>
    new Promise(async (resolve, reject) => {
      resolve();
    }),
  logout: (): Promise<void> =>
    new Promise(async (resolve, reject) => {
      resolve();
    }),
};

export const UserContext =
  React.createContext<UserContextType>(defaultUserValues);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserFirebase | null>(null);
  const [loading, setLoading] = useState(true);
  const auth: Auth = getAuth();
  /*
  function signup(email: string, password: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password).then(_ => {
        resolve();
      });
    });
  }

  function login(email: string, password: string): void {
    console.log('inside login');
    console.log('user before login: ', currentUser);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('user after login: ', user);
        setLoading(false);
        setCurrentUser(user);
        // ...
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('login error: ', error.code, error.message);
      });
  }

  function logout(): Promise<void> {
    return signOut(auth).then(_ => {
      // reset signed in user
      setCurrentUser(null);
    });
  }
  */
  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user);
      setCurrentUser(response.user);
      setUserDetails({
        id: response.user.uid,
        hasDoneIntro: true,
        imageUrl: '',
        name: 'Testi1',
        contacts: [],
      } as UserFirebase);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setCurrentUser(response.user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  /*
  useEffect(() => {
    const fetchUser = async (user: User) => {
      const userRef = doc(db, 'Users', user.uid);
      await onSnapshot(userRef, userSnapshot => {
        setUserDetails({
          ...userSnapshot.data(),
          id: userSnapshot.id,
        } as UserFirebase);
      });
    };

    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log('auth changed', user);
      setLoading(false);
      setCurrentUser(user);
      if (!user) return;
      fetchUser(user);
    });

    //unsubscribe from listener on unmount to avoid a memory leak
    return unsubscribe;
  });
  */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        if (!userDetails) {
          console.log('set details');
          setUserDetails({
            id: firebaseUser.uid,
            hasDoneIntro: true,
            imageUrl: '',
            name: 'Testi1',
            contacts: [],
          } as UserFirebase);
        }
        setLoading(false);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
      //logout();
    };
  });

  const value = {
    currentUser,
    userDetails,
    login,
    signup,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
