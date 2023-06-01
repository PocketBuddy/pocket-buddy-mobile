import { MainScreens, StackNames } from './routes';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Constants } from '@/utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconTypes } from 'types/components';
import { TabBarIcon } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/hooks';

const Tab = createBottomTabNavigator();

// @refresh reset
export default function MainNavigator() {
  const { Images, Gutters, Colors, MetricsSizes, Layout } = useTheme();
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

  const renderPlus = useCallback(
    ({ size, icon }: { size: number; icon: IconTypes }) => (
      <View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            ...Layout.absolute,
            ...Gutters.tinyPadding,
            bottom: 30,
            zIndex: 1,
            backgroundColor: Colors.white,
            borderRadius: 50,
          },
        ]}
      >
        {renderTabBarIcon({
          focused: true,
          size: size * 1.4,
          icon: icon,
        })}
      </View>
    ),
    [],
  );

  const renderHeaderIcon = useCallback(
    () => (
      <TouchableOpacity
        style={[Gutters.tinyLMargin]}
        onPress={() => navigation.navigate(StackNames.mainSettings as never)}
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
      initialRouteName={MainScreens.home.name}
      screenOptions={{
        headerLeft: renderHeaderIcon,
        tabBarShowLabel: false,
        headerTitle: '',
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
          backgroundColor: Colors.background,
        },
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          elevation: 0,
          height: MetricsSizes.large,
        },
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
        name={`${MainScreens.manageTransaction.name}Placeholder`}
        component={MainScreens.manageTransaction.component}
        options={{
          tabBarIcon: ({ size }) =>
            renderPlus({ size, icon: Images.icons.plus }),
        }}
        listeners={({ navigation: { navigate } }) => ({
          tabPress: e => {
            e.preventDefault();
            navigate(StackNames.modals, {
              screen: MainScreens.manageTransaction.name,
            });
          },
        })}
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
