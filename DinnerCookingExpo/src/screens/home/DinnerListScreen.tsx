import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Tabs} from '../../components/Tabs';
import {Frame} from '../../components/Frame';
import {AppButton} from '../../components/Button';
import {AppButtonType} from '../../interfaces/Button';
import {typography} from '../../styles/Typography';
import {Direction, spacings} from '../../styles/Spacing';
import {DinnerList} from '../../components/DinnerList';
import Logo from '../../assets/icons/add-material.svg';
import {
  collection,
  doc,
  DocumentSnapshot,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';
import DatabaseContext from '../../contexts/DatabaseContext';
import {Dinner} from '../../interfaces/Dinner';
import {UserDetails, ParticipantMap} from '../../interfaces/UserDetails';
import UserContext from '../../contexts/UserContext';
import {onSnapshot, Query, Unsubscribe} from 'firebase/firestore';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback} from 'react';

export const DinnerListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateCreateDinner = () => {
    navigation.navigate('CreateParty');
  };

  const [dinners, setDinners] = useState<Array<Dinner>>([]);
  const [participantsMap, setParticipantsMap] = useState<ParticipantMap>(
    new Map(),
  );
  const dbContext = useContext(DatabaseContext);
  const userContext = useContext(UserContext);

  const db = dbContext.database;
  /**
   * fetches all given participants from the Users Collection
   * @param participants array of user ids
   * @returns
   */
  const fetchParticipants = async (
    participantIds: Array<string>,
  ): Promise<ParticipantMap> => {
    // create query
    const participantRef = collection(db, 'Users');
    const participantsQuery = query(
      participantRef,
      where('__name__', 'in', participantIds), // __name__ = id of the document n firestore
    );

    // fetch participant data from firestore
    const participantsSnap = await getDocs(participantsQuery);
    if (participantsSnap.docs.length < 0) {
      console.log('there was an error while fetching participants');
      return new Map();
    }

    // create save participants in a list
    const map = new Map() as ParticipantMap;
    participantsSnap.docs.forEach(participant => {
      map.set(participant.id, participant.data() as UserDetails);
    });
    return map;
  };

  const fetchDinners = async () => {
    // Create a query for fetch all dinners related to the authenticated user
    const dinnersRef = collection(db, 'Dinners');
    if (!userContext.userData?.uid) {
      console.error('user not authenticated!');
      return;
    }

    // get authenticated user reference
    const userDocRef = doc(db, 'Users', userContext.userData.uid);

    const q = query(
      dinnersRef,
      where('participants', 'array-contains', userDocRef),
    );

    // get data from firebase
    const dinnersSnap = await getDocs(q);
    if (dinnersSnap.docs.length < 0) {
      console.log('could not get dinner snap');
      return;
    }

    // extract data from return data
    const fetchedDinners: Array<Dinner> = dinnersSnap.docs.map(document => {
      const data = document.data() as Dinner;
      data.id = document.id; // extract the document id here
      return data;
    });

    // extract participants data and save into a set
    const participants = new Set<string>(
      fetchedDinners
        .map(data => data.participants.map(participant => participant.id))
        .flat(),
    );

    // IDEA: i think it could be more efficient if we set the Dinners before making the request for the participants
    setDinners(fetchedDinners);

    // get all participants in one request!
    const fetchedParticipants = await fetchParticipants(
      Array.from(participants),
    );

    // set Participants map
    setParticipantsMap(fetchedParticipants);
  };

  // refetch dinners on focus screen
  useFocusEffect(
    useCallback(() => {
      fetchDinners();
    }, []),
  );

  return (
    <Frame>
      <View style={styles.tabs}>
        <Text style={[typography.h3, spacings(Direction.BOTTOM)]}>
          My Dinners
        </Text>
        <Tabs
          tabViews={[
            {
              node: (
                <DinnerList
                  dinners={dinners}
                  participantsMap={participantsMap}
                />
              ),
              title: 'In Progress',
            },
            {node: <Text>Seite 2</Text>, title: 'Archive'},
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

// TODO: WIP here! how to make button sticky at the Bottom!
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
