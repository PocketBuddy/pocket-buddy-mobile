import { AuthSchema } from '@/schemas';
import { useCallback } from 'react';
import { useForm } from '@/hooks';

type Props = {};

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function useRegister({}: Props) {
  const { handleSubmit, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.register,
  });

  // TODO: Add logic for register
  const onSubmit = useCallback(
    () =>
      handleSubmit(values => {
        try {
          console.log('Register:', values);
        } catch (e) {
          console.log('Register:', e);
        }
      })(),
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
