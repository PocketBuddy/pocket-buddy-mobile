import { CategoryModel } from 'types/models';
import { RootState } from '..';

export const allCategoriesSelector = (state: RootState) =>
  state.categories.list;

export const categoryByIdSelector = (state: RootState) => (id?: number) =>
  state.categories.list.find(category => category.id === id) || null;

export const subcategoriesByIdSelector = (state: RootState) => (id?: number) =>
  state.categories.list.find(category => category.id === id)?.subcategories ||
  [];

export const subcategoryByIdSelector = (state: RootState) => (id?: number) => {
  let category: CategoryModel | undefined,
    subcategory: CategoryModel | undefined;

  state.categories.list.forEach(parent => {
    const subcategoryIndex = parent.subcategories.findIndex(
      item => item.id === id,
    );
    if (subcategoryIndex !== -1) {
      category = parent;
      subcategory = parent.subcategories[subcategoryIndex];
      return;
    }
  });

  return { category, subcategory };
};

export const categoriesLoadingSelector = (state: RootState) =>
  state.categories.isLoading;
