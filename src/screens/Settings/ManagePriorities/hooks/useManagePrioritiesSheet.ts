import {
  useAddPriorityForm,
  useDeletePriorityForm,
  useEditPriorityForm,
} from './useManagePrioritiesForm';
import { useEffect, useMemo } from 'react';
import { PriorityModel } from 'types/models';

type Props = {
  isSheetOpen: boolean;
  handleClose: () => void;
  priority?: PriorityModel;
};

export default function useManagePrioritiesSheet({
  isSheetOpen,
  handleClose,
  priority,
}: Props) {
  const { resetAddPriorityForm, ...addPriorityForm } = useAddPriorityForm({
    handleClose,
  });
  const editPriorityForm = useEditPriorityForm({
    priority,
    handleClose,
  });
  const deletePriorityForm = useDeletePriorityForm({
    id: priority?.id,
    handleClose,
  });
  const isLoading = useMemo(
    () =>
      addPriorityForm.isLoading ||
      editPriorityForm.isLoading ||
      deletePriorityForm.isLoading,
    [
      addPriorityForm.isLoading,
      editPriorityForm.isLoading,
      deletePriorityForm.isLoading,
    ],
  );

  useEffect(() => {
    if (!isSheetOpen) {
      resetAddPriorityForm();
    }
  }, [isSheetOpen]);

  return {
    addPriorityForm,
    editPriorityForm,
    deletePriorityForm,
    isLoading,
  };
}
