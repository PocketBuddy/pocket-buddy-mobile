import {
  Chip,
  HorizontalList,
  Paragraph,
  Title,
  TitleInteractive,
} from '@/components';
import ManagePrioritiesSheet, {
  PrioritiesSheetType,
} from '@/screens/Settings/ManagePriorities/ManagePrioritiesSheet';
import React, { useCallback, useEffect, useState } from 'react';
import { useBottomSheet, useTheme } from '@/hooks';
import { allPrioritiesSelector } from '@/store/priorities/selectors';
import { ErrorMessageInput } from 'types/components';
import { PriorityModel } from 'types/models';
import { useGetPrioritiesQuery } from '@/services/modules/priorities';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type Props = {
  setPriorityId: (id: number | null) => void;
  errorMessage?: ErrorMessageInput;
};

export default function SelectPriority({ setPriorityId, errorMessage }: Props) {
  const { t } = useTranslation(['selectPriority']);
  const { Gutters } = useTheme();
  const { isLoading, isError, refetch } = useGetPrioritiesQuery({});
  const priorities = useSelector(allPrioritiesSelector);
  const [selectedPriority, setSelectedPriority] = useState<
    PriorityModel | undefined
  >(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { open, close, isOpen } = useBottomSheet({});
  const [noPriorityError, setNoPriorityError] = useState<boolean>(
    !!errorMessage || false,
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setNoPriorityError(!!errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (selectedPriority) {
      setNoPriorityError(false);
    }
  }, [selectedPriority]);

  const handlePressItem = useCallback(
    (item: PriorityModel, index: number) => {
      if (selectedPriority?.id === item.id) {
        setSelectedPriority(undefined);
        setPriorityId(null);
        return;
      }
      setSelectedPriority(item);
      setSelectedIndex(index);
      setPriorityId(item.id);
    },
    [selectedPriority],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: PriorityModel; index: number }) => {
      const isSelected = selectedPriority?.id === item.id;
      return (
        <Chip
          handlePress={() => handlePressItem(item, index)}
          isSelected={isSelected}
          name={item.name}
        />
      );
    },
    [selectedPriority],
  );

  return (
    <View style={[Gutters.tinyGap]}>
      <TitleInteractive
        renderTitle={() => (
          <Title text={t('selectPriority:title')} size="Small" />
        )}
        renderButton={() => (
          <Paragraph text={t('selectPriority:button')} onPress={open} />
        )}
      />
      <HorizontalList
        data={priorities}
        renderItem={renderItem}
        indexToScroll={selectedIndex}
        isLoading={isLoading}
        isError={isError}
      />
      {noPriorityError && (
        <Paragraph text={t('selectPriority:error')} isError />
      )}
      <ManagePrioritiesSheet
        isOpen={isOpen}
        handleClose={close}
        sheetType={PrioritiesSheetType.add}
        priority={selectedPriority}
      />
    </View>
  );
}
