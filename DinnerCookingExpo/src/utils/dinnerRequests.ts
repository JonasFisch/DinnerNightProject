import { DinnerState, InviteState, Recipe, UserFirebase } from './../interfaces/FirebaseSchema';
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
  Query,
} from 'firebase/firestore';
import { DinnerFirebase } from '../interfaces/FirebaseSchema';
import { DocumentData, updateDoc } from 'firebase/firestore';

export const fetchDinners = async (
  db: Firestore,
  userDetails: UserFirebase,
): Promise<DinnerFirebase[]> => {
  return new Promise(async (resolve, reject) => {
    console.log('IN FETCHING DINNERS');

    // get data from firebase
    const dinnersSnap = await getDocs(
      query(
        collection(db, 'Dinners'),
        where('__name__', 'in', userDetails.dinners.map(dinner => dinner.id)),
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
 ) => {
  console.log('IN CREATE DINNER');

  const newDinner: DinnerFirebase = {
    date: Timestamp.fromDate(date),
    name,
    participants: [
      {
        user: self, // self
        inviteState: InviteState.PENDING
      },
      ...participants.map(participant => {
        return {
          user: participant,
          inviteState: InviteState.PENDING,
        }
      }),
    ],
    admin: self,
    state: DinnerState.INVITE,
  };

  const dinner = await addDoc(collection(db, 'Dinners'), newDinner);
  
  // update user to diner references
  const userPromises = []
  for (const participant of [self, ...participants]) {
    const participantSnap = await getDoc(participant);
    const participantData = participantSnap.data() as UserFirebase
    const dinners = participantData?.dinners ?? []
    dinners.push(dinner)

    userPromises.push(updateDoc(participant, {dinners}))
  }
  
  await Promise.all(userPromises)

  return dinner;
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

export const leaveDinner = async (db: Firestore, dinnerID: string, userID: string) => {
  console.log("in leave Dinner");
  
  const dinnersSnap = await getDoc(doc(db, `Dinners/${dinnerID}`));
  if (!dinnersSnap.data()) throw new Error('cannot fetch dinner details.');

  const dinner = dinnersSnap.data() as DinnerFirebase;

  const newParticipants = dinner.participants.filter(participant => participant.id != userID)  

  updateDoc(doc(db, `Dinners/${dinnerID}`), {participants: newParticipants})
}

// TODO: call the cloud function here to fetch recipes according to the invited users preferences !
export const fetchRecipesForDinner = (db: Firestore, dinnerID: string) => {
  
}
