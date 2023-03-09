/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Platform, UIManager, useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from './src/screens/Tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DinnerDetailScreen } from './src/screens/home/DinnerDetails/index';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { RegisterScreen } from './src/screens/auth/RegisterScreen';
import {
  useUserContext,
  UserProvider,
  UserContext,
} from './src/contexts/UserContext';
import { StepScreen } from './src/screens/intro/StepScreen';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import { Playground } from './src/screens/Playground';
import { IntroWelcomeScreen } from './src/screens/intro/IntroWelcomeScreen';
import { WelcomeScreen } from './src/screens/auth/Welcome';
import { CreateParty } from './src/screens/home/CreateParty';
import DatabaseContext from './src/contexts/DatabaseContext';
import { typography } from './src/styles/Typography';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import StorageContext from './src/contexts/StorageContext';
import { AddContactsScreen } from './src/screens/friends/AddContactsScreen';
import RecepieCarousel from './src/components/Carousel/RecepieCarousel';
import { RecipeShow } from './src/screens/recipe/RecipeShow';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { setupEmulators } from './Firebase';
import { IntroFinishScreen } from './src/screens/intro/IntroFinishScreen';
import { AddAllergiesScreen } from './src/screens/preferences/AddAllergiesScreen';

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
// config
const localEnvironment = true;

// setup firebase app
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, `http://192.168.2.33:9099`)
const db = getFirestore(firebaseApp);
// connectFirestoreEmulator(db, 'localhost', 8080);
const storage = getStorage(firebaseApp);

const App = () => {
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

  return (
    <StorageContext.Provider
      value={{
        storage: storage,
      }}>
      <DatabaseContext.Provider
        value={{
          database: db,
        }}>
        <UserProvider auth={auth}>
          <NavigationContainer>
            <UserContext.Consumer>
              {value => (
                <AppStack.Navigator>
                  {value.currentUser ? (
                    <AppStack.Group key={'Authenticated'}>
                      {/* replace this with data from user object */}
                      {value.userDetails?.hasDoneIntro ? (
                        <AppStack.Group key={'Main'}>
                          <AppStack.Screen
                            name="Tabs"
                            component={Tabs}
                            options={{ headerShown: false }}
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
                          <AppStack.Screen
                            name="Recipe"
                            component={RecipeShow}
                          />
                          {/* Sub Screens of Friends Screen */}
                          <AppStack.Screen
                            name="AddContacts"
                            component={AddContactsScreen}
                          />
                          {/* Sub Screens of Settings Screen */}
                        </AppStack.Group>
                      ) : (
                        <AppStack.Group
                          key={'Intro'}
                          screenOptions={{ headerShown: false }}>
                          <AppStack.Screen
                            name="Welcome"
                            component={IntroWelcomeScreen}
                          />
                          <AppStack.Screen
                            name="Steps"
                            component={StepScreen}
                          />
                          <AppStack.Screen
                            name="AddAllergies"
                            component={AddAllergiesScreen}
                            options={{ headerShown: true }}
                          />
                          <AppStack.Screen
                            name="Finish"
                            component={IntroFinishScreen}
                          />
                        </AppStack.Group>
                      )}
                    </AppStack.Group>
                  ) : (
                    <AppStack.Group
                      key={'Unauthenticated'}
                      screenOptions={{ headerShown: false }}>
                      <AppStack.Screen
                        name="Welcome"
                        component={WelcomeScreen}
                      />
                      <AppStack.Screen name="Login" component={LoginScreen} />
                      <AppStack.Screen
                        name="Register"
                        component={RegisterScreen}
                      />
                    </AppStack.Group>
                  )}
                </AppStack.Navigator>
              )}
            </UserContext.Consumer>
          </NavigationContainer>
        </UserProvider>
      </DatabaseContext.Provider>
    </StorageContext.Provider>
  );
};

export default App;
