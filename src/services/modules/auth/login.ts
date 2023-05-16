import { api } from '@/services/api';
import AuthService from './auth';
import { BaseResponse } from 'types/services';
import { loggedIn } from '@/store/auth';

type Request = {
  email: string;
  password: string;
  device_type: 'iphone' | 'android' | 'other';
};

type Response = Omit<BaseResponse, 'data'> & { data: { token: string } | null };

// TODO: refactor all files to single authApi
const loginApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<Response, Request>({
      query: data => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      onCacheEntryAdded: async (
        _,
        { dispatch, getCacheEntry, cacheDataLoaded },
      ) => {
        await cacheDataLoaded;
        const authToken = getCacheEntry().data?.data?.token;
        if (authToken) {
          await AuthService.setToken(authToken);
          dispatch(loggedIn());
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
