interface UserDetails {
  hasDoneIntro: boolean;
  userId: string | null;
  name: string;
  imageUrl: string;
}

const INITIAL_USER_DETAILS: UserDetails = {
  hasDoneIntro: false,
  userId: null,
  name: '',
  imageUrl: '',
};

export type Participant = {
  userId: string;
  imageUrl?: string;
  username: string;
};

export type ParticipantMap = Map<string, UserDetails | null>;

export {INITIAL_USER_DETAILS};
export type {UserDetails};
