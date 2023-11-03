import { BottomSheet, Button, ControlledInput, Form } from '@/components/';
import {
  ButtonType,
  KeyboardDismissMode,
  KeyboardPersisted,
} from 'types/components';
import React, { useMemo } from 'react';
import { getTranslate } from '@/utils';
import { PriorityModel } from 'types/models';
import useManagePrioritiesSheet from './hooks/useManagePrioritiesSheet';
import { useTranslation } from 'react-i18next';

export enum PrioritiesSheetType {
  add = 'add',
  edit = 'edit',
  delete = 'delete',
}

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  sheetType?: PrioritiesSheetType;
  priority?: PriorityModel;
};

export default function ManagePrioritiesSheet({
  isOpen,
  handleClose,
  sheetType,
  priority,
}: Props) {
  const { t } = useTranslation(['managePriorities']);
  const { addPriorityForm, editPriorityForm, deletePriorityForm, isLoading } =
    useManagePrioritiesSheet({
      handleClose,
      isSheetOpen: isOpen,
      priority,
    });

  const successLabel = useMemo(() => {
    switch (sheetType) {
      case PrioritiesSheetType.add:
        return t('managePriorities:buttonSuccess.create');
      case PrioritiesSheetType.edit:
        return t('managePriorities:buttonSuccess.save');
      case PrioritiesSheetType.delete:
        return t('managePriorities:buttonSuccess.delete');
      default:
        return t('managePriorities:buttonSuccess.submit');
    }
  }, [sheetType]);

  const titleLabel = useMemo(() => {
    switch (sheetType) {
      case PrioritiesSheetType.add:
        return t('managePriorities:titles.createNew');
      case PrioritiesSheetType.edit:
        return t('managePriorities:titles.edit', { name: priority?.name });
      case PrioritiesSheetType.delete:
        return t('managePriorities:titles.delete', { name: priority?.name });
      default:
        return '';
    }
  }, [sheetType, priority]);

  const onSubmit = useMemo(() => {
    switch (sheetType) {
      case PrioritiesSheetType.add:
        return addPriorityForm.onSubmit;
      case PrioritiesSheetType.edit:
        return editPriorityForm.onSubmit;
      case PrioritiesSheetType.delete:
        return deletePriorityForm.onSubmit;
      default:
        return () => {};
    }
  }, [sheetType]);

  return (
    <BottomSheet
      isOpen={isOpen}
      handleClose={handleClose}
      title={titleLabel}
      points={sheetType === PrioritiesSheetType.delete ? ['30%'] : ['50%']}
      renderContent={() => (
        <Form
          enableAutomaticScroll={false}
          keyboardShouldPersistTaps={KeyboardPersisted.Never}
          keyboardDismissMode={KeyboardDismissMode.None}
          renderInputs={() => (
            <>
              {sheetType === PrioritiesSheetType.add && (
                <>
                  <ControlledInput
                    name="name"
                    control={addPriorityForm.control}
                    label={t('managePriorities:inputName.label')}
                    placeholder={t('managePriorities:inputName.placeholder')}
                    errorMessage={getTranslate(
                      addPriorityForm.errors.name?.message,
                    )}
                    bottomSheet
                  />
                  <ControlledInput
                    name="priority"
                    control={addPriorityForm.control}
                    label={t('managePriorities:inputPriority.label')}
                    placeholder={t(
                      'managePriorities:inputPriority.placeholder',
                    )}
                    errorMessage={getTranslate(
                      addPriorityForm.errors.priority?.message,
                    )}
                    keyboardType="numeric"
                    bottomSheet
                  />
                </>
              )}
              {sheetType === PrioritiesSheetType.edit && (
                <>
                  <ControlledInput
                    name="name"
                    control={editPriorityForm.control}
                    label={t('managePriorities:inputName.label')}
                    placeholder={t('managePriorities:inputName.label')}
                    errorMessage={getTranslate(
                      editPriorityForm.errors.name?.message,
                    )}
                    defaultValue={editPriorityForm.control._formValues.name}
                    bottomSheet
                  />
                  <ControlledInput
                    name="priority"
                    control={editPriorityForm.control}
                    label={t('managePriorities:inputPriority.label')}
                    placeholder={t(
                      'managePriorities:inputPriority.placeholder',
                    )}
                    errorMessage={getTranslate(
                      editPriorityForm.errors.priority?.message,
                    )}
                    defaultValue={editPriorityForm.control._formValues.priority.toString()}
                    keyboardType="numeric"
                    bottomSheet
                  />
                </>
              )}
            </>
          )}
          renderButtons={() => (
            <>
              <Button
                label={successLabel}
                onPress={onSubmit}
                isLoading={isLoading}
              />
              <Button
                label={t('managePriorities:buttonClose')}
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
