import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { AuthSchema } from '@/schemas';
import { ScreenNames } from '@/navigators/routes';
import { show } from '@/store/toast';
import { ToastType } from 'types/components';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function useRegister({ navigation }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['toast']);
  const { handleSubmit, reset, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.register,
  });

  // TODO: Add logic for register
  const onSuccessSubmit = (values: Record<string, string>) => {
    if (values) {
      reset();
      navigation.navigate(ScreenNames.auth, {
        screen: ScreenNames.login,
        params: { name: values.name },
      });
      dispatch(
        show({
          header: t('toast:register.success.header'),
          message: t('toast:register.success.message'),
          type: ToastType.Success,
        }),
      );
    }
  };

  const onErrorSubmit = () =>
    dispatch(
      show({
        header: t('toast:register.error.header'),
        message: t('toast:register.error.message'),
        type: ToastType.Error,
      }),
    );

  const onSubmit = useCallback(
    () => handleSubmit(onSuccessSubmit, onErrorSubmit)(),
    [],
  );

  // TODO: Add logic for register with Apple and Google
  const registerWithApple = useCallback(
    () => console.log('Register: Apple'),
    [],
  );

  const registerWithGoogle = useCallback(
    () => console.log('Register: Google'),
    [],
  );

  return {
    form: {
      onSubmit,
      ...formProps,
    },
    registerProvider: {
      apple: registerWithApple,
      google: registerWithGoogle,
    },
  };
}
