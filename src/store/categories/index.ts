import { CategoryModel } from 'types/models';
import { createSlice } from '@reduxjs/toolkit';

type CategoriesState = {
  isLoading: boolean;
  list: CategoryModel[] | [];
};

type CategoriesLoadingPayload = {
  payload: boolean;
};

type CategoriesPayload = {
  payload: CategoryModel[] | [];
};

type AddCategoryPayload = {
  payload: {
    id: number;
    name: string;
  };
};

type AddSubCategoryPayload = {
  payload: {
    parentId: number;
    subCategory: Omit<CategoryModel, 'subcategories'>;
  };
};

type EditCategoryPayload = {
  payload: Omit<CategoryModel, 'subcategories'>;
};

type RemoveCategoryPayload = {
  payload: CategoryModel['id'];
};

const initialState: CategoriesState = {
  isLoading: false,
  list: [],
};

const categorySorter = (a: CategoryModel, b: CategoryModel) =>
  a.name.localeCompare(b.name);

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesLoading: (state, { payload }: CategoriesLoadingPayload) => {
      if (payload !== undefined) {
        state.isLoading = payload;
      }
    },
    setCategories: (state, { payload }: CategoriesPayload) => {
      if (payload !== undefined) {
        state.list = payload;
      }
    },
    addCategory: (state, { payload }: AddCategoryPayload) => {
      if (payload !== undefined) {
        state.list = [...state.list, { ...payload, subcategories: [] }].sort(
          categorySorter,
        );
      }
    },
    addSubCategory: (state, { payload }: AddSubCategoryPayload) => {
      if (payload !== undefined) {
        const toReplaceIndex = state.list.findIndex(
          category => category.id === payload.parentId,
        );
        if (toReplaceIndex !== -1) {
          state.list[toReplaceIndex].subcategories = [
            ...state.list[toReplaceIndex].subcategories,
            { ...payload.subCategory, subcategories: [] },
          ].sort(categorySorter);
        }
      }
    },
    editCategory: (state, { payload }: EditCategoryPayload) => {
      if (payload !== undefined && payload.id) {
        const toReplaceIndex = state.list.findIndex(
          category => category.id === payload.id,
        );
        if (toReplaceIndex !== -1) {
          state.list[toReplaceIndex] = {
            ...state.list[toReplaceIndex],
            name: payload.name,
          };
          state.list.sort(categorySorter);
          return;
        }
        for (const category of state.list) {
          const toReplaceNestedIndex = category.subcategories.findIndex(
            subCategory => subCategory.id === payload.id,
          );
          if (toReplaceNestedIndex !== -1) {
            category.subcategories[toReplaceNestedIndex] = {
              ...category.subcategories[toReplaceNestedIndex],
              name: payload.name,
            };
            category.subcategories.sort(categorySorter);
            return;
          }
        }
      }
    },
    removeCategory: (state, { payload }: RemoveCategoryPayload) => {
      if (payload !== undefined) {
        const toRemoveIndex = state.list.findIndex(
          category => category.id === payload,
        );
        if (toRemoveIndex !== -1) {
          state.list.splice(toRemoveIndex, 1);
          return;
        }
        for (const category of state.list) {
          const toRemoveNestedIndex = category.subcategories.findIndex(
            subCategory => subCategory.id === payload,
          );
          if (toRemoveNestedIndex !== -1) {
            category.subcategories.splice(toRemoveNestedIndex, 1);
            return;
          }
        }
      }
    },
    removeCategories: () => initialState,
  },
});

export const {
  setCategoriesLoading,
  setCategories,
  addCategory,
  addSubCategory,
  editCategory,
  removeCategory,
  removeCategories,
} = slice.actions;

export default slice.reducer;
