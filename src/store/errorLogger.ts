import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit';
import { showError } from './toast';

export const errorLogger: Middleware = store => next => action => {
  if (isRejectedWithValue(action)) {
    console.warn(`Rejected action: ${action.type}`);
    store.dispatch(showError({}));
  }

  return next(action);
};
