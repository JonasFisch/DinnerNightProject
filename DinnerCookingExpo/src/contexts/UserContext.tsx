import React, { useContext, useState, useEffect } from 'react';
import {
  Auth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  Unsubscribe,
  User,
  UserCredential,
} from 'firebase/auth';
import { UserFirebase } from '../interfaces/FirebaseSchema';
import { doc, onSnapshot } from 'firebase/firestore';
import DatabaseContext from './DatabaseContext';
import { createUserDetails } from '../utils/userRequests';

export type UserContextType = {
  currentUser: User | null;
  userDetails: UserFirebase | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  snapshotSubscriptions: Unsubscribe[];
  setSnapshotSubscriptions: (values: Unsubscribe[]) => void;
};

const defaultUserValues = {
  currentUser: null,
  userDetails: null,
  login: (email: string, password: string): Promise<UserCredential> =>
    new Promise(async (resolve, reject) => {
      resolve({} as UserCredential);
    }),
  signup: (email: string, password: string): Promise<UserCredential> =>
    new Promise(async (resolve, reject) => {
      resolve({} as UserCredential);
    }),
  logout: (): Promise<void> =>
    new Promise(async (resolve, reject) => {
      resolve();
    }),
  snapshotSubscriptions: [],
  setSnapshotSubscriptions: (values: Unsubscribe[]) => {},
};

export const UserContext =
  React.createContext<UserContextType>(defaultUserValues);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: Auth;
}) {
  const INITIAL_USER_DETAILS: UserFirebase = {
    id: '',
    hasDoneIntro: false,
    name: '',
    imageUrl: '',
    contacts: [],
    allergies: [],
    diets: [],
    unwantedIngredients: [],
  };

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserFirebase | null>(null);
  const [snapshotSubscriptions, setSnapshotSubscriptions] = useState<
    Unsubscribe[]
  >([]);
  const [loading, setLoading] = useState(true);
  // const auth: Auth = getAuth();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      snapshotSubscriptions.forEach(unsubscribe => unsubscribe());
      await signOut(auth);
      setCurrentUser(null);
      setUserDetails(null);
    } catch (error) {
      console.error(error);
    }
  };

  const registerListenerOnUserDetails = (id: string) => {
    const userRef = doc(db, 'Users', id);
    const unsubscribe: Unsubscribe = onSnapshot(userRef, userSnapshot => {
      setUserDetails({
        ...userSnapshot.data(),
        id: userSnapshot.id,
      } as UserFirebase);
    });
    setSnapshotSubscriptions([...snapshotSubscriptions, unsubscribe]);
  };

  useEffect(() => {
    // onAuthStateChanged will be called on every login, signup or other auth dependend state changes
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      console.log('on Auth State changed');
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        createUserDetails(db, firebaseUser.uid, INITIAL_USER_DETAILS);
        if (!userDetails) {
          registerListenerOnUserDetails(firebaseUser.uid);
        }
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userDetails,
    login,
    signup,
    logout,
    snapshotSubscriptions,
    setSnapshotSubscriptions,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
