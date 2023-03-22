import {
  DinnerState,
  InviteState,
  Recipe,
  UserFirebase,
} from './../interfaces/FirebaseSchema';
import {
  collection,
  doc,
  DocumentReference,
  Firestore,
  query,
  where,
  Timestamp,
  addDoc,
  getDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { DinnerFirebase } from '../interfaces/FirebaseSchema';
import { updateDoc } from 'firebase/firestore';

export const fetchDinners = (
  db: Firestore,
  userId: string,
  onHandleSnapshot: (dinners: DinnerFirebase[]) => void,
): Unsubscribe => {
  console.log('IN FETCHING DINNERS');

  const userRef = doc(db, 'Users/' + userId);
  const dinnerCollection = collection(db, 'Dinners');

  const q = query(
    dinnerCollection,
    where('participants', 'array-contains', userRef),
  );

  const unsubscribe = onSnapshot(q, querySnapshot => {
    onHandleSnapshot(
      querySnapshot.docs
        .filter(doc => doc.data().inviteStates[userId] != InviteState.REJECTED)
        .map(
          dinner =>
            ({
              ...dinner.data(),
              id: dinner.id,
            } as DinnerFirebase),
        ),
    );
  });

  return unsubscribe;
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

  const invites: Record<string, InviteState> = {};
  participants.forEach(user => (invites[user.id] = InviteState.PENDING));

  const newDinner: DinnerFirebase = {
    date: Timestamp.fromDate(date),
    name,
    participants: [...participants, self],
    inviteStates: invites,
    admin: self,
    state: DinnerState.INVITE,
    votes: {},
  };

  const dinner = await addDoc(collection(db, 'Dinners'), newDinner);

  // update user to diner references
  const userPromises = [];
  for (const participant of [self, ...participants]) {
    const participantSnap = await getDoc(participant);
    const participantData = participantSnap.data() as UserFirebase;
    const dinners = participantData?.dinners ?? [];
    dinners.push(dinner);

    userPromises.push(updateDoc(participant, { dinners }));
  }

  await Promise.all(userPromises);

  return dinner;
};

export const fetchRecipe = async (
  db: Firestore,
  recipeID: string,
): Promise<Recipe> => {
  console.log('IN FETCH RECIPE');

  const recipeSnap = await getDoc(doc(db, `Recipes/${recipeID}`));
  if (!recipeSnap.data()) throw new Error('cannot fetch recipe details.');

  return recipeSnap.data() as Recipe;
};

export const leaveDinner = async (
  db: Firestore,
  dinnerID: string,
  userID: string,
) => {
  console.log('in leave Dinner');

  const dinnersSnap = await getDoc(doc(db, `Dinners/${dinnerID}`));
  if (!dinnersSnap.data()) throw new Error('cannot fetch dinner details.');

  const dinner = dinnersSnap.data() as DinnerFirebase;

  const newParticipants = dinner.participants.filter(
    participant => participant.id != userID,
  );

  updateDoc(doc(db, `Dinners/${dinnerID}`), { participants: newParticipants });
};

export const setInviteState = async (
  db: Firestore,
  dinnerID: string,
  inviteStates: Record<string, InviteState>,
): Promise<void> => {
  console.log('IN SET INVITE STATES');

  const dinnerRef = doc(db, 'Dinners/' + dinnerID);
  await updateDoc(dinnerRef, 'inviteStates', inviteStates);
};

// TODO: call the cloud function here to fetch recipes according to the invited users preferences !
export const fetchRecipesForDinner = (db: Firestore, dinnerID: string) => {};
