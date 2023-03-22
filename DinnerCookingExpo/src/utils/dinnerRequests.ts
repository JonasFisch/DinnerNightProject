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
  getDocs,
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

// export const fetchDinner = async (
//   db: Firestore,
//   dinnerID: string,
// ): Promise<DinnerFirebase> => {
//   console.log('IN FETCHING SINGLE DINNER');

//   return new Promise(async (resolve, reject) => {
//     const dinnersSnap = await getDoc(doc(db, `Dinners/${dinnerID}`));
//     if (!dinnersSnap.data()) reject('cannot fetch dinner details.');

//     const dinner = dinnersSnap.data() as DinnerFirebase;
//     dinner.id = dinnersSnap.id;
//     resolve(dinner);
//   });
// };

export const fetchDinner = (
  db: Firestore,
  dinnerID: string,
  onHandleSnapshot: (dinner: DinnerFirebase) => void,
): Unsubscribe => {
  console.log('IN FETCHING DINNER');
  const unsubscribe = onSnapshot(doc(db, "Dinners", dinnerID), (doc) => {
    const dinner = doc.data() as DinnerFirebase
    dinner.id = doc.id
    onHandleSnapshot(dinner)
  })

  return unsubscribe;
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
    // participants: [
    //   {
    //     user: self,
    //     inviteState: InviteState.ACCEPTED,
    //     vote: null
    //   },
    //   ...participants.map(participant => {
    //     return {
    //       user: participant,
    //       inviteState: InviteState.PENDING,
    //       vote: null,
    //     }
    //   }),
    // ],
    // recipes: [],
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

  const recipe = recipeSnap.data() as Recipe
  recipe.id = recipeSnap.id

  return recipe;
};

export const fetchRecipes = async (
  db: Firestore,
  recipeIds: string,
): Promise<Recipe[]> => {
  console.log('IN FETCH RECIPES');

  
  const q = query(
    collection(db, 'Recipes'),
    where('__name__', 'in', recipeIds),
  );

  const recipesSnapshot = await getDocs(q);

  const recipes = []
  for (const doc of recipesSnapshot.docs) {
    const recipe = doc.data() as Recipe
    recipe.id = doc.id
    recipes.push(recipe) 
  }
  
  return recipes;
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

export const setVotingTerminated = async (
  db: Firestore,
  dinnerID: string,
) => {
  console.log("IN SET VOTING TERMINATED");

  const dinnerRef = doc(db, "Dinners/" + dinnerID);
  await updateDoc(dinnerRef, "state", DinnerState.COOKING)
}

export const finishDinner = async (
  db: Firestore,
  dinnerID: string,
) => {
  console.log("IN FINISH DINNER");
  
  const dinnerRef = doc(db, "Dinners/" + dinnerID);
  await updateDoc(dinnerRef, "state", DinnerState.FINISHED)
}

export const setVote = async (db: Firestore, dinnerID: string, recipeID: string, userID: string) => {
  console.log("IN SET VOTE");
  
  const dinnerRef = doc(db, "Dinners/" + dinnerID);
  const dinnerSnap = await getDoc(dinnerRef);
  const dinner = dinnerSnap.data() as DinnerFirebase
  const votes = dinner?.votes

  votes[userID] = recipeID;

  await updateDoc(dinnerRef, "votes", votes)
}

export const loadRecipesForDinner = async (db: Firestore, dinner: DinnerFirebase, users: UserFirebase[]) => {
  console.log("IN LOAD RECIPES FOR DINNER");
    
  const allergies = new Set<string>()
  const diets = new Set<string>()
  for (const user of users) {
    user.allergies?.forEach(allergie => allergies.add(allergie))
    user.unwantedIngredients?.forEach(ingredient => diets.add(ingredient))
  }  
  
  const response = await fetch("https://us-central1-dinnercookingplanner.cloudfunctions.net/fetchRecipes", {
    method: "POST",
    body: JSON.stringify({
      diets: Array.from(allergies),
      allergies: Array.from(diets),
    })
  })

  const responseData = await response.json()
  const recipes: string[] = responseData.recipes 
  
  console.log(recipes);

  const recipeReferences = []
  for (const recipe of recipes) {
    recipeReferences.push(doc(db, 'Recipes/' + recipe))
  }

  console.log(dinner.id);
  // set recipes for dinner
  const dinnerRef = doc(db, "Dinners/" + dinner.id)
  await updateDoc(dinnerRef, {'recipes': recipeReferences, "state": DinnerState.VOTING});
  
  return
}

