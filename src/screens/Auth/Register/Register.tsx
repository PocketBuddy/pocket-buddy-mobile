import { Button, ControlledInput, Form } from '@/components';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ButtonType } from 'types/components';
import { getTranslate } from '@/utils';
import React from 'react';
import useRegister from './useRegister';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Register({ navigation }: Props) {
  const { t } = useTranslation(['auth']);
  const { Images } = useTheme();
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
            errorMessage={getTranslate(form.errors.name?.message)}
            textContentType="name"
          />
          <ControlledInput
            name="email"
            control={form.control}
            label={t('auth:inputs.email.label')}
            placeholder={t('auth:inputs.email.placeholder')}
            errorMessage={getTranslate(form.errors.email?.message)}
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <ControlledInput
            name="password"
            control={form.control}
            label={t('auth:inputs.password.label')}
            placeholder={t('auth:inputs.password.placeholder')}
            errorMessage={getTranslate(form.errors.password?.message)}
            textContentType="newPassword"
            secured
          />
          <ControlledInput
            name="confirmPassword"
            control={form.control}
            label={t('auth:inputs.confirmPassword.label')}
            placeholder={t('auth:inputs.confirmPassword.placeholder')}
            errorMessage={getTranslate(form.errors.confirmPassword?.message)}
            textContentType="newPassword"
            onSubmitEditing={form.onSubmit}
            secured
          />
        </>
      )}
      renderButtons={() => (
        <>
          <Button
            label={t('auth:buttons.register')}
            onPress={form.onSubmit}
            isLoading={form.isLoading}
          />
          {registerProvider.apple && (
            <Button
              label={t('auth:buttons.signUpWith', { provider: 'Apple' })}
              onPress={registerProvider.apple}
              icon={Images.icons.apple}
              type={ButtonType.Secondary}
            />
          )}
          {registerProvider.google && (
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
