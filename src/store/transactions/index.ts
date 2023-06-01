import { TransactionListModel, TransactionModel } from 'types/models';
import { createSlice } from '@reduxjs/toolkit';

type TransactionsState = {
  isLoading: boolean;
  list: TransactionListModel;
};

type TransactionsLoadingPayload = {
  payload: boolean;
};

type TransactionsPayload = {
  payload: TransactionsState['list'];
};

type AddTransactionPayload = {
  payload: TransactionModel;
};

type EditTransactionPayload = {
  payload: TransactionModel;
};

type DeleteTransactionPayload = {
  payload: {
    id: TransactionModel['id'];
    spent_date: TransactionModel['spent_date'];
  };
};

const initialState: TransactionsState = {
  isLoading: false,
  list: [],
};

const transactionListSorter = (
  a: {
    spent_date: string;
    expenses: TransactionModel[];
  },
  b: {
    spent_date: string;
    expenses: TransactionModel[];
  },
) => {
  const dateA = new Date(a.spent_date);
  const dateB = new Date(b.spent_date);
  return dateB.getTime() - dateA.getTime();
};

const slice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactionsLoading: (
      state,
      { payload }: TransactionsLoadingPayload,
    ) => {
      if (payload !== undefined) {
        state.isLoading = payload;
      }
    },
    setTransactions: (state, { payload }: TransactionsPayload) => {
      if (payload !== undefined) {
        if (!state.list.length) {
          state.list = [...payload].sort(transactionListSorter);
          return;
        }

        payload.forEach(transaction => {
          const transactionsGroupIndex = state.list.findIndex(
            savedTransaction =>
              savedTransaction.spent_date === transaction.spent_date,
          );
          if (transactionsGroupIndex !== -1) {
            let expenseUpdatedIndex = -1;
            const expenseIndex = state.list[
              transactionsGroupIndex
            ].expenses.findIndex(savedExpense => {
              transaction.expenses.forEach((expense, index) => {
                if (expense.id === savedExpense.id) {
                  expenseUpdatedIndex = index;
                  return true;
                }
              });
            });
            if (expenseIndex !== -1) {
              state.list[transactionsGroupIndex].expenses[expenseIndex] =
                transaction.expenses[expenseUpdatedIndex];
            }
          } else {
            state.list = [...state.list, transaction];
          }
        });

        state.list = state.list.sort(transactionListSorter);
      }
    },
    addTransaction: (state, { payload }: AddTransactionPayload) => {
      if (payload !== undefined) {
        const { spent_date } = payload;
        const index = state.list.findIndex(
          transaction => transaction.spent_date === spent_date,
        );
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            amount_sum: state.list[index].amount_sum + payload.amount,
            expenses: [
              ...state.list[index].expenses,
              {
                ...payload,
              },
            ],
          };
        } else {
          state.list.unshift({
            amount_sum: payload.amount,
            spent_date,
            expenses: [payload],
          });
          state.list.sort(transactionListSorter);
        }
      }
    },
    editTransaction: (state, { payload }: EditTransactionPayload) => {
      if (payload !== undefined) {
        const { spent_date } = payload;
        const index = state.list.findIndex(
          transaction => transaction.spent_date === spent_date,
        );
        if (index !== -1) {
          const transactionIndex = state.list[index].expenses.findIndex(
            transaction => transaction.id === payload.id,
          );
          if (transactionIndex !== -1) {
            const dateChanged =
              state.list[index].expenses[transactionIndex].spent_date !==
              payload.spent_date;

            if (dateChanged) {
              state.list[index].expenses.splice(transactionIndex, 1);
              const newIndex = state.list.findIndex(
                transaction => transaction.spent_date === payload.spent_date,
              );
              if (newIndex !== -1) {
                state.list[newIndex].expenses.unshift(payload);
                return;
              } else {
                state.list.unshift({
                  amount_sum: payload.amount,
                  spent_date: payload.spent_date,
                  expenses: [payload],
                });
                state.list.sort(transactionListSorter);
                return;
              }
            }
            state.list[index].expenses[transactionIndex] = payload;
          }
        }
      }
    },
    removeTransaction: (state, { payload }: DeleteTransactionPayload) => {
      if (payload !== undefined) {
        const { spent_date } = payload;
        const index = state.list.findIndex(
          transaction => transaction.spent_date === spent_date,
        );
        if (index !== -1) {
          const transactionIndex = state.list[index].expenses.findIndex(
            transaction => transaction.id === payload.id,
          );
          if (transactionIndex !== -1) {
            state.list[index].amount_sum -=
              state.list[index].expenses[transactionIndex].amount;
            state.list[index].expenses.splice(transactionIndex, 1);
            if (state.list[index].expenses.length === 0) {
              state.list.splice(index, 1);
            }
          }
        }
      }
    },
    removeTransactions: () => initialState,
  },
});

export const {
  setTransactionsLoading,
  setTransactions,
  addTransaction,
  editTransaction,
  removeTransaction,
  removeTransactions,
} = slice.actions;

export default slice.reducer;
