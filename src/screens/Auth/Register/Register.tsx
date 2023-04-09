import { Button, ControlledInput, Form } from '@/components';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { usePlatform, useTheme } from '@/hooks';
import { ButtonType } from 'types/components';
import React from 'react';
import useRegister from './useRegister';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Register({ navigation }: Props) {
  const { t } = useTranslation(['auth']);
  const { Images } = useTheme();
  const { isIOS } = usePlatform();
  const { form, registerProvider } = useRegister({ navigation });

  return (
    <Form
      renderInputs={() => (
        <>
          <ControlledInput
            name="name"
            control={form.control}
            label={t('auth:inputs.name.label')}
            placeholder={t('auth:inputs.name.placeholder')}
            errorMessage={form.errors.name?.message}
            textContentType="name"
          />
          <ControlledInput
            name="email"
            control={form.control}
            label={t('auth:inputs.email.label')}
            placeholder={t('auth:inputs.email.placeholder')}
            errorMessage={form.errors.email?.message}
            textContentType="emailAddress"
          />
          <ControlledInput
            name="password"
            control={form.control}
            label={t('auth:inputs.password.label')}
            placeholder={t('auth:inputs.password.placeholder')}
            errorMessage={form.errors.password?.message}
            textContentType="newPassword"
            secured
          />
          <ControlledInput
            name="confirmPassword"
            control={form.control}
            label={t('auth:inputs.confirmPassword.label')}
            placeholder={t('auth:inputs.confirmPassword.placeholder')}
            errorMessage={form.errors.confirmPassword?.message}
            textContentType="newPassword"
            secured
          />
        </>
      )}
      renderButtons={() => (
        <>
          <Button label={t('auth:buttons.register')} onPress={form.onSubmit} />
          {isIOS ? (
            <Button
              label={t('auth:buttons.signUpWith', { provider: 'Apple' })}
              onPress={registerProvider.apple}
              icon={Images.icons.apple}
              type={ButtonType.Secondary}
            />
          ) : (
            <Button
              label={t('auth:buttons.signUpWith', { provider: 'Google' })}
              onPress={registerProvider.google}
              icon={Images.icons.google}
              type={ButtonType.Secondary}
            />
          )}
        </>
      )}
    />
  );
}
