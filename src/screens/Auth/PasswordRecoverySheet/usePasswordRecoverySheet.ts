import { showError, showSuccess } from '@/store/toast';
import { useCallback, useEffect } from 'react';
import { AuthSchema } from '@/schemas';
import { useDispatch } from 'react-redux';
import { useForm } from '@/hooks';

type Props = {
  isSheetOpen: boolean;
  handleClose: () => void;
};

const defaultValues = {
  email: '',
};

const TIME_TO_CLOSE = 1000;

export default function usePasswordRecoverySheet({
  isSheetOpen,
  handleClose,
}: Props) {
  const dispatch = useDispatch();
  const { handleSubmit, reset, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.passwordRecovery,
  });

  useEffect(() => {
    !isSheetOpen && reset();
  }, [isSheetOpen]);

  // TODO: Add logic for password recovery
  const onSubmit = useCallback(
    () =>
      handleSubmit(values => {
        try {
          if (values) {
            handleClose();
            setTimeout(() => {
              reset();
              dispatch(
                showSuccess({
                  header: 'Password recovery email sent',
                  success: 'Check your email and follow the instructions',
                }),
              );
            }, TIME_TO_CLOSE);
          }
        } catch {
          dispatch(showError({}));
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
