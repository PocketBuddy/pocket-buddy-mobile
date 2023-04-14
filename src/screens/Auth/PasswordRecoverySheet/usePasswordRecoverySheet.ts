import { useCallback, useEffect } from 'react';
import { AuthSchema } from '@/schemas';
import { show } from '@/store/toast';
import { ToastType } from 'types/components';
import { useDispatch } from 'react-redux';
import { useForm } from '@/hooks';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['toast']);
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
      handleSubmit((values: Record<string, string>) => {
        if (values) {
          handleClose();
          setTimeout(() => {
            reset();
            dispatch(
              show({
                header: t('toast:passwordRecovery.success.header'),
                message: t('toast:passwordRecovery.success.message'),
                type: ToastType.Success,
              }),
            );
          }, TIME_TO_CLOSE);
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
