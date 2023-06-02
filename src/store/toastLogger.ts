import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit';
import { Constants } from '@/utils';
import i18n from '@/translations';
import { ResponseStatus } from 'types/services';
import { setTransactionsLoading } from './transactions';
import { showToast } from './toast';
import { ToastType } from 'types/components';

export const toastLogger: Middleware = store => next => action => {
  const status = action.payload?.data?.status || action.payload?.status;
  const message = action.payload?.data?.message || action.payload?.message;

  if (message === Constants.UNAUTHENTICATED_MESSAGE) {
    store.dispatch(
      showToast({
        header: i18n.t('toast:unauthenticated.header'),
        message: i18n.t('toast:unauthenticated.message'),
        type: ToastType.Error,
      }),
    );
    store.dispatch(setTransactionsLoading(false));
    return next(action);
  }
  if (status && message) {
    store.dispatch(
      showToast({
        header: status,
        message: message,
        type:
          status === ResponseStatus.Success || status === ToastType.Success
            ? ToastType.Success
            : ToastType.Error,
      }),
    );
    return next(action);
  }
  if (isRejectedWithValue(action)) {
    store.dispatch(
      showToast({
        header: i18n.t('toast:genericError.header'),
        message: i18n.t('toast:genericError.message'),
        type: ToastType.Error,
      }),
    );
  }
  return next(action);
};
