import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useForm, usePlatform } from '@/hooks';
import { AuthSchema } from '@/schemas';
import { ScreenNames } from '@/navigators/routes';
import { showToast } from '@/store/toast';
import { ToastType } from 'types/components';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/services/modules/auth/register';
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
  const [registerMutation, { isSuccess, isLoading }] = useRegisterMutation();
  const { isIOS, isAndroid } = usePlatform();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(ScreenNames.auth, {
        screen: ScreenNames.login,
        params: { email: formProps.control._formValues.email },
      });
      dispatch(
        showToast({
          header: t('toast:register.success.header'),
          message: t('toast:register.success.message'),
          type: ToastType.Success,
        }),
      );
      reset();
    }
  }, [isSuccess]);

  const onSuccessSubmit = async (values: Record<string, string>) => {
    await registerMutation({
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
      device_type: isIOS ? 'iphone' : isAndroid ? 'android' : 'other',
    });
  };

  const onErrorSubmit = () =>
    dispatch(
      showToast({
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
      isLoading,
      ...formProps,
    },
    registerProvider: {
      apple: isIOS && registerWithApple,
      google: isAndroid && registerWithGoogle,
    },
  };
}
