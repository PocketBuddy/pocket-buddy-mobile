import { Brand, Spinner } from '@/components';
import { ApplicationScreenProps } from 'types/navigation';
import React from 'react';
import useStartup from './useStartup';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

export default function Startup({ navigation }: ApplicationScreenProps) {
  const { Layout, Gutters } = useTheme();
  useStartup({ navigation });

  return (
    <View style={[Layout.fill, Layout.colCenter, Gutters.largeRowGap]}>
      <Brand />
      <Spinner />
    </View>
  );
}
