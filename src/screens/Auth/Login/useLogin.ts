import * as yup from 'yup';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useBottomSheet, useForm } from '@/hooks';
import { Keyboard } from 'react-native';
import { useCallback } from 'react';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const validationSchema = yup.object({
  name: yup.string().required('Name cannot be empty'),
  password: yup.string().required('Password cannot be empty'),
});

const defaultValues = {
  name: '',
  password: '',
};

export default function useLogin({ navigation }: Props) {
  const { handleSubmit, ...formProps } = useForm({
    defaultValues,
    validationSchema,
  });
  const passwordRecoverySheet = useBottomSheet({
    openSideEffects: () => Keyboard.dismiss(),
  });

  const goToRegister = () => navigation.navigate('Register');

  // TODO: Add logic for login
  const handleLogin = useCallback(
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
      handleLogin,
      ...formProps,
    },
    loginProvider: {
      apple: loginWithApple,
      google: loginWithGoogle,
    },
  };
}
