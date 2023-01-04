/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {Platform, UIManager, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './src/screens/Tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DinnerDetailScreen} from './src/screens/home/DinnerDetails/index';
import {LoginScreen} from './src/screens/auth/LoginScreen';
import {RegisterScreen} from './src/screens/auth/RegisterScreen';
import UserContext from './src/contexts/UserContext';
import {StepScreen} from './src/screens/intro/StepScreen';
import {initializeApp} from 'firebase/app';
import {getAuth, User} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite';
import {INITIAL_USER_DETAILS} from './src/interfaces/UserDetails';
import {Playground} from './src/screens/Playground';
import {IntroWelcomeScreen} from './src/screens/intro/IntroWelcomeScreen';
import {WelcomeScreen} from './src/screens/auth/Welcome';
import {CreateParty} from './src/screens/home/CreateParty';
import DatabaseContext from './src/contexts/DatabaseContext';
import {typography} from './src/styles/Typography';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import StorageContext from './src/contexts/StorageContext';
import { UserFirebase } from './src/interfaces/FirebaseSchema';

// TODO: put this into config file
const firebaseConfig = {
  apiKey: 'AIzaSyAcAK7yLBd7J_saiXDEoDjFBsmsqsVBI0k',
  authDomain: 'dinnercookingplanner.firebaseapp.com',
  databaseURL:
    'https://dinnercookingplanner-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'dinnercookingplanner',
  storageBucket: 'dinnercookingplanner.appspot.com',
  messagingSenderId: '818372515938',
  appId: '1:818372515938:web:441f3a83ac5134ea72593b',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth();
const playground = false;

// activate layout animations
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserFirebase | null>(null);

  // fetch User details and set User State
  const setUserData = async (userData: User) => {
    await fetchUserDetails(userData);
    setUser(userData);
  };

  // logout the current User
  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  // fetch the user details from firestore
  const fetchUserDetails = async (userData: User) => {
    const userRef = doc(db, 'Users', userData.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setUserDetails(docSnap.data() as UserFirebase);
    } else {
      // create new dataset for user
      await setDoc(userRef, INITIAL_USER_DETAILS).then(_data => {
        setUserDetails(INITIAL_USER_DETAILS);
      });
    }
  };

  // send an update to firebase
  const markIntroAsFinished = () => {
    if (!user) {
      console.log('Error: User is not authenticated');
      // TODO: think about what to do here
      return;
    }
    const docRef = doc(db, 'Users', user.uid);
    updateDoc(docRef, {
      hasDoneIntro: true,
    })
      .then(_data => {
        // fetch the user details again
        fetchUserDetails(user);
      })
      .catch(error => {
        // TODO: connection errror (not connection to the server)
        console.log(error);
      });
  };
  
  // check if user is already authenticated
  if (user == null && auth.currentUser != null) {
    setUser(auth.currentUser);
  }

  // load fonts
  const [fontsLoaded] = useFonts({
    ArvoRegular: require('./src/assets/fonts/arvo/Arvo-Regular.ttf'),
    ArvoBold: require('./src/assets/fonts/arvo/Arvo-Bold.ttf'),
    ArvoBoldItalic: require('./src/assets/fonts/arvo/Arvo-BoldItalic.ttf'),
    ArvoItalic: require('./src/assets/fonts/arvo/Arvo-Italic.ttf'),

    ExoBold: require('./src/assets/fonts/exo/static/Exo-Bold.ttf'),
    ExoSemiBold: require('./src/assets/fonts/exo/static/Exo-SemiBold.ttf'),
    ExoBoldItalic: require('./src/assets/fonts/exo/static/Exo-BoldItalic.ttf'),
    ExoItalic: require('./src/assets/fonts/exo/static/Exo-Italic.ttf'),
    ExoRegular: require('./src/assets/fonts/exo/static/Exo-Regular.ttf'),
    ExoMedium: require('./src/assets/fonts/exo/static/Exo-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const AppStack = createNativeStackNavigator();

  if (playground) {
    return <Playground></Playground>;
  }
  return (
    <UserContext.Provider
      value={{
        userData: user,
        auth: auth,
        setUserData: setUserData,
        logout: logout,
        finishIntro: markIntroAsFinished,
        userDetails: userDetails ?? null,
      }}>
      <StorageContext.Provider
        value={{
          storage: storage,
        }}>
        <DatabaseContext.Provider
          value={{
            database: db,
          }}>
            <NavigationContainer>
              <AppStack.Navigator>
                {user ? (
                  <AppStack.Group key={'Authenticated'}>
                    {/* replace this with data from user object */}
                    {userDetails?.hasDoneIntro ? (
                      <AppStack.Group key={'Main'}>
                        <AppStack.Screen
                          name="Tabs"
                          component={Tabs}
                          options={{headerShown: false}}
                          />
                        {/* Sub Screens of Dinner List Screen */}
                        <AppStack.Screen
                          name="PartyDetails"
                          component={DinnerDetailScreen}
                          />
                        <AppStack.Screen
                          name="CreateParty"
                          options={{
                            headerTitle: 'Create Dinner',
                            headerTitleStyle: typography.h4,
                          }}
                          component={CreateParty}
                          />
                        {/* Sub Screens of Friends Screen */}
                        {/* Sub Screens of Settings Screen */}
                      </AppStack.Group>
                    ) : (
                      <AppStack.Group
                      key={'Intro'}
                      screenOptions={{headerShown: false}}>
                        <AppStack.Screen
                          name="Welcome"
                          component={IntroWelcomeScreen}
                          />
                        <AppStack.Screen name="Steps" component={StepScreen} />
                      </AppStack.Group>
                    )}
                  </AppStack.Group>
                ) : (
                  <AppStack.Group
                    key={'Unauthenticated'}
                    screenOptions={{headerShown: false}}>
                    <AppStack.Screen name="Welcome" component={WelcomeScreen} />
                    <AppStack.Screen name="Login" component={LoginScreen} />
                    <AppStack.Screen name="Register" component={RegisterScreen} />
                  </AppStack.Group>
                )}
              </AppStack.Navigator>
            </NavigationContainer>
        </DatabaseContext.Provider>
      </StorageContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
