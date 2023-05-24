import { ListSeparator, SettingsItem } from '@/components';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import React from 'react';
import useSettings from './useSettings';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Settings({ navigation }: Props) {
  const { t } = useTranslation(['settings']);
  const { Colors, Layout } = useTheme();
  const items = useSettings({
    navigation,
  });

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: Colors.background,
          ...Layout.fill,
        }}
      >
        <SettingsItem
          title={t('settings:manageCategories')}
          handlePress={items.handleCategories}
        />
        <ListSeparator />
        <SettingsItem
          title={t('settings:managePriorities')}
          handlePress={items.handlePriorities}
        />
        <ListSeparator />
        <SettingsItem
          title={t('settings:language', { name: items.language.name })}
          handlePress={items.language.handleChange}
        />
        <ListSeparator />
        <SettingsItem
          title={t('settings:logout')}
          handlePress={items.handleLogout}
        />
      </ScrollView>
    </View>
  );
}
