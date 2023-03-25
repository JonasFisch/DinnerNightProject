import { SelectableListEntry } from '../components/SelectableList';
import { DinnerFirebase, UserFirebase } from '../interfaces/FirebaseSchema';
import { EatingPreferenceType } from '../screens/preferences/AddEatingPreferenceScreen';

type ParamList = {
  AddContactsScreen: {
    contacts: SelectableListEntry[];
  };
  DinnerDetailScreen: {
    id: string;
  };
  RecipeDetailScreen: {
    id: string;
    canFinishDinner: boolean;
    dinnerID: string;
  },
  CreateDinner: {
    dinner?: DinnerFirebase,
    participants?: UserFirebase[]
  },
  AddEatingPreferenceScreen: {
    type: EatingPreferenceType;
    preselectedItems: SelectableListEntry[];
  };
  AddDinnerParticipantsScreen: {
    participants: SelectableListEntry[];
    onSave: (items: SelectableListEntry[]) => void;
  };
  EditUsernameScreen: {
    userId: string;
    name: string;
  };
};

export default ParamList;
