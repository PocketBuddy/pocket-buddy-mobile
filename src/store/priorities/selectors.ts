import { RootState } from '..';

export const allPrioritiesSelector = (state: RootState) =>
  state.priorities.list;
