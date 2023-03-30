import { Brand, Spinner } from '@/components';
import React, { useEffect } from 'react';
import { ApplicationScreenProps } from 'types/navigation';
import { setDefaultTheme } from '@/store/theme';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

export default function Startup({ navigation }: ApplicationScreenProps) {
  const { Layout, Gutters } = useTheme();

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    await setDefaultTheme({ theme: 'default', darkMode: null });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={[Layout.fill, Layout.colCenter, Gutters.largeRowGap]}>
      <Brand />
      <Spinner />
    </View>
  );
}
