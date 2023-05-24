import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { LanguagesCodes } from 'types/components';

type PreferencesState = {
  language: LanguagesCodes;
};

type LanguagePayload = {
  payload: LanguagesCodes;
};

const initialState: PreferencesState = {
  language:
    i18next.language === LanguagesCodes.English
      ? LanguagesCodes.English
      : LanguagesCodes.Polish,
};

const slice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setLanguage: (state, { payload }: LanguagePayload) => {
      if (payload !== undefined) {
        state.language = payload;
      }
    },
    removePreferences: () => initialState,
  },
});

export const { setLanguage, removePreferences } = slice.actions;

export default slice.reducer;
