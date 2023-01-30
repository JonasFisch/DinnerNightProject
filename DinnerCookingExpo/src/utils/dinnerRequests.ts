import { DinnerState, UserFirebase } from './../interfaces/FirebaseSchema';
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
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { DinnerFirebase } from '../interfaces/FirebaseSchema';

export const fetchDinners = async (
  db: Firestore,
  userData: User,
): Promise<DinnerFirebase[]> => {
  return new Promise(async (resolve, reject) => {
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
  return new Promise(async (resolve, reject) => {
    const dinnersSnap = await getDoc(doc(db, `Dinners/${dinnerID}`));
    if (!dinnersSnap.data()) reject('cannot fetch dinner details.');

    const dinner = dinnersSnap.data() as DinnerFirebase;
    resolve(dinner);
  });
};

export const fetchUsers = async (
  db: Firestore,
  userIds: DocumentReference[],
): Promise<UserFirebase[]> => {
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

export const setContactsOfUser = async (
  db: Firestore,
  userId: string,
  contactIds: string[],
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    if (!userId) reject();
    const firestore = getFirestore(db.app);
    const userRef = doc(firestore, 'Users/' + userId);
    const contactRefs = contactIds.map(id => doc(firestore, 'Users/' + id));
    await updateDoc(userRef, 'contacts', contactRefs);
    resolve();
  });
};

export const fetchParticipants = async (
  db: Firestore,
  participants: DocumentReference[],
): Promise<UserFirebase[]> => {
  return new Promise(async (resolve, reject) => {
    // fetch participant data from firestore

    if (participants.length <= 0) resolve([]);

    const participantsSnap = await getDocs(
      query(
        collection(db, 'Users'),
        where(
          '__name__',
          'in',
          participants.map(participant => participant.id),
        ), // __name__ = id of the document n firestore
      ),
    );

    if (participantsSnap.docs.length < 0)
      reject('there was an error while fetching participants,');

    resolve(
      participantsSnap.docs.map(participant => {
        const user: UserFirebase = participant.data() as UserFirebase;
        user.id = participant.id; // add the document id here as well!
        return user;
      }),
    );
  });
};

export const createDinner = async (
  db: Firestore,
  participants: DocumentReference[],
  self: DocumentReference,
  date: Date,
  name: string,
): Promise<DocumentReference> => {
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
