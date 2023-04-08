import * as yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useForm } from '@/hooks';

type Props = {
  isSheetOpen: boolean;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email cannot be empty'),
});

const defaultValues = {
  email: '',
};

export default function usePasswordRecoverySheet({ isSheetOpen }: Props) {
  const { handleSubmit, reset, ...formProps } = useForm({
    defaultValues,
    validationSchema,
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
