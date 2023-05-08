import { BaseResponse, ResponseStatus } from 'types/services';
import { api } from '@/services/api';
import { setUser } from '@/store/user';
import { UserModel } from 'types/models';

type Request = {};

type Response = Omit<BaseResponse, 'data'> & { data: UserModel };

const userApi = api.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<Response, Request>({
      query: () => ({
        url: '/user/me',
      }),
      onCacheEntryAdded: async (_, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          dispatch(setUser(response.data));
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
