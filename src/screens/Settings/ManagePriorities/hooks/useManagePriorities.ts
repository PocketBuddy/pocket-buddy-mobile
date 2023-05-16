import {
  allPrioritiesSelector,
  prioritiesLoadingSelector,
} from '@/store/priorities/selectors';
import { useCallback, useEffect, useState } from 'react';
import { PrioritiesSheetType } from '../ManagePrioritiesSheet';
import { PriorityModel } from 'types/models';
import { useBottomSheet } from '@/hooks';
import { useLazyGetPrioritiesQuery } from '@/services/modules/priorities';
import { useSelector } from 'react-redux';

export default function useManagePriorities() {
  const [getPriorities, { isError }] = useLazyGetPrioritiesQuery({});
  const prioritiesLoading = useSelector(prioritiesLoadingSelector);
  const priorities = useSelector(allPrioritiesSelector);
  const { open, close, isOpen } = useBottomSheet({});
  const [sheetType, setSheetType] = useState<PrioritiesSheetType>();
  const [selectedPriority, setSelectedPriority] = useState<PriorityModel>();

  useEffect(() => {
    !priorities.length && getPriorities({}).refetch();
  }, [priorities, getPriorities]);

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
      isLoading: prioritiesLoading,
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
