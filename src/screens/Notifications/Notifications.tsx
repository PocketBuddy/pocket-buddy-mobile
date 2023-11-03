import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks';

export default function Notifications() {
  const { Colors, Gutters, Layout } = useTheme();

  return (
    <View
      style={[
        Layout.fill,
        Gutters.tinyPadding,
        { backgroundColor: Colors.background },
      ]}
    >
      <Text>Notifications</Text>
    </View>
  );
}
