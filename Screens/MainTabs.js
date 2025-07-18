import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import VaultScreen from './VaultScreen';
import EventsScreen from './EventsScreen';
import ProfileScreen from './ProfileScreen';

import FamilyTreeScreen from './FamilyTreeScreen';
import InviteScreen from './InviteScreen';
import CircleScreen from './CircleScreen';
import ContributionScreen from './ContributionScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Vault" component={VaultScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Family Tree" component={FamilyTreeScreen} />
      <Tab.Screen name="Invite" component={InviteScreen} />
      <Tab.Screen name="Circles" component={CircleScreen} />
      <Tab.Screen name="Contribute" component={ContributionScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
