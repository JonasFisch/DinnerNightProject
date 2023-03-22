import { SelectableListEntry } from '../components/SelectableList';
import { EatingPreferenceType } from '../screens/preferences/AddEatingPreferenceScreen';

type ParamList = {
  AddContactsScreen: {
    contacts: SelectableListEntry[];
  };
  DinnerDetailScreen: {
    id: string;
  };
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
