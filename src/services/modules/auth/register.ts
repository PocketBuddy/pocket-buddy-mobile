import { api } from '@/services/api';
import { BaseResponse } from 'types/services';

type Request = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_type: 'iphone' | 'android' | 'other';
};

type Response = BaseResponse;

export const registerApi = api.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<Response, Request>({
      query: data => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
