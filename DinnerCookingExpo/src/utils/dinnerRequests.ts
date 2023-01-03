import {User} from 'firebase/auth';
import {collection, doc, getDocs, query, where} from 'firebase/firestore/lite';
import { Dinner } from '../interfaces/Dinner';
import { DinnerFirebase } from '../interfaces/FirebaseSchema';

export const fetchDinners = async (
  db: Firestore,
  userData: User,
): Promise<DinnerFirebase> => {
  return new Promise(async (resolve, reject) => {
    // get data from firebase
    const dinnersSnap = await getDocs(
      query(
        collection(db, 'Dinners'),
        where(
					'participants', 
					'array-contains', 
					doc(db, 'Users', userData.uid)),
      ),
    );

    if (!dinnersSnap.docs) {
      reject('could not get dinner snap.');
    }

    // extract data from return data
    const fetchedDinners: Array<Dinner> = dinnersSnap.docs.map(document => {
      const data = document.data() as Dinner;
      data.id = document.id; // extract the document id here
      return data;
    });

    // extract participants data and save into a set
    const participants = new Set<string>(
      fetchedDinners
        .map(data => data.participants.map(participant => participant.id))
        .flat(),
    );

    resolve({
      dinners: fetchedDinners,
      rawParticipants: participants,
    });
  });
};
