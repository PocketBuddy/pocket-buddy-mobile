import { DataMessage, ListSeparator } from '@/components';
import { FlatList, ListRenderItem, View } from 'react-native';
import React, { useCallback } from 'react';
import { useTheme } from '@/hooks';

type Props = {
  data: any[];
  isLoading?: boolean;
  isError?: boolean;
  renderItem: ListRenderItem<any>;
  renderFloatingButton?: () => React.ReactNode;
};

export default function ManagementList({
  data,
  isLoading = false,
  isError = false,
  renderItem,
  renderFloatingButton,
}: Props) {
  const { Layout, Colors, Gutters } = useTheme();
  const renderSeparator = useCallback(() => <ListSeparator />, []);

  if (isLoading) {
    return <DataMessage type="loading" />;
  }

  if (isError) {
    return <DataMessage type="error" />;
  }

  if (!data.length) {
    return (
      <>
        <DataMessage type="no-data" />
        {renderFloatingButton && renderFloatingButton()}
      </>
    );
  }

  return (
    <View style={{ backgroundColor: Colors.background }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        style={[Layout.fullHeight]}
        ItemSeparatorComponent={renderSeparator}
        nestedScrollEnabled
        contentContainerStyle={[Gutters.largeBPadding]}
        renderItem={renderItem}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
      />
      {renderFloatingButton && renderFloatingButton()}
    </View>
  );
}
