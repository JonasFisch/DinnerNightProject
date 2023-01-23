import React, { useContext, useEffect, useState } from 'react';
import { SearchPage } from '../../components/SearchPage';
import UserContext from '../../contexts/UserContext';
import DatabaseContext from '../../contexts/DatabaseContext';
import { fetchAllUsers } from '../../utils/dinnerRequests';
import { SelectableListEntry } from '../../components/SelectableList';

export const AddContactsScreen = () => {
  const userContext = useContext(UserContext);
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  const [allUsers, setAllUsers] = useState<SelectableListEntry[]>([]);

  useEffect(() => {
    const resolveUserContacts = async () => {
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
    resolveUserContacts().catch(console.error);
  }, []);

  return (
    allUsers.length != 0 && (
      <SearchPage listItems={allUsers} onSave={() => {}}></SearchPage>
    )
  );
};
