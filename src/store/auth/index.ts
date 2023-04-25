import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  isLogged: boolean;
};

const initialState: AuthState = {
  isLogged: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: state => {
      state.isLogged = true;
    },
    loggedOut: () => initialState,
  },
});

export const { loggedIn, loggedOut } = slice.actions;

export default slice.reducer;
