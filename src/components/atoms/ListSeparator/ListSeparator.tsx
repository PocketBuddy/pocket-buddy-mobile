import React from 'react';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

const SEPARATOR_HEIGHT = 2;

export default function ListSeparator() {
  const { Colors } = useTheme();

  return (
    <View
      style={{
        borderTopColor: Colors.primary,
        borderTopWidth: SEPARATOR_HEIGHT,
      }}
    />
  );
}
