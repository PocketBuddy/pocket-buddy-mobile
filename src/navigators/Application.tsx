import { MainScreens, StackNames } from './routes';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { ApplicationStackParamList } from 'types/navigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import IndependentNavigator from './IndependentNavigator';
import MainNavigator from './MainNavigator';
import React from 'react';
import StartNavigator from './StartNavigator';
import { ToastHandler } from '@/components';
import { useFlipper } from '@react-navigation/devtools';
import { useTheme } from '@/hooks';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <GestureHandlerRootView style={[Layout.fill]}>
      <BottomSheetModalProvider>
        <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
          <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
            <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
            <Stack.Navigator
              initialRouteName={StackNames.start}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name={
                  MainScreens.startup.name as keyof ApplicationStackParamList
                }
                component={MainScreens.startup.component}
              />
              <Stack.Screen
                name={StackNames.start}
                component={StartNavigator}
              />
              <Stack.Screen name={StackNames.main} component={MainNavigator} />
              <Stack.Screen
                name={StackNames.independent}
                component={IndependentNavigator}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <ToastHandler />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ApplicationNavigator;
