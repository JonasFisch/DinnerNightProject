import { SelectableListEntry } from '../components/SelectableList';

type ParamList = {
  AddContactsScreen: {
    contacts: SelectableListEntry[];
  };
  AddAllergiesScreen: {
    allergies: SelectableListEntry[];
  };
  DinnerDetailScreen: {
    id: string;
  };
};

export default ParamList;
