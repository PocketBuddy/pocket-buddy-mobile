import { BaseResponse, ResponseStatus } from 'types/services';
import { api } from '@/services/api';
import AuthService from './auth';
import { loggedIn } from '@/store/auth';

type Request = {
  email: string;
  password: string;
  device_type: 'iphone' | 'android' | 'other';
};

type Response = Omit<BaseResponse, 'data'> & { data: { token: string } | null };

const loginApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<Response, Request>({
      query: data => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      onCacheEntryAdded: async (_, { dispatch, cacheDataLoaded }) => {
        const response = (await cacheDataLoaded).data;
        if (response.status === ResponseStatus.Success) {
          if (response.data) {
            await AuthService.setToken(response.data.token);
            dispatch(loggedIn());
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
