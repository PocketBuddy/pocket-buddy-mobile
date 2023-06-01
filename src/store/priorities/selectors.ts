import { RootState } from '..';

export const allPrioritiesSelector = (state: RootState) =>
  state.priorities.list;

export const prioritiesLoadingSelector = (state: RootState) =>
  state.priorities.isLoading;

export const priorityByIdSelector =
  (state: RootState) => (id?: number | null) =>
    state.priorities.list.find(priority => priority.id === id) || null;
