import { api } from '@/services/api';
import AuthService from './auth';
import { BaseResponseWithAuth } from 'types/services';
import { loggedOut } from '@/store/auth';

type Request = {};

type Response = BaseResponseWithAuth;

export const logoutApi = api.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<Response, Request>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      onCacheEntryAdded: async (_, { dispatch, cacheDataLoaded }) => {
        await cacheDataLoaded;
        await AuthService.removeToken();
        dispatch(loggedOut());
      },
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;
