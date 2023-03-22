import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from '../../components/Tabs';
import { Frame } from '../../components/Frame';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import { typography } from '../../styles/Typography';
import { spacing } from '../../styles/Spacing';
import { DinnerList } from '../../components/DinnerList';
import Logo from '../../assets/icons/add.svg';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useUserContext } from '../../contexts/UserContext';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback } from 'react';
import { fetchDinners } from '../../utils/dinnerRequests';
import {
  DinnerFirebase,
  ParticipantMap,
} from '../../interfaces/FirebaseSchema';
import { onSnapshot } from 'firebase/firestore';

export const DinnerListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateCreateDinner = () => {
    navigation.navigate('CreateDinner');
  };

  const [dinners, setDinners] = useState<DinnerFirebase[]>([]);
  // const [participantsMap, setParticipantsMap] = useState<ParticipantMap>(
  //   new Map(),
  // );

  const userContext = useUserContext();
  const db = useContext(DatabaseContext).database;

  const listenToParticipatedDinners = () => {
    if (!userContext.currentUser) throw new Error('User not authenticated.');

    return fetchDinners(
      db,
      userContext.currentUser.uid,
      (fetchedDinners: DinnerFirebase[]) => setDinners(fetchedDinners),
    );
  };

  useEffect(() => {
    const unsubscribe = listenToParticipatedDinners();

    return () => unsubscribe();
  }, []);

  return (
    <Frame>
      <View style={styles.tabs}>
        <Text style={[typography.h3, { marginBottom: spacing.l }]}>
          My Dinners
        </Text>
        <Tabs
          tabViews={[
            {
              node: <DinnerList dinners={dinners} />,
              title: 'In Progress',
            },
            {
              node: <Text>Seite 2</Text>,
              title: 'Archive',
            },
          ]}
        />
      </View>
      <View style={styles.createButtonWrapper}>
        <AppButton
          onPress={navigateCreateDinner}
          // onPress={() => setNeedsUpdate(true)}
          title="CREATE DINNER"
          type={AppButtonType.primary}
          logoSVG={Logo}
          widthFitContent={true}
          style={styles.createButton}
        />
      </View>
    </Frame>
  );
};

const styles = StyleSheet.create({
  tabs: {
    height: '100%',
  },

  createButton: {
    position: 'absolute',
  },
  createButtonWrapper: {
    // backgroundColor: '#f00',
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
