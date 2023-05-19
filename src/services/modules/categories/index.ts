import {
  addCategory,
  addSubCategory,
  editCategory,
  removeCategory,
  setCategories,
  setCategoriesLoading,
} from '@/store/categories';
import { BaseResponse, ResponseStatus } from 'types/services';
import { api } from '@/services/api';
import { CategoryModel } from 'types/models';

type Request = {
  id: number;
  name: string;
};

type Response = BaseResponse;

type GetResponse = Omit<Response, 'data'> & { data: CategoryModel[] };

type CreateResponse = Omit<Response, 'data'> & { data: { id: number } };

const categoriesApi = api.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query<GetResponse, {}>({
      query: () => ({
        // TODO: change url to /user-expense-category when backend will be ready
        url: '/user/categories',
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        dispatch(setCategoriesLoading(true));
        queryFulfilled.catch(() => dispatch(setCategoriesLoading(false)));
      },
      onCacheEntryAdded: async (_, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(setCategories(response.data));
        }
        dispatch(setCategoriesLoading(false));
      },
    }),
    createCategory: build.mutation<CreateResponse, Omit<Request, 'id'>>({
      query: data => ({
        url: '/user-expense-category',
        method: 'POST',
        body: data,
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(addCategory({ id: response.data.id, name: request.name }));
        }
      },
    }),
    createSubCategory: build.mutation<CreateResponse, Request>({
      query: data => ({
        url: '/user-expense-category',
        method: 'POST',
        body: {
          user_expense_category_id: data.id,
          name: data.name,
        },
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(
            addSubCategory({
              parentId: request.id,
              subCategory: { id: response.data.id, name: request.name },
            }),
          );
        }
      },
    }),
    editCategory: build.mutation<Response, Request>({
      query: data => ({
        url: `/user-expense-category/${data.id}`,
        method: 'PATCH',
        body: {
          name: data.name,
        },
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(editCategory(request));
        }
      },
    }),
    deleteCategory: build.mutation<Response, Omit<Request, 'name'>>({
      query: data => ({
        url: `/user-expense-category/${data.id}`,
        method: 'DELETE',
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(removeCategory(request.id));
        }
      },
    }),
  }),
});

export const {
  useLazyGetCategoriesQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
