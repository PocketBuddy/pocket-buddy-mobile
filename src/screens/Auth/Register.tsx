import { Button, Form, Input } from '@/components';
import { usePlatform, useTheme } from '@/hooks';
import { ButtonType } from 'types/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation(['auth']);
  const { Images } = useTheme();
  const { isIOS } = usePlatform();

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
          <Input
            label={t('auth:inputs.password.label')}
            placeholder={t('auth:inputs.password.placeholder')}
            onChangeText={() => null}
            secured
          />
          <Input
            label={t('auth:inputs.confirmPassword.label')}
            placeholder={t('auth:inputs.confirmPassword.placeholder')}
            onChangeText={() => null}
            secured
          />
        </>
      )}
      renderButtons={() => (
        <>
          <Button
            label={t('auth:buttons.register.label')}
            onPress={() => null}
          />
          {isIOS ? (
            <Button
              label={t('auth:buttons.signUpWith.label', { provider: 'Apple' })}
              onPress={() => null}
              icon={Images.icons.apple}
              type={ButtonType.Secondary}
            />
          ) : (
            <Button
              label={t('auth:buttons.signUpWith.label', { provider: 'Google' })}
              onPress={() => null}
              icon={Images.icons.google}
              type={ButtonType.Secondary}
            />
          )}
        </>
      )}
    />
  );
}
