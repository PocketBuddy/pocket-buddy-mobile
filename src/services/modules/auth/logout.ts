import * as RNLocalize from 'react-native-localize';
import { api } from '@/services/api';
import AuthService from './auth';
import { BaseResponseWithAuth } from 'types/services';
import { Constants } from '@/utils';
import i18next from 'i18next';
import { loggedOut } from '@/store/auth';
import { removeCategories } from '@/store/categories';
import { removePreferences } from '@/store/preferences';
import { removePriorities } from '@/store/priorities';
import { removeUser } from '@/store/user';

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
        const response = (await cacheDataLoaded).data;
        if (response.message !== Constants.UNAUTHENTICATED_MESSAGE) {
          await Promise.all([
            dispatch(loggedOut()),
            dispatch(removeUser()),
            dispatch(removeCategories()),
            dispatch(removePriorities()),
            dispatch(removePreferences()),
            i18next.changeLanguage(RNLocalize.getLocales()[0].languageCode),
            AuthService.removeToken(),
          ]);
        }
      },
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;
