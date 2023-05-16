import { RootState } from '..';

export const allPrioritiesSelector = (state: RootState) =>
  state.priorities.list;

export const prioritiesLoadingSelector = (state: RootState) =>
  state.priorities.isLoading;
