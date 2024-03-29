import React, { useContext, useEffect, useState } from 'react';
import { SearchPage } from '../../components/SearchPage';
import { useUserContext } from '../../contexts/UserContext';
import DatabaseContext from '../../contexts/DatabaseContext';
import { fetchAllUsers, setContactsOfUser } from '../../utils/userRequests';
import { SelectableListEntry } from '../../components/SelectableList';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import ParamList from '../../utils/ParameterDefinitions';

export const AddContactsScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'AddContactsScreen'>>();
  const contacts: SelectableListEntry[] = route.params.contacts;
  const userContext = useUserContext();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;
  const navigator = useNavigation();

  const [allUsers, setAllUsers] = useState<SelectableListEntry[]>([]);

  useEffect(() => {
    const resolveAllUsers = async () => {
      if (!userContext.currentUser) throw new Error('User not authenticated.');
      const currentUserId = userContext.currentUser.uid;

      const fetchedUsers = await fetchAllUsers(db);
      const userList: SelectableListEntry[] = fetchedUsers
        .filter(user => user.id != currentUserId)
        .map(user => ({
          id: user.id,
          label: user.name,
          image: user.imageUrl,
        }));
      setAllUsers(userList);
    };
    resolveAllUsers().catch(console.error);
  }, []);

  const onSaveContacts = async (newContactIds: string[]) => {
    try {
      if (!userContext.currentUser) throw new Error('User not authenticated.');
      await setContactsOfUser(
        db,
        userContext.currentUser.uid,
        newContactIds,
      ).then(() => {
        navigator.goBack();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    allUsers.length != 0 && (
      <SearchPage
        listItems={allUsers}
        selectedItems={contacts.map(contact => contact.label)}
        onSave={onSaveContacts}></SearchPage>
    )
  );
};
