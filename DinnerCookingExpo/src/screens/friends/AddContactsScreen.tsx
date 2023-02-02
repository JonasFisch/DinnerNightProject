import React, { useContext, useEffect, useState } from 'react';
import { SearchPage } from '../../components/SearchPage';
import UserContext from '../../contexts/UserContext';
import DatabaseContext from '../../contexts/DatabaseContext';
import {
  fetchAllUsers,
  fetchUsers,
  setContactsOfUser,
} from '../../utils/dinnerRequests';
import { SelectableListEntry } from '../../components/SelectableList';
import { useNavigation } from '@react-navigation/native';

export const AddContactsScreen = ({ route }) => {
  const { contacts }: { contacts: SelectableListEntry[] } = route.params;
  const userContext = useContext(UserContext);
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  const [allUsers, setAllUsers] = useState<SelectableListEntry[]>([]);

  useEffect(() => {
    const resolveAllUsers = async () => {
      if (!userContext.userData) throw new Error('User not authenticated.');
      const currentUserId = userContext.userDetails.id;

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
      if (!userContext.userData) throw new Error('User not authenticated.');
      await setContactsOfUser(db, userContext.userData.uid, newContactIds);
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
