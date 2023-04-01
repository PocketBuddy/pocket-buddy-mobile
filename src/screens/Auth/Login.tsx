import { Button, Form, Input } from '@/components';
import { ButtonType } from 'types/components';
import React from 'react';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation(['auth']);
  const { Images } = useTheme();

  return (
    <Form
      renderInputs={() => (
        <>
          <Input
            label={t('auth:inputs.name.label')}
            placeholder={t('auth:inputs.name.placeholder')}
            onChangeText={() => null}
          />
          <Input
            label={t('auth:inputs.email.label')}
            placeholder={t('auth:inputs.email.placeholder')}
            onChangeText={() => null}
          />
        </>
      )}
      renderButtons={() => (
        <>
          <Button label={t('auth:buttons.login.label')} onPress={() => null} />
          <Button
            label={t('auth:buttons.signInWithApple.label')}
            onPress={() => null}
            icon={Images.icons.apple}
            type={ButtonType.Secondary}
          />
        </>
      )}
    />
  );
}
