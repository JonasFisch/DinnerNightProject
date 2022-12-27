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
import DatabaseContext from '../../contexts/DatabaseContext';
import {Dinner} from '../../interfaces/Dinner';
import {ParticipantMap} from '../../interfaces/UserDetails';
import UserContext from '../../contexts/UserContext';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback} from 'react';
import {fetchParticipants} from '../../utils/participants/fetchParticipants';
import {fetchDinners} from '../../utils/dinners/fetchDinners';

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

  const userContext = useContext(UserContext);
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  const resolveDinners = async () => {
    try {
      if (!userContext.userData) {
        throw new Error('User not authenticated.');
      }
      const data = await fetchDinners(db, userContext.userData);
      // IDEA: i think it could be more efficient if we set the Dinners before making the request for the participants
      setDinners(data.dinners);
      // get all participants in one request!
      const fetchedParticipants = await fetchParticipants(
        db,
        Array.from(data.rawParticipants),
      );
      // set Participants map
      setParticipantsMap(fetchedParticipants);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  // refetch dinners on focus screen
  useFocusEffect(
    useCallback(() => {
      resolveDinners();
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
