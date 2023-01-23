import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import AddIcon from '../../assets/icons/add.svg';
import { useNavigation } from '@react-navigation/native';
import { Frame } from '../../components/Frame';
import { typography } from '../../styles/Typography';
import { spacing } from '../../styles/Spacing';
import {
  SelectableList,
  SelectableListEntry,
} from '../../components/SelectableList';
import { colors } from '../../styles/Color';
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

  const [contacts, setContacts] = useState<SelectableListEntry[]>([]);
  const db = dbContext.database;

  useEffect(() => {
    const resolveUserContacts = async () => {
      if (!userContext.userData) throw new Error('User not authenticated.');

      const contactsIds = userContext.userDetails.contacts;

      if (contactsIds.length == 0) return;

      const fetchedContacts = await fetchUsers(db, contactsIds);
      const contactsList: SelectableListEntry[] = fetchedContacts.map(
        contact => ({
          id: contact.id,
          label: contact.name,
          image: contact.imageUrl,
        }),
      );
      setContacts(contactsList);
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
