import { MainScreens, ScreenNames } from './routes';
import React, { useCallback } from 'react';
import { Constants } from '@/utils';
import { createStackNavigator } from '@react-navigation/stack';
import { TabBarIcon } from '@/components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/hooks';

const Stack = createStackNavigator();

// @refresh reset
export default function SettingsNavigator() {
  const { Images, Gutters, Layout, Colors } = useTheme();
  const navigation = useNavigation();

  const renderHeaderIcon = useCallback(
    (shouldBackToSettings = false) => (
      <TouchableOpacity
        style={[Gutters.tinyLMargin, Layout.rotate90]}
        onPress={() =>
          shouldBackToSettings
            ? navigation.navigate(ScreenNames.settings as never)
            : navigation.goBack()
        }
      >
        <TabBarIcon
          icon={Images.icons.arrowDown}
          focused
          size={Constants.HEADER_ICON_SIZE}
        />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <Stack.Navigator
      initialRouteName={MainScreens.settings.name}
      screenOptions={{
        headerLeft: () => renderHeaderIcon(false),
        headerTitle: '',
        headerStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen {...MainScreens.settings} />
      <Stack.Group
        screenOptions={{
          headerLeft: () => renderHeaderIcon(true),
        }}
      >
        <Stack.Screen {...MainScreens.manageCategories} />
        <Stack.Screen {...MainScreens.managePriorities} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
