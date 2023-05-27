import { RootState } from '..';

export const allCategoriesSelector = (state: RootState) =>
  state.categories.list;

export const subcategoriesByIdSelector = (state: RootState) => (id?: number) =>
  state.categories.list.find(category => category.id === id)?.subcategories ||
  [];

export const categoriesLoadingSelector = (state: RootState) =>
  state.categories.isLoading;
