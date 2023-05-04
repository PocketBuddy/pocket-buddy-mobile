import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React, { useCallback } from 'react';
import { TabBar } from '@/components';
import { TabScreens } from 'types/components';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  screens: TabScreens;
};

const Tab = createMaterialTopTabNavigator();

export default function Tabs({ screens }: Props) {
  const { t } = useTranslation(['screens']);
  const { Gutters, Colors } = useTheme();
  const renderTabBar = useCallback(
    (props: MaterialTopTabBarProps) => <TabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      initialRouteName={screens[0].name}
      sceneContainerStyle={{
        ...Gutters.tinyTPadding,
        backgroundColor: Colors.background,
      }}
    >
      {screens.map(({ parentScreenName, name, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          initialParams={{
            title: t(parentScreenName, { context: name, defaultValue: name }),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate({ name: route.name, merge: true });
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
}
