import { showToast } from '@/store/toast';
import { ToastType } from 'types/components';
import { TransactionsSchema } from '@/schemas';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '@/hooks';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  name: '',
  amount: '',
  spentDate: new Date(),
  categoryId: null,
  priorityId: null,
  // isPerpetual: false,
  // repeatedAt: '',
};

export default function useAddTransactionForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['toast']);
  const { handleSubmit, setValue, ...form } = useForm({
    defaultValues: defaultValues,
    validationSchema: TransactionsSchema.transaction,
  });

  const setCategoryId = (id: number | null) => {
    setValue('categoryId', id);
  };

  const setPriorityId = (id: number | null) => {
    setValue('priorityId', id);
  };

  const setSpentDate = (date: Date) => {
    setValue('spentDate', date);
  };

  const onSuccessSubmit = (values: Record<string, string>) => {
    const mappedValues = {
      ...values,
      amount: parseFloat(values.amount.replace(',', '.')),
    };
    console.log(mappedValues);
  };

  const onErrorSubmit = () =>
    dispatch(
      showToast({
        header: t('toast:transaction.error.header'),
        message: t('toast:transaction.error.message'),
        type: ToastType.Error,
      }),
    );

  const onSubmit = useCallback(
    () => handleSubmit(onSuccessSubmit, onErrorSubmit)(),
    [],
  );

  return {
    form,
    setCategoryId,
    setPriorityId,
    setSpentDate,
    onSubmit,
  };
}
