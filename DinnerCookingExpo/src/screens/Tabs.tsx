import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ContactsScreen } from './friends/ContactsScreen';
import { DinnerListScreen } from './home/DinnerListScreen';
import { SettingScreen } from './settings/SettingScreen';
// Tab Bar Icons
import HomeIcon from '../assets/icons/home.svg';
import ContactIcon from '../assets/icons/person_add.svg';
import SettingsIcon from '../assets/icons/settings.svg';

export const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Dinners">
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color }) => <ContactIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Dinners"
        component={DinnerListScreen}
        options={{
          tabBarLabel: 'Dinners',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
        initialParams={{ needsUpdate: true }}
      />
      <Tab.Screen
        name="Preferences"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Preferences',
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
