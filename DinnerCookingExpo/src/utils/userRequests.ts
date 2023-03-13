import { UserFirebase } from './../interfaces/FirebaseSchema';
import {
  collection,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  where,
  getFirestore,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

export const fetchUsers = async (
  db: Firestore,
  userIds: DocumentReference[],
): Promise<UserFirebase[]> => {
  console.log('IN FETCH USERS');

  return new Promise(async (resolve, reject) => {
    if (userIds.length <= 0) resolve([]);

    const usersSnap = await getDocs(
      query(
        collection(db, 'Users'),
        where(
          '__name__',
          'in',
          userIds.map(user => user.id),
        ), // __name__ = id of the document n firestore
      ),
    );

    if (usersSnap.docs.length < 0)
      reject('there was an error while fetching users,');

    resolve(
      usersSnap.docs.map(fetchedUser => {
        const user: UserFirebase = fetchedUser.data() as UserFirebase;
        user.id = fetchedUser.id; // add the document id here as well!
        return user;
      }),
    );
  });
};

export const fetchAllUsers = async (db: Firestore): Promise<UserFirebase[]> => {
  console.log('IN FETCH ALL USERS');

  return new Promise(async (resolve, reject) => {
    const colRef = collection(db, 'Users');
    const usersSnap = await getDocs(colRef);
    resolve(
      usersSnap.docs.map(
        fetchedUser =>
          ({ ...fetchedUser.data(), id: fetchedUser.id } as UserFirebase),
      ),
    );
  });
};

export const createUserDetails = async (
  db: Firestore,
  userId: string,
  userData: UserFirebase,
): Promise<void> => {
  console.log('IN SET OF USER DETAILS');

  const userRef = doc(db, 'Users/' + userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // user already exist
    return;
  }
  // create details for new user
  const userDataWithoutId = Object.fromEntries(
    Object.entries(userData).filter(([key]) => key != 'id'),
  );

  await setDoc(userRef, userDataWithoutId);
};

export const setContactsOfUser = async (
  db: Firestore,
  userId: string,
  contactIds: string[],
): Promise<void> => {
  console.log('IN SET CONTACTS OF USER');

  return new Promise(async (resolve, reject) => {
    const firestore = getFirestore(db.app);
    const userRef = doc(firestore, 'Users/' + userId);
    const contactRefs = contactIds.map(id => doc(firestore, 'Users/' + id));
    await updateDoc(userRef, 'contacts', contactRefs);
    resolve();
  });
};

export const setAllergiesOfUser = async (
  db: Firestore,
  userId: string,
  allergies: string[],
): Promise<void> => {
  console.log('IN SET ALLERGIES OF USER');

  const userRef = doc(db, 'Users/' + userId);
  await updateDoc(userRef, 'allergies', allergies);
};

export const setDietsOfUser = async (
  db: Firestore,
  userId: string,
  diets: string[],
): Promise<void> => {
  console.log('IN SET DIETS OF USER');

  const userRef = doc(db, 'Users/' + userId);
  await updateDoc(userRef, 'diets', diets);
};

export const setUnwantedIngredientsOfUser = async (
  db: Firestore,
  userId: string,
  ingredients: string[],
): Promise<void> => {
  console.log('IN SET UNWANTED INGREDIENTS OF USER');

  const userRef = doc(db, 'Users/' + userId);
  await updateDoc(userRef, 'unwantedIngredients', ingredients);
};

export const setNameOfUser = async (
  db: Firestore,
  userId: string,
  name: string,
): Promise<void> => {
  console.log('IN SET NAME OF USER');

  const userRef = doc(db, 'Users/' + userId);
  await updateDoc(userRef, 'name', name);
};

export const finishIntroOfUser = async (
  db: Firestore,
  userId: string,
): Promise<void> => {
  console.log('IN FINISH USER INTRO');

  const userRef = doc(db, 'Users/' + userId);
  await updateDoc(userRef, { hasDoneIntro: true });
};
