import {Firestore} from 'firebase/firestore';
import {collection, getDocs, query, where} from 'firebase/firestore/lite';
import {ParticipantMap, UserDetails} from '../../interfaces/UserDetails';

/**
 * fetches all given participants from the Users Collection
 * @param participants array of user ids
 * @returns
 */
export const fetchParticipants = async (
  db: Firestore,
  participantIds: Array<string>,
): Promise<ParticipantMap> => {
  return new Promise(async (resolve, reject) => {
    // create query
    const participantRef = collection(db, 'Users');
    const participantsQuery = query(
      participantRef,
      where('__name__', 'in', participantIds), // __name__ = id of the document n firestore
    );

    // fetch participant data from firestore
    const participantsSnap = await getDocs(participantsQuery);
    if (participantsSnap.docs.length < 0) {
      reject('there was an error while fetching participants,');
    }

    // create save participants in a list
    const map = new Map() as ParticipantMap;
    participantsSnap.docs.forEach(participant => {
      map.set(participant.id, participant.data() as UserDetails);
    });

    resolve(map);
  });
};
