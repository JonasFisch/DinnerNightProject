import {DocumentReference, Timestamp} from 'firebase/firestore/lite';
import {UserDetails} from './UserDetails';

type Dinner = {
  date: Timestamp;
  name: string;
  participants: DocumentReference[];
  participantsResolved?: UserDetails[];
  id?: string;
  state: DinnerState;
  admin: DocumentReference;
};

enum DinnerState {
  INVITE,
  VOTING,
  COOKING,
  DELETED,
  FINISHED,
  LOADING,
}

export {Dinner, DinnerState};
