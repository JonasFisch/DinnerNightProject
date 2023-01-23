import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import AddIcon from '../../assets/icons/add.svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Frame } from '../../components/Frame';
import { typography } from '../../styles/Typography';
import { spacing } from '../../styles/Spacing';
import { SelectableList } from '../../components/SelectableList';
import { colors } from '../../styles/Color';

import { useCallback } from 'react';
import { fetchUsers } from '../../utils/dinnerRequests';
import DatabaseContext from '../../contexts/DatabaseContext';
import UserContext from '../../contexts/UserContext';

export const ContactsScreen = () => {
  const navigator = useNavigation();
  const userContext = useContext(UserContext);
  const dbContext = useContext(DatabaseContext);

  const addContacts = () => {
    navigator.navigate('AddContacts');
  };

  const [contacts, setContacts] = useState<string[]>([]);
  const db = dbContext.database;

  // refetch contacts on focus screen
  useEffect(() => {
    const resolveUserContacts = async () => {
      try {
        if (!userContext.userData) throw new Error('User not authenticated.');

        const contactsIds = userContext.userDetails.contacts;

        if (contactsIds.length == 0) return;

        const fetchedContacts = await fetchUsers(db, contactsIds);
        const contactsList: string[] = fetchedContacts.map(
          contact => contact.name,
        );
        setContacts(contactsList);
      } catch (error) {
        console.error(error);
      }
    };

    resolveUserContacts().catch(console.error);
  }, []);

  return (
    <Frame withBottomNavBar={true}>
      <Text style={[typography.h3]}>Contacts</Text>
      <Text style={[typography.subtitle2, styles.contactCount]}>
        {contacts.length} Contacts
      </Text>

      {contacts && (
        <SelectableList items={contacts} isSelectable={false}></SelectableList>
      )}
      <AppButton
        style={styles.addButton}
        onPress={addContacts}
        title="add contacts"
        type={AppButtonType.primary}
        logoSVG={AddIcon}
        widthFitContent={true}
      />
    </Frame>
  );
};

const styles = StyleSheet.create({
  contactCount: {
    marginVertical: spacing.s,
    color: colors.textLight,
  },
  addButton: {
    marginTop: spacing.m,
  },
});
