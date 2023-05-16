import { RootState } from '..';

export const allCategoriesSelector = (state: RootState) =>
  state.categories.list;

export const categoriesLoadingSelector = (state: RootState) =>
  state.categories.isLoading;
