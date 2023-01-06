import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from './src/components/Button';
import { typography } from './src/styles/Typography';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { AppButtonType } from './src/interfaces/Button';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { Playground } from './src/screens/Playground';
import { NavigationContainer } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default function App2() {
  // firebase config
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
  const auth = getAuth();
  const playground = false;

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
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="Tabs" component={Playground}></AppStack.Screen>
      </AppStack.Navigator>
    </NavigationContainer>
  );

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={typography.h2}>
        Open up App.js to start working on your app!
      </Text>

      <AppButton title="test" type={AppButtonType.primary} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
