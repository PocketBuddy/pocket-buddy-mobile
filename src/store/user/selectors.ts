import { RootState } from '..';

export const userSelector = (state: RootState) => state.user.user;

export const userLoadingSelector = (state: RootState) => state.user.isLoading;
