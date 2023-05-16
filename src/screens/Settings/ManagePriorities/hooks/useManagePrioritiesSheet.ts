import {
  useAddPriorityForm,
  useDeletePriorityForm,
  useEditPriorityForm,
} from './useManagePrioritiesForm';
import { PriorityModel } from 'types/models';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (!isSheetOpen) {
      resetAddPriorityForm();
    }
  }, [isSheetOpen]);

  return {
    addPriorityForm,
    editPriorityForm,
    deletePriorityForm,
  };
}
