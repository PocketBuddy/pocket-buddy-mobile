import { useCallback, useEffect } from 'react';
import { AuthSchema } from '@/schemas';
import { useForm } from '@/hooks';

type Props = {
  isSheetOpen: boolean;
};

const defaultValues = {
  email: '',
};

export default function usePasswordRecoverySheet({ isSheetOpen }: Props) {
  const { handleSubmit, reset, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.passwordRecovery,
  });

  useEffect(() => {
    !isSheetOpen && reset();
  }, [isSheetOpen]);

  // TODO: Add logic for login
  const onSubmit = useCallback(
    () =>
      handleSubmit(values => {
        try {
          console.log('Password Recovery Sheet:', values);
        } catch (e) {
          console.log('Password Recovery Sheet:', e);
        }
      })(),
    [],
  );

  return {
    form: {
      onSubmit,
      ...formProps,
    },
  };
}
