import {
  allCategoriesSelector,
  categoriesLoadingSelector,
} from '@/store/categories/selectors';
import { useBottomSheet, useNetworkError } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import { CategoriesSheetType } from '../ManageCategoriesSheet';
import { CategoryModel } from 'types/models';
import { useLazyGetCategoriesQuery } from '@/services/modules/categories';

import { useSelector } from 'react-redux';

export default function useManageCategories() {
  const [getCategories, { isError }] = useLazyGetCategoriesQuery({});
  const categoriesLoading = useSelector(categoriesLoadingSelector);
  const categories = useSelector(allCategoriesSelector);
  const { open, close, isOpen } = useBottomSheet({});
  const [sheetType, setSheetType] = useState<CategoriesSheetType>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  const { isNetworkError } = useNetworkError();

  useEffect(() => {
    !isNetworkError && getCategories({}).refetch();
  }, [isNetworkError]);

  const handleAdd = useCallback(() => {
    setSheetType(CategoriesSheetType.add);
    open();
  }, []);

  const handleAddSub = useCallback((category: CategoryModel) => {
    setSheetType(CategoriesSheetType.addSub);
    setSelectedCategory(category);
    open();
  }, []);

  const handleEdit = useCallback((category: CategoryModel) => {
    setSheetType(CategoriesSheetType.edit);
    setSelectedCategory(category);
    open();
  }, []);

  const handleDelete = useCallback((category: CategoryModel) => {
    setSheetType(CategoriesSheetType.delete);
    setSelectedCategory(category);
    open();
  }, []);

  return {
    manageList: {
      categories,
      isLoading: categoriesLoading && !categories.length,
      isError,
      handleAdd,
      handleAddSub,
      handleEdit,
      handleDelete,
    },
    manageSheet: {
      open,
      close,
      isOpen,
      sheetType,
      selectedCategory,
    },
  };
}
