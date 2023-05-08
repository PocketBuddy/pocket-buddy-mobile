import { CategoryModel } from 'types/models';
import { createSlice } from '@reduxjs/toolkit';

type CategoriesState = { list: CategoryModel[] | [] };

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
    subCategory: Omit<CategoryModel, 'all_subcategories'>;
  };
};

type EditCategoryPayload = {
  payload: Omit<CategoryModel, 'all_subcategories'>;
};

type RemoveCategoryPayload = {
  payload: CategoryModel['id'];
};

const initialState: CategoriesState = {
  list: [],
};

const categorySorter = (a: CategoryModel, b: CategoryModel) =>
  a.name.localeCompare(b.name);

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, { payload }: CategoriesPayload) => {
      if (payload !== undefined) {
        state.list = payload;
      }
    },
    addCategory: (state, { payload }: AddCategoryPayload) => {
      if (payload !== undefined) {
        state.list = [
          ...state.list,
          { ...payload, all_subcategories: [] },
        ].sort(categorySorter);
      }
    },
    addSubCategory: (state, { payload }: AddSubCategoryPayload) => {
      if (payload !== undefined) {
        const toReplaceIndex = state.list.findIndex(
          category => category.id === payload.parentId,
        );
        if (toReplaceIndex !== -1) {
          state.list[toReplaceIndex].all_subcategories = [
            ...state.list[toReplaceIndex].all_subcategories,
            { ...payload.subCategory, all_subcategories: [] },
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
        }
      }
    },
    removeCategories: () => initialState,
  },
});

export const {
  setCategories,
  addCategory,
  addSubCategory,
  editCategory,
  removeCategory,
  removeCategories,
} = slice.actions;

export default slice.reducer;
