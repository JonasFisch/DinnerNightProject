import { Ingredients } from './../components/Ingredients';
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { DocumentReference, Timestamp } from 'firebase/firestore';

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
  inviteStates: {},
};

export enum InviteState {
  PENDING,
  ACCEPTED,
  REJECTED,
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
  inviteStates: { [key: string]: InviteState };
  contacts: DocumentReference[];
};

export type Ingredient = {
  asile: string;
  amount: number;
  consistency: string;
  measures: {
    metric: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
    us: {
      amout: number;
      unitLong: string;
      unitShort: string;
    };
  };
  meta: string[];
  name: string;
  nameClean: string;
}

type Recipe = {
  aggregateLikes: number;
  dishTypes: string[];
  diets: string[];
  image: string;
  instructions: string;
  readyInMinutes: number;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
  servings: number;
  analyzedInstructions: [
    {
      name: string;
      steps: [
        {
          number: number;
          ingredients: [
            {
              image: string;
              localizedName: string;
              name: string;
            },
          ];
          equipment: [
            {
              image: string;
              localizedName: string;
              name: string;
            },
          ];
          step: string;
        },
      ];
    },
  ];
  extendedIngredients: Ingredient[];
};

export { DinnerState, DinnerFirebase, UserFirebase, Recipe };
