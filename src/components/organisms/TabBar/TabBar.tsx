import { Button } from '@/components/';
import { ButtonRounded } from 'types/components';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

const SEPARATOR_WIDTH = 0.5;

function TabBarSeparator() {
  const { Colors } = useTheme();

  return (
    <View
      style={{ backgroundColor: Colors.background, width: SEPARATOR_WIDTH }}
    />
  );
}

export default function TabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const { Layout } = useTheme();

  return (
    <View style={[Layout.row]}>
      {state.routes.map((route: any, index) => {
        const { options } = descriptors[route.key];
        const label = route.params.title ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const isFirstItem = index === 0;
        const isLastItem = index === state.routes.length - 1;
        const rounded = isFirstItem
          ? ButtonRounded.Right
          : isLastItem
          ? ButtonRounded.Left
          : undefined;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: { merge: true },
            });
          }
        };

        return (
          <React.Fragment key={label}>
            {isLastItem && <TabBarSeparator />}
            <Button
              key={label}
              label={label}
              onPress={onPress}
              rounded={rounded}
              grayed={!isFocused}
            />
            {!isLastItem && <TabBarSeparator />}
          </React.Fragment>
        );
      })}
    </View>
  );
}
