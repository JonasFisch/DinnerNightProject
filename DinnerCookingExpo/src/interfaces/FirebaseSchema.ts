import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { DocumentReference, Timestamp } from "firebase/firestore/lite"

enum DinnerState {
	INVITE,
	VOTING,
	COOKING,
	DELETED,
	FINISHED,
	LOADING,
}

export type ParticipantMap = Map<string, UserFirebase>;

export const INITIAL_USER_DETAILS: UserFirebase = {
	id: '',
  hasDoneIntro: false,
  name: '',
  imageUrl: '',
  inviteStates: {}
};


export enum InviteState {
	PENDING,
	ACCEPTED,
	REJECTED,
  }
  
type DinnerFirebase = {
	id?: string,
	admin: DocumentReference
	date: Timestamp,
	name: string,
	participants: DocumentReference[];
	state: number,
} 

type UserFirebase = {
	id: string,
	hasDoneIntro: boolean,
	imageUrl: string,
	name: string,
	inviteStates: {[key: string]: InviteState}
}

export {DinnerState, DinnerFirebase, UserFirebase}