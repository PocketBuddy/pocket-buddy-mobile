import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React, { useCallback } from 'react';
import { TabBar } from '@/components';
import { TabScreens } from 'types/components';
import { useTheme } from '@/hooks';

type Props = {
  screens: TabScreens;
};

const Tab = createMaterialTopTabNavigator();

export default function Tabs({ screens }: Props) {
  const { Gutters, Colors } = useTheme();
  const renderTabBar = useCallback(
    (props: MaterialTopTabBarProps) => <TabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      sceneContainerStyle={{
        ...Gutters.smallTPadding,
        backgroundColor: Colors.background,
      }}
    >
      {screens.map(({ name, component }) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
}
