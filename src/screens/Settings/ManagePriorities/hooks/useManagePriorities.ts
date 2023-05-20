import {
  allPrioritiesSelector,
  prioritiesLoadingSelector,
} from '@/store/priorities/selectors';
import { useBottomSheet, useNetworkError } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import { PrioritiesSheetType } from '../ManagePrioritiesSheet';
import { PriorityModel } from 'types/models';
import { useLazyGetPrioritiesQuery } from '@/services/modules/priorities';
import { useSelector } from 'react-redux';

export default function useManagePriorities() {
  const [getPriorities, { isError }] = useLazyGetPrioritiesQuery({});
  const prioritiesLoading = useSelector(prioritiesLoadingSelector);
  const priorities = useSelector(allPrioritiesSelector);
  const { open, close, isOpen } = useBottomSheet({});
  const [sheetType, setSheetType] = useState<PrioritiesSheetType>();
  const [selectedPriority, setSelectedPriority] = useState<PriorityModel>();
  const { isNetworkError } = useNetworkError();

  useEffect(() => {
    !isNetworkError && getPriorities({}).refetch();
  }, [isNetworkError]);

  const handleAdd = useCallback(() => {
    setSheetType(PrioritiesSheetType.add);
    open();
  }, []);

  const handleEdit = useCallback((priority: PriorityModel) => {
    setSheetType(PrioritiesSheetType.edit);
    setSelectedPriority(priority);
    open();
  }, []);

  const handleDelete = useCallback((priority: PriorityModel) => {
    setSheetType(PrioritiesSheetType.delete);
    setSelectedPriority(priority);
    open();
  }, []);

  return {
    manageList: {
      priorities,
      isLoading: prioritiesLoading && !priorities.length,
      isError,
      handleAdd,
      handleEdit,
      handleDelete,
    },
    manageSheet: {
      open,
      close,
      isOpen,
      sheetType,
      selectedPriority,
    },
  };
}
