import { createSlice } from '@reduxjs/toolkit';
import { ToastType } from 'types/components';

type ToastState = {
  header: string;
  message: string;
  type: ToastType;
  isOpen: boolean;
};

type ToastPayload = {
  payload: Partial<Omit<ToastState, 'isOpen'>>;
};

const initialState: ToastState = {
  header: '',
  message: '',
  type: ToastType.Info,
  isOpen: false,
};

const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      { payload: { header, message, type } }: ToastPayload,
    ) => {
      if (header && message && type) {
        state.header = header;
        state.message = message;
        state.type = type;
        state.isOpen = true;
      }
    },
    hideToast: () => initialState,
  },
});

export const { showToast, hideToast } = slice.actions;

export default slice.reducer;
