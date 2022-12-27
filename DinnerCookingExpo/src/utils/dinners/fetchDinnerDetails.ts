import {User} from 'firebase/auth';
import {Firestore} from 'firebase/firestore';
import {doc, getDoc} from 'firebase/firestore/lite';
import {Dinner} from '../../interfaces/Dinner';
import {DinnerDetailScreenParams} from '../../screens/home/DinnerDetailScreen';

export const fetchDinnerDetails = async (
  db: Firestore,
  dinnerID: string,
): Promise<Dinner> => {
  return new Promise(async (resolve, reject) => {
    const dinnersSnap = await getDoc(doc(db, `Dinners/${dinnerID}`));
    if (!dinnersSnap.data()) {
      reject('cannot fetch dinner details.');
    }
    const dinner = dinnersSnap.data() as Dinner;

    resolve(dinner);
  });
};
