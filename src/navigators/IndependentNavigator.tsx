import React, { useCallback } from 'react';
import { Constants } from '@/utils';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreens } from './routes';
import { TabBarIcon } from '@/components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/hooks';

const Stack = createStackNavigator();

// @refresh reset
export default function IndependentNavigator() {
  const { Images, Gutters, Layout } = useTheme();
  const navigation = useNavigation();

  const renderHeaderIcon = useCallback(
    () => (
      <TouchableOpacity
        style={[Gutters.tinyLMargin, Layout.rotate90]}
        onPress={() => navigation.goBack()}
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
      screenOptions={{
        headerLeft: renderHeaderIcon,
        headerTitle: '',
      }}
    >
      <Stack.Screen {...MainScreens.settings} />
    </Stack.Navigator>
  );
}
