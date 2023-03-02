import { DinnerState, Recipe } from './../interfaces/FirebaseSchema';
import { User } from 'firebase/auth';
import {
  collection,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
  getDoc,
} from 'firebase/firestore';
import { DinnerFirebase } from '../interfaces/FirebaseSchema';
import { DocumentData } from 'firebase/firestore';

export const fetchDinners = async (
  db: Firestore,
  userData: User,
): Promise<DinnerFirebase[]> => {
  return new Promise(async (resolve, reject) => {
    console.log('IN FETCHING DINNERS');

    // get data from firebase
    const dinnersSnap = await getDocs(
      query(
        collection(db, 'Dinners'),
        where('participants', 'array-contains', doc(db, 'Users', userData.uid)),
      ),
    );

    if (!dinnersSnap.docs) reject('could not get dinner snap.');
    resolve(
      dinnersSnap.docs.map(dinner => {
        const din = dinner.data() as DinnerFirebase;
        din.id = dinner.id;
        return din;
      }),
    );
  });
};

export const fetchDinner = async (
  db: Firestore,
  dinnerID: string,
): Promise<DinnerFirebase> => {
  console.log('IN FETCHING SINGLE DINNER');

  return new Promise(async (resolve, reject) => {
    const dinnersSnap = await getDoc(doc(db, `Dinners/${dinnerID}`));
    if (!dinnersSnap.data()) reject('cannot fetch dinner details.');

    const dinner = dinnersSnap.data() as DinnerFirebase;
    dinner.id = dinnersSnap.id;
    resolve(dinner);
  });
};

export const createDinner = async (
  db: Firestore,
  participants: DocumentReference[],
  self: DocumentReference,
  date: Date,
  name: string,
): Promise<DocumentReference> => {
  console.log('IN CREATE DINNER');

  return new Promise(async (resolve, reject) => {
    const newDinner: DinnerFirebase = {
      date: Timestamp.fromDate(date),
      name,
      participants: [
        self, // self
        ...participants,
      ],
      admin: self,
      state: DinnerState.INVITE,
    };

    const newDinnerDoc = await addDoc(collection(db, 'Dinners'), newDinner);

    resolve(newDinnerDoc);
  });
};

export const fetchRecipe = async (
  db: Firestore,
  recipeID: string,
): Promise<Recipe> => {
  console.log("IN FETCH RECIPE");

  const recipeSnap = await getDoc(doc(db, `Recipes/${recipeID}`));
  if (!recipeSnap.data()) throw new Error('cannot fetch recipe details.');

  return recipeSnap.data() as Recipe;
};
