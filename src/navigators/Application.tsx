import { MainScreens, ScreenNames, StackNames } from './routes';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { ApplicationStackParamList } from 'types/navigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './MainNavigator';
import ModalNavigator from './ModalNavigator';
import React from 'react';
import SettingsNavigator from './SettingsNavigator';
import StartNavigator from './StartNavigator';
import { ToastHandler } from '@/components';
import { useFlipper } from '@react-navigation/devtools';
import { useTheme } from '@/hooks';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme, Colors } = useTheme();
  const { colors } = NavigationTheme;
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <GestureHandlerRootView style={[Layout.fill]}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ backgroundColor: Colors.background }} />
        <SafeAreaView style={[Layout.fill, { backgroundColor: Colors.white }]}>
          <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={colors.background}
            />
            <Stack.Navigator
              initialRouteName={ScreenNames.startup}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name={ScreenNames.startup}
                component={MainScreens.startup.component}
              />
              <Stack.Screen
                name={StackNames.start}
                component={StartNavigator}
              />
              <Stack.Screen name={StackNames.main} component={MainNavigator} />
              <Stack.Screen
                name={StackNames.mainSettings}
                component={SettingsNavigator}
              />
              <Stack.Screen
                name={StackNames.modals}
                component={ModalNavigator}
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
