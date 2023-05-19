import { BaseResponse, ResponseStatus } from 'types/services';
import { setUser, setUserLoading } from '@/store/user';
import { api } from '@/services/api';
import { UserModel } from 'types/models';

type Request = {};

type Response = Omit<BaseResponse, 'data'> & { data: UserModel };

const userApi = api.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<Response, Request>({
      query: () => ({
        url: '/user/me',
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        dispatch(setUserLoading(true));
        queryFulfilled.catch(() => dispatch(setUserLoading(false)));
      },
      onCacheEntryAdded: async (_, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(setUser(response.data));
        }
        dispatch(setUserLoading(false));
      },
    }),
  }),
});

export const { useLazyGetUserQuery } = userApi;
