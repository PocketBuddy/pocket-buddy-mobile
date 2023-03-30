import { Alert, ScrollView, View } from 'react-native';
import { Brand, Button } from '@/components';
import { changeTheme, ThemeState } from '@/store/theme';
import React, { useEffect } from 'react';
import { ButtonType } from 'types/components';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';
import { useLazyFetchOneQuery } from '@/services/modules/users';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';

export default function Example() {
  const { t } = useTranslation(['example']);
  const { Gutters, Layout, darkMode: isDark } = useTheme();
  const dispatch = useDispatch();

  const [fetchOne, { data, isSuccess, isLoading, isFetching }] =
    useLazyFetchOneQuery();

  useEffect(() => {
    if (isSuccess && data?.name) {
      Alert.alert(t('example:helloUser', { name: data.name }));
    }
  }, [isSuccess, data]);

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = (lang: 'pl' | 'en') => {
    i18next.changeLanguage(lang);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        Layout.colVCenter,
        Layout.scrollSpaceAround,
        Gutters.tinyPadding,
      ]}
    >
      <Brand height={300} width={300} />
      <View style={[Layout.fullWidth, Layout.fill, Layout.justifyContentEnd]}>
        <View style={[Layout.col, Gutters.tinyRowGap]}>
          <Button
            onPress={() => fetchOne(`${Math.ceil(Math.random() * 10 + 1)}`)}
            label={t('example:buttons.send')}
            isLoading={isFetching || isLoading}
          />

          <Button
            onPress={() => onChangeTheme({ darkMode: !isDark })}
            label={t('example:buttons.toggleTheme')}
            type={ButtonType.Secondary}
          />

          <Button
            onPress={() =>
              onChangeLanguage(i18next.language === 'en' ? 'pl' : 'en')
            }
            label={t('example:buttons.toggleLanguage')}
          />

          <Button
            onPress={() => Alert.alert('This is a disabled button.')}
            label={t('example:buttons.disabledButton')}
            disabled
          />
        </View>
      </View>
    </ScrollView>
  );
}
