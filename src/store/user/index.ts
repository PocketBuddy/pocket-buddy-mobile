import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from 'types/models';

type UserState = UserModel | {};

type UserDetailsPayload = {
  payload: Partial<UserModel>;
};

const initialState: UserState = {};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: UserDetailsPayload) => {
      if (payload !== undefined) {
        state = { ...state, ...payload };
      }
    },
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = slice.actions;

export default slice.reducer;
