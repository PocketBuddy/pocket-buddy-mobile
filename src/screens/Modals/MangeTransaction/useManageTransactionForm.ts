import { useCallback, useEffect } from 'react';
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useEditTransactionMutation,
} from '@/services/modules/transactions';
import { useDispatch, useSelector } from 'react-redux';
import { decimalSeparatorSelector } from '@/store/preferences/selectors';
import { formatAmount } from '@/utils';
import { RootState } from '@/store';
import { showToast } from '@/store/toast';
import { ToastType } from 'types/components';
import { transactionById } from '@/store/transactions/selectors';
import { TransactionsSchema } from '@/schemas';
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

type Props = {
  transactionId: number | null;
};

export default function useManageTransactionForm({ transactionId }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['toast']);
  const navigation = useNavigation();
  const decimalSeparator = useSelector(decimalSeparatorSelector);
  const transaction = useSelector((state: RootState) =>
    transactionById(state)(transactionId),
  );

  const { handleSubmit, setValue, ...form } = useForm({
    defaultValues: defaultValues,
    validationSchema: TransactionsSchema.transaction,
  });
  const [
    createTransaction,
    { isSuccess: isCreateSuccess, isLoading: isCreateLoading },
  ] = useCreateTransactionMutation();
  const [
    editTransaction,
    { isSuccess: isEditSuccess, isLoading: isEditLoading },
  ] = useEditTransactionMutation();
  const [
    deleteTransaction,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteTransactionMutation();

  useEffect(() => {
    if (transaction) {
      setValue('name', transaction.name);
      setValue(
        'amount',
        formatAmount(transaction.amount.toString(), decimalSeparator),
      );
      setValue('spentDate', transaction.spent_date);
      setValue('categoryId', transaction.expense_category.id);
      setValue('priorityId', transaction.expense_priority.id);
    }
  }, [transaction]);

  useEffect(() => {
    if (isCreateSuccess || isEditSuccess || isDeleteSuccess) {
      navigation.goBack();
    }
  }, [isCreateSuccess, isEditSuccess, isDeleteSuccess]);

  const setCategoryId = (id: number | null) => {
    setValue('categoryId', id);
  };

  const setPriorityId = (id: number | null) => {
    setValue('priorityId', id);
  };

  const setSpentDate = (date: Date) => {
    setValue('spentDate', date);
  };

  const onDelete = useCallback(() => {
    if (transactionId) {
      deleteTransaction({ id: transactionId });
    }
  }, [transactionId]);

  const onSuccessSubmit = (values: Record<string, string>) => {
    if (transaction && transactionId) {
      editTransaction({
        id: transactionId,
        amount: parseFloat(values.amount.replace(',', '.')),
        expense_category_id: +values.categoryId,
        expense_priority_id: +values.priorityId,
        name: values.name,
        spent_date: new Date(values.spentDate).toISOString().split('T')[0],
      });
      return;
    }
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
    isLoading: isCreateLoading || isEditLoading || isDeleteLoading,
    setCategoryId,
    setPriorityId,
    setSpentDate,
    onSubmit,
    onDelete,
    defaultValues: {
      spentDate: transaction?.spent_date || defaultValues.spentDate,
      expenseCategoryId:
        transaction?.expense_category.id || defaultValues.categoryId,
      expensePriorityId:
        transaction?.expense_priority.id || defaultValues.priorityId,
    },
  };
}
