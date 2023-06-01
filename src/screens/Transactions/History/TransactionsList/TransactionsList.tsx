import { Amount, ManagementList, Paragraph, Title } from '@/components';
import React, { useCallback } from 'react';
import {
  TransactionListItemModel,
  TransactionListModel,
  TransactionModel,
} from 'types/models';
import { formatDate } from '@/utils';
import { languageSelector } from '@/store/preferences/selectors';
import { FlatList as NestedFlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

type Props = {
  data: TransactionListModel;
  isLoading?: boolean;
  isError?: boolean;
  fetchMore?: () => void;
};

export default function TransactionsList({
  data,
  isLoading,
  isError,
  fetchMore,
}: Props) {
  const { Layout, Gutters } = useTheme();
  const language = useSelector(languageSelector);

  const renderItem = useCallback(
    ({ item: expense }: { item: TransactionModel }) => (
      <View
        key={expense.id}
        style={[
          Layout.row,
          Layout.scrollSpaceBetween,
          Layout.alignItemsCenter,
          Gutters.tinyBPadding,
        ]}
      >
        <Paragraph text={expense.name} />
        <Amount value={expense.amount} />
      </View>
    ),
    [],
  );

  const renderSection = useCallback(
    ({ item }: { item: TransactionListItemModel }) => (
      <View
        style={[Gutters.tinyRowGap, Gutters.tinyBMargin]}
        key={item.spent_date}
      >
        <View
          style={[
            Layout.row,
            Layout.scrollSpaceBetween,
            Layout.alignItemsCenter,
          ]}
        >
          <Title text={formatDate(item.spent_date, language)} size="Small" />
          <Amount value={item.amount_sum} isBolded={false} />
        </View>
        <NestedFlatList data={item.expenses} renderItem={renderItem} />
      </View>
    ),
    [language],
  );

  return (
    <ManagementList
      data={data}
      isLoading={isLoading}
      isError={isError}
      withSeparator={false}
      showScrollTop
      onEndReached={fetchMore}
      renderItem={renderSection}
    />
  );
}
