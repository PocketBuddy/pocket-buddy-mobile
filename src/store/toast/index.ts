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
    show: (state, { payload: { header, message, type } }: ToastPayload) => {
      if (header && message && type) {
        state.header = header;
        state.message = message;
        state.type = type;
        state.isOpen = true;
      }
    },
    hide: () => initialState,
  },
});

export const { show, hide } = slice.actions;

export default slice.reducer;
