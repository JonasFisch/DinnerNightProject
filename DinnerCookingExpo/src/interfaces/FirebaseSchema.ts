import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { DocumentReference, Timestamp } from 'firebase/firestore/lite';

enum DinnerState {
  INVITE,
  VOTING,
  COOKING,
  DELETED,
  FINISHED,
  LOADING,
}

type DinnerFirebase = {
  id?: string;
  admin: DocumentReference;
  date: Timestamp;
  name: string;
  participants: DocumentReference[];
  state: number;
};

type UserFirebase = {
  id: string;
  hasDoneIntro: boolean;
  imageUrl: string;
  name: string;
  contacts: DocumentReference[];
};

export { DinnerState, DinnerFirebase, UserFirebase };
