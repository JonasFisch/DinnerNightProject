import {DocumentReference, Timestamp} from 'firebase/firestore/lite';
import {UserDetails} from './UserDetails';

export type Dinner = {
  date: Timestamp;
  name: string;
  participants: DocumentReference[];
  participantsResolved?: UserDetails[];
  id?: string;
};
