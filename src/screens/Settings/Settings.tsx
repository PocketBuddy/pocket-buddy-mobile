import Logout, { LogoutProps } from './Logout/Logout';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import i18n from '@/translations';
import { ListSeparator } from '@/components';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

type Section = {
  title: string;
  component: (props: LogoutProps) => JSX.Element;
};

const SECTIONS: Section[] = [
  {
    title: i18n.t('settings:logout'),
    component: (props: LogoutProps) => <Logout {...props} />,
  },
];

export default function Settings({ navigation }: Props) {
  const renderSeparator = useCallback(() => <ListSeparator />, []);
  const renderItem = useCallback(
    ({ item }: { item: Section }) =>
      item.component({ title: item.title, navigation }),
    [],
  );

  return (
    <FlatList
      data={SECTIONS}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      scrollEnabled={false}
      initialNumToRender={SECTIONS.length}
      keyExtractor={item => item.title}
    />
  );
}
