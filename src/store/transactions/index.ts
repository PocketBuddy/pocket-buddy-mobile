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

export const transactionsSlice = createSlice({
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
              for (const [index, expense] of transaction.expenses.entries()) {
                if (expense.id === savedExpense.id) {
                  expenseUpdatedIndex = index;
                  break;
                }
              }
              return expenseUpdatedIndex !== -1;
            });
            if (expenseIndex !== -1) {
              state.list[transactionsGroupIndex].expenses[expenseIndex] = {
                ...state.list[transactionsGroupIndex].expenses[expenseIndex],
                ...transaction.expenses[expenseUpdatedIndex],
              };
              state.list[transactionsGroupIndex].amount_sum = state.list[
                transactionsGroupIndex
              ].expenses.reduce((acc, expense) => acc + expense.amount, 0);
            } else {
              state.list[transactionsGroupIndex] = {
                ...state.list[transactionsGroupIndex],
                amount_sum:
                  state.list[transactionsGroupIndex].amount_sum +
                  transaction.amount_sum,
                expenses: [
                  ...state.list[transactionsGroupIndex].expenses,
                  ...transaction.expenses,
                ],
              };
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
          state.list.push({
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
        const newDateIndex = state.list.findIndex(
          transaction => transaction.spent_date === payload.spent_date,
        );

        // if new date existed
        if (newDateIndex !== -1) {
          const transactionIndex = state.list[newDateIndex].expenses.findIndex(
            transaction => transaction.id === payload.id,
          );

          // if date group is not changed
          if (transactionIndex !== -1) {
            state.list[newDateIndex].expenses[transactionIndex] = payload;
            state.list[newDateIndex].amount_sum = state.list[
              newDateIndex
            ].expenses.reduce((acc, expense) => acc + expense.amount, 0);
          } else {
            const oldItem = state.list
              .flatMap(transaction => transaction.expenses)
              .find(transaction => transaction.id === payload.id);

            if (oldItem) {
              const oldDateIndex = state.list.findIndex(
                transaction => transaction.spent_date === oldItem.spent_date,
              );

              state.list[oldDateIndex].expenses = state.list[
                oldDateIndex
              ].expenses.filter(transaction => transaction.id !== payload.id);
              state.list[oldDateIndex].amount_sum = state.list[
                oldDateIndex
              ].expenses.reduce((acc, expense) => acc + expense.amount, 0);

              if (!state.list[oldDateIndex].expenses.length) {
                state.list.splice(oldDateIndex, 1);
              }
            }

            state.list[newDateIndex].expenses.push(payload);
            state.list[newDateIndex].amount_sum += payload.amount;
          }
        }
        // if we need to create new date group
        else {
          const oldItem = state.list
            .flatMap(transaction => transaction.expenses)
            .find(transaction => transaction.id === payload.id);

          if (oldItem) {
            const oldDateIndex = state.list.findIndex(
              transaction => transaction.spent_date === oldItem.spent_date,
            );

            state.list[oldDateIndex].expenses = state.list[
              oldDateIndex
            ].expenses.filter(transaction => transaction.id !== payload.id);
            state.list[oldDateIndex].amount_sum = state.list[
              oldDateIndex
            ].expenses.reduce((acc, expense) => acc + expense.amount, 0);

            if (!state.list[oldDateIndex].expenses.length) {
              state.list.splice(oldDateIndex, 1);
            }
          }

          state.list.push({
            amount_sum: payload.amount,
            spent_date: payload.spent_date,
            expenses: [payload],
          });
        }

        state.list.sort(transactionListSorter);
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
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
