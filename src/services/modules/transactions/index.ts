import {
  addTransaction,
  editTransaction,
  removeTransaction,
  setTransactions,
  setTransactionsLoading,
} from '@/store/transactions';
import { BaseResponse, ResponseStatus } from 'types/services';
import {
  TransactionListModel,
  TransactionMetaModel,
  TransactionModel,
} from 'types/models';
import { api } from '@/services/api';

type GetRequest = {
  page?: number;
  limit?: number;
  date_type?: 'relative' | 'static';
  date_subtraction?: 'week' | 'month' | 'year' | number;
  beginning_date?: string;
  end_date?: string;
};

type GetResponse = Omit<BaseResponse, 'data' | 'meta'> & {
  data: TransactionListModel;
  meta: TransactionMetaModel;
};

type CreateRequest = Omit<
  TransactionModel,
  'id' | 'expense_category' | 'expense_priority'
> & { expense_category_id: number; expense_priority_id: number };

type CreateResponse = Omit<BaseResponse, 'data'> & {
  data: {
    id: number;
    expense_category: TransactionModel['expense_category'];
    expense_priority: TransactionModel['expense_priority'];
  };
};

type EditRequest = CreateRequest & { id: number };

type EditResponse = Omit<BaseResponse, 'data'> & {
  data: {
    expense_category: TransactionModel['expense_category'];
    expense_priority: TransactionModel['expense_priority'];
  };
};

type DeleteRequest = {
  id: number;
};

type DeleteResponse = Omit<BaseResponse, 'data'> & {
  data: {
    spent_date: string;
  };
};

const transactionsApi = api.injectEndpoints({
  endpoints: build => ({
    getTransactions: build.query<GetResponse, GetRequest>({
      query: data => ({
        url: '/user-expense',
        method: 'GET',
        params: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setTransactionsLoading(true));
        const response = (await queryFulfilled).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(setTransactions(response.data));
        }
        dispatch(setTransactionsLoading(false));
      },
    }),
    createTransaction: build.mutation<CreateResponse, CreateRequest>({
      query: data => ({
        url: '/user-expense',
        method: 'POST',
        body: data,
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          const {
            expense_category_id,
            expense_priority_id,
            ...dataFromRequest
          } = request;
          dispatch(
            addTransaction({
              ...dataFromRequest,
              id: response.data.id,
              expense_category: {
                id: expense_category_id,
                name: response.data.expense_category.name,
              },
              expense_priority: {
                id: expense_priority_id,
                name: response.data.expense_priority.name,
                priority: response.data.expense_priority.priority,
              },
            }),
          );
        }
      },
    }),
    editTransaction: build.mutation<EditResponse, EditRequest>({
      query: data => ({
        url: `/user-expense/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          const {
            expense_category_id,
            expense_priority_id,
            ...dataFromRequest
          } = request;
          dispatch(
            editTransaction({
              ...dataFromRequest,
              expense_category: {
                id: expense_category_id,
                name: response.data.expense_category.name,
              },
              expense_priority: {
                id: expense_priority_id,
                name: response.data.expense_priority.name,
                priority: response.data.expense_priority.priority,
              },
            }),
          );
        }
      },
    }),
    deleteTransaction: build.mutation<DeleteResponse, DeleteRequest>({
      query: id => ({
        url: `/user-expense/${id}`,
        method: 'DELETE',
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(
            removeTransaction({
              id: request.id,
              spent_date: response.data.spent_date,
            }),
          );
        }
      },
    }),
  }),
});

export const {
  useLazyGetTransactionsQuery,
  useCreateTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
