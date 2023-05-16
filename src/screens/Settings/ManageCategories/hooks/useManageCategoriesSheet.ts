import {
  useAddCategoryForm,
  useAddSubCategoryForm,
  useDeleteCategoryForm,
  useEditCategoryForm,
} from './useManageCategoriesForm';
import { useEffect } from 'react';

type Props = {
  isSheetOpen: boolean;
  handleClose: () => void;
  id?: number;
  name?: string;
};

export default function useManageCategoriesSheet({
  isSheetOpen,
  handleClose,
  id,
  name,
}: Props) {
  const { resetAddCategoryForm, ...addCategoryForm } = useAddCategoryForm({
    handleClose,
  });
  const { resetAddSubCategoryForm, ...addSubCategoryForm } =
    useAddSubCategoryForm({ id, handleClose });
  const editCategoryForm = useEditCategoryForm({
    id,
    name,
    handleClose,
  });
  const deleteCategoryForm = useDeleteCategoryForm({ id, handleClose });

  useEffect(() => {
    if (!isSheetOpen) {
      resetAddCategoryForm();
      resetAddSubCategoryForm({ name: '' });
    }
  }, [isSheetOpen]);

  return {
    addCategoryForm,
    addSubCategoryForm,
    editCategoryForm,
    deleteCategoryForm,
  };
}
