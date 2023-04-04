import { BottomSheet, Button, Form, Input, Paragraph } from '@/components/';
import {
  ButtonType,
  KeyboardDismissMode,
  KeyboardPersisted,
} from 'types/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function PasswordRecoverySheet({ isOpen, handleClose }: Props) {
  const { t } = useTranslation(['auth']);

  return (
    <BottomSheet
      isOpen={isOpen}
      handleClose={handleClose}
      title={t('auth:passwordRecovery.title')}
      points={['41%']}
      renderContent={() => (
        <Form
          enableAutomaticScroll={false}
          keyboardShouldPersistTaps={KeyboardPersisted.Never}
          keyboardDismissMode={KeyboardDismissMode.None}
          renderInputs={() => (
            <>
              <Input
                label={t('auth:inputs.email.label')}
                placeholder={t('auth:inputs.email.placeholder')}
                onChangeText={() => null}
                bottomSheet
              />
              <Paragraph text={t('auth:passwordRecovery.message')} />
            </>
          )}
          renderButtons={() => (
            <>
              <Button
                label={t('auth:passwordRecovery.submit')}
                onPress={() => null}
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
