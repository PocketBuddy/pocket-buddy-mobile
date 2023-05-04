import { Brand, Spinner } from '@/components';
import React, { useEffect } from 'react';
import { ApplicationScreenProps } from 'types/navigation';
import { isLoggedSelector } from '@/store/auth/selectors';
import { StackNames } from '@/navigators/routes';
import { useSelector } from 'react-redux';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

export default function Startup({ navigation }: ApplicationScreenProps) {
  const { Layout, Gutters } = useTheme();
  const isLogged = useSelector(isLoggedSelector);

  const init = async () => {
    if (isLogged) {
      navigation.reset({
        index: 0,
        routes: [{ name: StackNames.main }],
      });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: StackNames.start }],
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
