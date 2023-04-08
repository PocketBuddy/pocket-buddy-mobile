import { MainScreens, StackNames } from './routes';
import React, { useCallback } from 'react';
import { Constants } from '@/utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconTypes } from 'types/components';
import { TabBarIcon } from '@/components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/hooks';

const Tab = createBottomTabNavigator();

// @refresh reset
export default function MainNavigator() {
  const { Images, Gutters } = useTheme();
  const navigation = useNavigation();

  const renderTabBarIcon = useCallback(
    ({
      focused,
      size,
      icon,
    }: {
      focused: boolean;
      size: number;
      icon: IconTypes;
    }) => <TabBarIcon icon={icon} focused={focused} size={size} />,
    [],
  );

  const renderHeaderIcon = useCallback(
    () => (
      <TouchableOpacity
        style={[Gutters.tinyLMargin]}
        onPress={() => navigation.navigate(StackNames.independent as never)}
      >
        <TabBarIcon
          icon={Images.icons.settings}
          focused
          size={Constants.HEADER_ICON_SIZE}
        />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: renderHeaderIcon,
        tabBarShowLabel: false,
        headerTitle: '',
      }}
    >
      <Tab.Screen
        {...MainScreens.home}
        options={{
          tabBarIcon: ({ focused, size }) =>
            renderTabBarIcon({ focused, size, icon: Images.icons.home }),
        }}
      />
      <Tab.Screen
        {...MainScreens.transactions}
        options={{
          tabBarIcon: ({ focused, size }) =>
            renderTabBarIcon({
              focused,
              size,
              icon: Images.icons.moneyTransfer,
            }),
        }}
      />
      <Tab.Screen
        {...MainScreens.achievements}
        options={{
          tabBarIcon: ({ focused, size }) =>
            renderTabBarIcon({ focused, size, icon: Images.icons.trophy }),
        }}
      />
      <Tab.Screen
        {...MainScreens.notifications}
        options={{
          tabBarIcon: ({ focused, size }) =>
            renderTabBarIcon({
              focused,
              size,
              icon: Images.icons.notification,
            }),
        }}
      />
    </Tab.Navigator>
  );
}
