import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useBottomSheet, useForm } from '@/hooks';
import { AuthSchema } from '@/schemas';
import { Keyboard } from 'react-native';
import { useCallback } from 'react';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const defaultValues = {
  name: '',
  password: '',
};

export default function useLogin({ navigation }: Props) {
  const { handleSubmit, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.login,
  });
  const passwordRecoverySheet = useBottomSheet({
    openSideEffects: () => Keyboard.dismiss(),
  });

  const goToRegister = () => navigation.navigate('Register');

  // TODO: Add logic for login
  const onSubmit = useCallback(
    () =>
      handleSubmit(values => {
        try {
          console.log('Login:', values);
        } catch (e) {
          console.log('Login:', e);
        }
      })(),
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
