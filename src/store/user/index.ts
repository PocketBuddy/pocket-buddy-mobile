import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from 'types/models';

type UserState = {
  isLoading: boolean;
  user: UserModel;
};

type UserLoadingPayload = {
  payload: boolean;
};

type UserPayload = {
  payload: Partial<UserModel>;
};

const initialState: UserState = {
  isLoading: false,
  user: {
    id: -1,
    name: '',
    email: '',
    role: '',
    created_at: '',
    budgets: [],
    main_budget: null,
  },
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading: (state, { payload }: UserLoadingPayload) => {
      if (payload !== undefined) {
        state.isLoading = payload;
      }
    },
    setUser: (state, { payload }: UserPayload) => {
      if (payload !== undefined) {
        state.user = { ...state.user, ...payload };
      }
    },
    removeUser: () => initialState,
  },
});

export const { setUserLoading, setUser, removeUser } = slice.actions;

export default slice.reducer;
