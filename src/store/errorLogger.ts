import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit';
import i18n from '@/translations';
import { show } from './toast';
import { ToastType } from 'types/components';

export const errorLogger: Middleware = store => next => action => {
  if (isRejectedWithValue(action)) {
    console.warn(`Rejected action: ${action.type}`);
    store.dispatch(
      show({
        header: i18n.t('toast:genericError.header'),
        message: i18n.t('toast:genericError.message'),
        type: ToastType.Error,
      }),
    );
  }

  return next(action);
};
