import {
  addPriority,
  editPriority,
  removePriority,
  setPriorities,
} from '@/store/priorities';
import { BaseResponse, ResponseStatus } from 'types/services';
import { api } from '@/services/api';
import { PriorityModel } from 'types/models';

type Request = {
  id: number;
  name: string;
  priority: number;
};

type Response = BaseResponse;

type GetResponse = Omit<Response, 'data'> & { data: PriorityModel[] };

type CreateResponse = Omit<Response, 'data'> & { data: { id: number } };

const prioritiesApi = api.injectEndpoints({
  endpoints: build => ({
    getPriorities: build.query<GetResponse, {}>({
      query: () => ({
        // TODO: change url to /user-expense-category when backend will be ready
        url: '/user/priorities',
      }),
      onCacheEntryAdded: async (_, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(setPriorities(response.data));
        }
      },
    }),
    createPriority: build.mutation<CreateResponse, Omit<Request, 'id'>>({
      query: data => ({
        url: '/user-expense-priority',
        method: 'POST',
        body: data,
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(
            addPriority({
              id: response.data.id,
              name: request.name,
              priority: request.priority,
            }),
          );
        }
      },
    }),
    editPriority: build.mutation<Response, Request>({
      query: data => ({
        url: `/user-expense-priority/${data.id}`,
        method: 'PATCH',
        body: {
          name: data.name,
          priority: data.priority,
        },
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(editPriority(request));
        }
      },
    }),
    deletePriority: build.mutation<Response, Omit<Request, 'name'>>({
      query: data => ({
        url: `/user-expense-priority/${data.id}`,
        method: 'DELETE',
      }),
      onCacheEntryAdded: async (request, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(removePriority(request.id));
        }
      },
    }),
  }),
});

export const {
  useGetPrioritiesQuery,
  useCreatePriorityMutation,
  useEditPriorityMutation,
  useDeletePriorityMutation,
} = prioritiesApi;
