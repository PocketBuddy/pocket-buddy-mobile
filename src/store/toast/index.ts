import { createSlice } from '@reduxjs/toolkit';

type ErrorState = {
  header: string | null;
  success: string | null;
  info: string | null;
  error: string | null;
  isOpen: boolean;
};

type ErrorPayload = {
  payload: Partial<ErrorState>;
};

const initialState: ErrorState = {
  header: null,
  success: null,
  info: null,
  error: null,
  isOpen: false,
};

const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showSuccess: (state, { payload: { success, header } }: ErrorPayload) => {
      if (typeof success !== 'undefined' && typeof header !== 'undefined') {
        state.header = header;
        state.success = success;
        state.isOpen = true;
      }
    },
    showInfo: (state, { payload: { info, header } }: ErrorPayload) => {
      if (typeof info !== 'undefined' && typeof header !== 'undefined') {
        state.header = header;
        state.info = info;
        state.isOpen = true;
      }
    },
    showError: (state, { payload: { error, header } }: ErrorPayload) => {
      if (typeof error !== 'undefined') {
        state.error = error;
      }
      if (typeof header !== 'undefined') {
        state.header = header;
      }
      state.isOpen = true;
    },
    hide: () => initialState,
  },
});

export const { showSuccess, showInfo, showError, hide } = slice.actions;

export default slice.reducer;
