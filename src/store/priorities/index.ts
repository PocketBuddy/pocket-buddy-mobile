import { createSlice } from '@reduxjs/toolkit';
import { PriorityModel } from 'types/models';

type PrioritiesState = {
  isLoading: boolean;
  list: PriorityModel[] | [];
};

type PrioritiesLoadingPayload = {
  payload: boolean;
};

type PrioritiesPayload = {
  payload: PriorityModel[] | [];
};

type AddPriorityPayload = {
  payload: PriorityModel;
};

type EditPriorityPayload = {
  payload: PriorityModel;
};

type RemovePriorityPayload = {
  payload: PriorityModel['id'];
};

const initialState: PrioritiesState = {
  isLoading: false,
  list: [],
};

const prioritySorter = (a: PriorityModel, b: PriorityModel) =>
  a.priority - b.priority;

const slice = createSlice({
  name: 'priorities',
  initialState,
  reducers: {
    setPrioritiesLoading: (state, { payload }: PrioritiesLoadingPayload) => {
      if (payload !== undefined) {
        state.isLoading = payload;
      }
    },
    setPriorities: (state, { payload }: PrioritiesPayload) => {
      if (payload !== undefined) {
        state.list = payload;
      }
    },
    addPriority: (state, { payload }: AddPriorityPayload) => {
      if (payload !== undefined) {
        state.list = [...state.list, payload].sort(prioritySorter);
      }
    },
    editPriority: (state, { payload }: EditPriorityPayload) => {
      if (payload !== undefined && payload.id) {
        const toReplaceIndex = state.list.findIndex(
          priority => priority.id === payload.id,
        );
        if (toReplaceIndex !== -1) {
          state.list[toReplaceIndex] = {
            ...state.list[toReplaceIndex],
            name: payload.name,
            priority: payload.priority,
          };
          state.list.sort(prioritySorter);
        }
      }
    },
    removePriority: (state, { payload }: RemovePriorityPayload) => {
      if (payload !== undefined) {
        const toRemoveIndex = state.list.findIndex(
          priority => priority.id === payload,
        );
        if (toRemoveIndex !== -1) {
          state.list.splice(toRemoveIndex, 1);
        }
      }
    },
    removePriorities: () => initialState,
  },
});

export const {
  setPrioritiesLoading,
  setPriorities,
  addPriority,
  editPriority,
  removePriority,
  removePriorities,
} = slice.actions;

export default slice.reducer;
