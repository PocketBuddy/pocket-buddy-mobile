import { useCallback, useEffect } from 'react';
import { showToast } from '@/store/toast';
import { ToastType } from 'types/components';
import { TransactionsSchema } from '@/schemas';
import { useCreateTransactionMutation } from '@/services/modules/transactions';
import { useDispatch } from 'react-redux';
import { useForm } from '@/hooks';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
  const { handleSubmit, setValue, ...form } = useForm({
    defaultValues: defaultValues,
    validationSchema: TransactionsSchema.transaction,
  });
  const [createTransaction, { isSuccess, isLoading }] =
    useCreateTransactionMutation();

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

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
    createTransaction({
      amount: parseFloat(values.amount.replace(',', '.')),
      expense_category_id: +values.categoryId,
      expense_priority_id: +values.priorityId,
      name: values.name,
      spent_date: new Date(values.spentDate).toISOString().split('T')[0],
    });
  };

  useEffect(() => {
    return () => {
      form.reset(defaultValues);
    };
  }, []);

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
    isLoading,
    setCategoryId,
    setPriorityId,
    setSpentDate,
    onSubmit,
  };
}
