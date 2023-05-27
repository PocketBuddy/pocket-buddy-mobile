import { BottomSheet, Button, ControlledInput, Form } from '@/components/';
import {
  ButtonType,
  KeyboardDismissMode,
  KeyboardPersisted,
} from 'types/components';
import React, { useMemo } from 'react';
import { CategoryModel } from 'types/models';
import { getTranslate } from '@/utils';
import useManageCategoriesSheet from './hooks/useManageCategoriesSheet';
import { useTranslation } from 'react-i18next';

export enum CategoriesSheetType {
  add = 'add',
  addSub = 'addSub',
  edit = 'edit',
  delete = 'delete',
}

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  sheetType?: CategoriesSheetType;
  category?: CategoryModel;
};

export default function ManageCategoriesSheet({
  isOpen,
  handleClose,
  sheetType,
  category,
}: Props) {
  const { t } = useTranslation(['manageCategories']);
  const {
    addCategoryForm,
    addSubCategoryForm,
    editCategoryForm,
    deleteCategoryForm,
  } = useManageCategoriesSheet({
    handleClose,
    isSheetOpen: isOpen,
    id: category?.id,
    name: category?.name,
  });

  const successLabel = useMemo(() => {
    switch (sheetType) {
      case CategoriesSheetType.add:
        return t('manageCategories:buttonSuccess.create');
      case CategoriesSheetType.addSub:
        return t('manageCategories:buttonSuccess.create');
      case CategoriesSheetType.edit:
        return t('manageCategories:buttonSuccess.save');
      case CategoriesSheetType.delete:
        return t('manageCategories:buttonSuccess.delete');
      default:
        return t('manageCategories:buttonSuccess.submit');
    }
  }, [sheetType]);

  const titleLabel = useMemo(() => {
    switch (sheetType) {
      case CategoriesSheetType.add:
        return t('manageCategories:titles.createNew');
      case CategoriesSheetType.addSub:
        return t('manageCategories:titles.createNewSub', {
          name: category?.name,
        });
      case CategoriesSheetType.edit:
        return t('manageCategories:titles.edit', { name: category?.name });
      case CategoriesSheetType.delete:
        return t('manageCategories:titles.delete', { name: category?.name });
      default:
        return '';
    }
  }, [sheetType, category]);

  const onSubmit = useMemo(() => {
    switch (sheetType) {
      case CategoriesSheetType.add:
        return addCategoryForm.onSubmit;
      case CategoriesSheetType.addSub:
        return addSubCategoryForm.onSubmit;
      case CategoriesSheetType.edit:
        return editCategoryForm.onSubmit;
      case CategoriesSheetType.delete:
        return deleteCategoryForm.onSubmit;
      default:
        return () => {};
    }
  }, [sheetType]);

  return (
    <BottomSheet
      isOpen={isOpen}
      handleClose={handleClose}
      title={titleLabel}
      points={sheetType === CategoriesSheetType.delete ? ['30%'] : ['40%']}
      renderContent={() => (
        <Form
          enableAutomaticScroll={false}
          keyboardShouldPersistTaps={KeyboardPersisted.Never}
          keyboardDismissMode={KeyboardDismissMode.None}
          renderInputs={() => (
            <>
              {sheetType === CategoriesSheetType.add && (
                <ControlledInput
                  name="name"
                  control={addCategoryForm.control}
                  label={t('manageCategories:input.label')}
                  placeholder={t('manageCategories:input.placeholder')}
                  errorMessage={getTranslate(
                    addCategoryForm.errors.name?.message,
                  )}
                  onSubmitEditing={addCategoryForm.onSubmit}
                  bottomSheet
                />
              )}
              {sheetType === CategoriesSheetType.addSub && (
                <ControlledInput
                  name="name"
                  control={addSubCategoryForm.control}
                  label={t('manageCategories:input.label')}
                  placeholder={t('manageCategories:input.label')}
                  errorMessage={getTranslate(
                    addSubCategoryForm.errors.name?.message,
                  )}
                  onSubmitEditing={addSubCategoryForm.onSubmit}
                  bottomSheet
                />
              )}
              {sheetType === CategoriesSheetType.edit && (
                <ControlledInput
                  name="name"
                  control={editCategoryForm.control}
                  label={t('manageCategories:input.label')}
                  placeholder={t('manageCategories:input.label')}
                  errorMessage={getTranslate(
                    editCategoryForm.errors.name?.message,
                  )}
                  defaultValue={editCategoryForm.control._formValues.name}
                  onSubmitEditing={editCategoryForm.onSubmit}
                  bottomSheet
                />
              )}
            </>
          )}
          renderButtons={() => (
            <>
              <Button label={successLabel} onPress={onSubmit} />
              <Button
                label={t('manageCategories:buttonClose')}
                onPress={handleClose}
                type={ButtonType.Secondary}
              />
            </>
          )}
        />
      )}
    />
  );
}
