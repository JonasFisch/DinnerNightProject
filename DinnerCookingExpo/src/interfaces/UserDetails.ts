interface UserDetails {
  hasDoneIntro: boolean;
  userId: string | null;
  name: string;
  imageUrl: string;
  // inviteStates: {};
}

const INITIAL_USER_DETAILS: UserDetails = {
  hasDoneIntro: false,
  userId: null,
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

export type ParticipantMap = Map<string, UserDetails | null>;

export {INITIAL_USER_DETAILS};
export type {UserDetails};
