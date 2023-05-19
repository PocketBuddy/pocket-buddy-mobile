import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from 'types/models';

type UserState = {
  isLoading: boolean;
  user: UserModel | {};
};

type UserLoadingPayload = {
  payload: boolean;
};

type UserDetailsPayload = {
  payload: Partial<UserModel>;
};

const initialState: UserState = {
  isLoading: false,
  user: {},
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
    setUser: (state, { payload }: UserDetailsPayload) => {
      if (payload !== undefined) {
        state.user = { ...state.user, ...payload };
      }
    },
    removeUser: () => initialState,
  },
});

export const { setUserLoading, setUser, removeUser } = slice.actions;

export default slice.reducer;
