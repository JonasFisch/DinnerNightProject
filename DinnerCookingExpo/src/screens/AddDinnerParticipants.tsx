import React, { useState, useContext, useEffect } from 'react';
import { SearchPage } from '../components/SearchPage';
import { useUserContext } from '../contexts/UserContext';
import DatabaseContext from '../contexts/DatabaseContext';
import { fetchUsers } from '../utils/userRequests';
import { SelectableListEntry } from '../components/SelectableList';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import ParamList from '../utils/ParameterDefinitions';
import { LogBox } from 'react-native';

// nicht schön aber leider notwendig, um die Funktion onSave als Parameter übergeben zu können
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const AddDinnerParticipantsScreen = ({ navigation }) => {
  const route = useRoute<RouteProp<ParamList, 'AddDinnerParticipantsScreen'>>();
  const participants: SelectableListEntry[] = route.params.participants;
  const onSave = route.params.onSave;

  const userContext = useUserContext();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;
  const navigator = useNavigation();

  const [allUsers, setAllUsers] = useState<SelectableListEntry[]>([]);

  const onSaveParticipants = (newParticipantIds: string[]) => {
    const newParticipants = allUsers.filter(element =>
      newParticipantIds.includes(element.id),
    );
    onSave(newParticipants);
    navigator.goBack();
  };

  useEffect(() => {
    const resolveContacts = async () => {
      if (!userContext.userDetails) throw new Error('User not authenticated.');
      const currentUserId = userContext.userDetails.id;
      const userContactIds = userContext.userDetails.contacts;

      const fetchedUsers = await fetchUsers(db, userContactIds);
      const userList: SelectableListEntry[] = fetchedUsers
        .filter(user => user.id != currentUserId)
        .map(user => ({
          id: user.id,
          label: user.name,
          image: user.imageUrl,
        }));
      setAllUsers(userList);
    };
    resolveContacts().catch(console.error);
  }, []);

  return (
    allUsers.length != 0 && (
      <SearchPage
        listItems={allUsers}
        selectedItems={participants.map(item => item.label)}
        onSave={onSaveParticipants}></SearchPage>
    )
  );
};
