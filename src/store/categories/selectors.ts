import { RootState } from '..';

export const allCategoriesSelector = (state: RootState) =>
  state.categories.list;
