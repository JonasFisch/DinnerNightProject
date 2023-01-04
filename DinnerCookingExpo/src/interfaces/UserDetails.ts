import { UserFirebase } from "./FirebaseSchema";

const INITIAL_USER_DETAILS: UserFirebase = {
  id: '',
  hasDoneIntro: false,
  name: '',
  imageUrl: '',
};

export enum InviteState {
  PENDING,
  ACCEPTED,
  REJECTED,
}

export type Participant = {
  userId: string;
  imageUrl?: string;
  username: string;
  inviteState: InviteState;
};

export type ParticipantMap = Map<string, UserFirebase>;

export {INITIAL_USER_DETAILS};
