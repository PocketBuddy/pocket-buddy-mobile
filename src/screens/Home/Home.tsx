import React from 'react';
import { Title } from '@/components';
import { userSelector } from '@/store/user/selectors';
import { useSelector } from 'react-redux';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function Home() {
  const { t } = useTranslation(['home']);
  const { Colors, Gutters, Layout } = useTheme();
  const user = useSelector(userSelector);

  return (
    <View
      style={[
        Layout.fill,
        Gutters.tinyPadding,
        { backgroundColor: Colors.background },
      ]}
    >
      <Title text={t('home:hello', { name: user.name })} />
    </View>
  );
}
