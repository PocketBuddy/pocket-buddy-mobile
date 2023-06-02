import {
  allPrioritiesSelector,
  prioritiesLoadingSelector,
  priorityByIdSelector,
} from '@/store/priorities/selectors';
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
import { ErrorMessageInput } from 'types/components';
import { PriorityModel } from 'types/models';
import { RootState } from '@/store';
import { useLazyGetPrioritiesQuery } from '@/services/modules/priorities';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type Props = {
  setPriorityId: (id: number | null) => void;
  errorMessage?: ErrorMessageInput;
  passedPriorityId?: number;
  isNetworkError?: boolean;
};

export default function SelectPriority({
  setPriorityId,
  errorMessage,
  passedPriorityId,
  isNetworkError = false,
}: Props) {
  const { t } = useTranslation(['selectPriority']);
  const { Gutters } = useTheme();
  const [getPriorities, { isError }] = useLazyGetPrioritiesQuery({});

  const prioritiesLoading = useSelector(prioritiesLoadingSelector);
  const priorities = useSelector(allPrioritiesSelector);

  const [selectedPriority, setSelectedPriority] = useState<
    PriorityModel | undefined
  >(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { open, close, isOpen } = useBottomSheet({});
  const [noPriorityError, setNoPriorityError] = useState<boolean>(
    !!errorMessage || false,
  );

  const defaultPriority = useSelector((state: RootState) =>
    priorityByIdSelector(state)(passedPriorityId),
  );

  useEffect(() => {
    !isNetworkError && getPriorities({});
  }, [isNetworkError]);

  useEffect(() => {
    let timeout: any = null;

    if (defaultPriority) {
      setSelectedPriority(defaultPriority);
      setPriorityId(defaultPriority.id);

      timeout = setTimeout(() => {
        setSelectedIndex(
          priorities.findIndex(p => p.id === defaultPriority.id) || 0,
        );
      });
    }

    return () => {
      clearTimeout(timeout);
    };
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
        isLoading={prioritiesLoading && !priorities.length}
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
