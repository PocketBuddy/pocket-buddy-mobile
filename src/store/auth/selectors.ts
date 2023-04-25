import { RootState } from '..';

export const isLoggedSelector = (state: RootState) => state.auth.isLogged;
