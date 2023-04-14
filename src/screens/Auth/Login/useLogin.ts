import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenNames, StackNames } from '@/navigators/routes';
import { useBottomSheet, useForm } from '@/hooks';
import { useCallback, useEffect } from 'react';
import { AuthSchema } from '@/schemas';
import { Keyboard } from 'react-native';
import { show } from '@/store/toast';
import { ToastType } from 'types/components';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
  name?: string;
};

const defaultValues = {
  name: '',
  password: '',
};

export default function useLogin({ navigation, name }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['toast']);
  const { handleSubmit, reset, setValue, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.login,
  });
  const passwordRecoverySheet = useBottomSheet({
    openSideEffects: () => Keyboard.dismiss(),
  });

  useEffect(() => {
    // handling case when user name is passed after registration
    if (name) {
      setValue('name', name);
    }
  }, [name]);

  const goToRegister = useCallback(
    () => navigation.navigate(ScreenNames.register),
    [],
  );

  // TODO: Add logic for login
  const onSuccessSubmit = (values: Record<string, string>) => {
    if (values) {
      reset();
      navigation.navigate(StackNames.main);
    }
  };

  const onErrorSubmit = () =>
    dispatch(
      show({
        header: t('toast:login.error.header'),
        message: t('toast:login.error.message'),
        type: ToastType.Error,
      }),
    );

  const onSubmit = useCallback(
    () => handleSubmit(onSuccessSubmit, onErrorSubmit)(),
    [],
  );

  // TODO: Add logic for login with Apple and Google
  const loginWithApple = useCallback(() => console.log('Login: Apple'), []);

  const loginWithGoogle = useCallback(() => console.log('Login: Google'), []);

  return {
    goToRegister,
    passwordRecoverySheet,
    form: {
      onSubmit,
      ...formProps,
    },
    loginProvider: {
      apple: loginWithApple,
      google: loginWithGoogle,
    },
  };
}
