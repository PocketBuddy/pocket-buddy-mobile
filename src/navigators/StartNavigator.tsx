import { createStackNavigator } from '@react-navigation/stack';
import { MainScreens } from './routes';
import React from 'react';

const Stack = createStackNavigator();

// @refresh reset
export default function StartNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen {...MainScreens.auth} />
    </Stack.Navigator>
  );
}
