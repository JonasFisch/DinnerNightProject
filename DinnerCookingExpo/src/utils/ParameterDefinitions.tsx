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
};

export default ParamList;
