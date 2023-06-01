import { RootState } from '..';
import { TransactionListModel } from 'types/models';

export const allTransactionsSelector = (
  state: RootState,
): TransactionListModel => state.transactions.list;

export const transactionsByDateSelector =
  (state: RootState) => (date: string | Date) => {
    return state.transactions.list.find(
      transaction => transaction.spent_date === date.toString(),
    );
  };

export const transactionsLoadingSelector = (state: RootState) =>
  state.transactions.isLoading;

export const transactionById = (state: RootState) => (id: number | null) =>
  state.transactions.list
    .flatMap(transaction => transaction.expenses)
    .find(transaction => transaction.id === id) || null;

export const countTransactionsSelector = (state: RootState) =>
  state.transactions.list.flatMap(transaction => transaction.expenses).length;
