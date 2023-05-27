import { Paragraph, Spinner } from '@/components';
import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ListRenderItem } from 'react-native';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  data: any[];
  isLoading?: boolean;
  isError?: boolean;
  indexToScroll?: number;
  renderItem: ListRenderItem<any>;
};

export default function HorizontalList({
  data,
  indexToScroll,
  isLoading = false,
  isError = false,
  renderItem,
}: Props) {
  const { Gutters } = useTheme();
  const { t } = useTranslation(['dataMessage']);
  const ref = useRef<FlatList<any>>(null);

  useEffect(() => {
    if (
      indexToScroll !== undefined &&
      ref.current &&
      indexToScroll < data.length
    ) {
      ref.current.scrollToIndex({ index: indexToScroll });
    }
  }, [indexToScroll]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data.length) {
    return <Paragraph text={t('dataMessage:noData.message')} />;
  }

  if (isError) {
    return <Paragraph text={t('dataMessage:error.message')} />;
  }

  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      horizontal
      contentContainerStyle={[Gutters.tinyGap]}
      ref={ref}
      onScrollToIndexFailed={() => null}
    />
  );
}
