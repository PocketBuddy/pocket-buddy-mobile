import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenNames, StackNames } from '@/navigators/routes';
import { useBottomSheet, useForm } from '@/hooks';
import { useCallback, useEffect } from 'react';
import { AuthSchema } from '@/schemas';
import { Keyboard } from 'react-native';
import { showError } from '@/store/toast';
import { useDispatch } from 'react-redux';

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
  const { handleSubmit, reset, setValue, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.login,
  });
  const passwordRecoverySheet = useBottomSheet({
    openSideEffects: () => Keyboard.dismiss(),
  });

  useEffect(() => {
    if (name) {
      setValue('name', name);
    }
  }, [name]);

  const goToRegister = () => navigation.navigate(ScreenNames.register);

  const onSuccessSubmit = (values: Record<string, string>) => {
    try {
      if (values) {
        reset();
        navigation.navigate(StackNames.main);
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
        header: 'Login Error',
      }),
    );

  // TODO: Add logic for login
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
