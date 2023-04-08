import {
  BottomSheet,
  Button,
  ControlledInput,
  Form,
  Paragraph,
} from '@/components/';
import {
  ButtonType,
  KeyboardDismissMode,
  KeyboardPersisted,
} from 'types/components';
import React from 'react';
import usePasswordRecoverySheet from './usePasswordRecoverySheet';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function PasswordRecoverySheet({ isOpen, handleClose }: Props) {
  const { t } = useTranslation(['auth']);
  const { form } = usePasswordRecoverySheet({ isSheetOpen: isOpen });

  return (
    <BottomSheet
      isOpen={isOpen}
      handleClose={handleClose}
      title={t('auth:passwordRecovery.title')}
      points={['45%']}
      renderContent={() => (
        <Form
          enableAutomaticScroll={false}
          keyboardShouldPersistTaps={KeyboardPersisted.Never}
          keyboardDismissMode={KeyboardDismissMode.None}
          renderInputs={() => (
            <>
              <ControlledInput
                name="email"
                control={form.control}
                label={t('auth:inputs.email.label')}
                placeholder={t('auth:inputs.email.placeholder')}
                errorMessage={form.errors.email?.message}
                textContentType="emailAddress"
                bottomSheet
              />
              <Paragraph text={t('auth:passwordRecovery.message')} />
            </>
          )}
          renderButtons={() => (
            <>
              <Button
                label={t('auth:passwordRecovery.submit')}
                onPress={form.onSubmit}
              />
              <Button
                label={t('auth:passwordRecovery.cancel')}
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
