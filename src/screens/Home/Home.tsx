import React from 'react';
import { Title } from '@/components';
import useHome from './useHome';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function Home() {
  const { t } = useTranslation(['home']);
  const { Colors, Gutters, Layout } = useTheme();
  const { hello } = useHome();

  return (
    <View
      style={[
        Layout.fill,
        Gutters.tinyPadding,
        { backgroundColor: Colors.background },
      ]}
    >
      {!hello.isLoading && (
        <Title text={t('home:hello', { name: hello.userName })} />
      )}
    </View>
  );
}
