import { DataMessage, FloatingButton, ListSeparator } from '@/components';
import {
  FlatList,
  FlatList as NestedFlatList,
} from 'react-native-gesture-handler';
import { ListRenderItem, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useTheme } from '@/hooks';

type Props = {
  data: any[];
  isLoading?: boolean;
  isError?: boolean;
  withSeparator?: boolean;
  showScrollTop?: boolean;
  renderItem: ListRenderItem<any>;
  renderFloatingButton?: () => React.ReactNode;
  onEndReached?: () => void;
};

export default function ManagementList({
  data,
  isLoading = false,
  isError = false,
  withSeparator = true,
  showScrollTop = false,
  renderItem,
  renderFloatingButton,
  onEndReached,
}: Props) {
  const { Layout, Colors, Gutters, Images } = useTheme();
  const ref = useRef<FlatList>(null);

  const renderSeparator = useCallback(
    () => (withSeparator ? <ListSeparator /> : null),
    [withSeparator],
  );

  const scrollToTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, []);

  const renderScrollTop = useCallback(
    () =>
      showScrollTop ? (
        <FloatingButton onPress={scrollToTop} icon={Images.icons.arrowUp} />
      ) : null,
    [showScrollTop, scrollToTop],
  );

  const debounceEndReached = useCallback(
    debounce(() => {
      if (onEndReached) {
        onEndReached();
      }
    }, 500),
    [onEndReached],
  );

  if (isLoading && !data.length) {
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
      <NestedFlatList
        ref={ref}
        data={data}
        style={[Layout.fullHeight]}
        ItemSeparatorComponent={renderSeparator}
        nestedScrollEnabled
        contentContainerStyle={[Gutters.largeBPadding]}
        renderItem={renderItem}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={debounceEndReached}
        ListFooterComponent={isLoading ? <DataMessage type="loading" /> : null}
      />
      {renderFloatingButton && renderFloatingButton()}
      {renderScrollTop()}
    </View>
  );
}
