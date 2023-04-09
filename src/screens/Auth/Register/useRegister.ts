import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { showError, showSuccess } from '@/store/toast';
import { AuthSchema } from '@/schemas';
import { ScreenNames } from '@/navigators/routes';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '@/hooks';

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
  const { handleSubmit, reset, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.register,
  });

  const onSuccessSubmit = (values: Record<string, string>) => {
    try {
      if (values) {
        reset();
        navigation.navigate(ScreenNames.auth, {
          screen: ScreenNames.login,
          params: { name: values.name },
        });
        dispatch(
          showSuccess({
            header: 'Register success',
            success: 'You can login now',
          }),
        );
      }
    } catch {
      dispatch(showError({}));
    }
  };

  // TODO: do we need this?
  const onErrorSubmit = () =>
    dispatch(
      showError({
        error: 'Fields is not filled properly',
        header: 'Register Error',
      }),
    );

  // TODO: Add logic for register
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
