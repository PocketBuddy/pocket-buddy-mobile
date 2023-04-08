import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { ApplicationStackParamList } from 'types/navigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './Main';
import { MainScreens } from './routes';
import React from 'react';
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
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name={
                  MainScreens.startup.name as keyof ApplicationStackParamList
                }
                component={MainScreens.startup.component}
              />
              <Stack.Screen name="Main" component={MainNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ApplicationNavigator;
