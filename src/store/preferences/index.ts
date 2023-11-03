import { createSlice } from '@reduxjs/toolkit';
import { getNumberFormatSettings } from 'react-native-localize';
import i18next from 'i18next';
import { LanguagesCodes } from 'types/components';

type PreferencesState = {
  language: LanguagesCodes;
  decimalSeparator: string;
};

type LanguagePayload = {
  payload: LanguagesCodes;
};

type DecimalSeparatorPayload = {
  payload: string;
};

const initialState: PreferencesState = {
  language:
    i18next.language === LanguagesCodes.English
      ? LanguagesCodes.English
      : LanguagesCodes.Polish,
  decimalSeparator: getNumberFormatSettings().decimalSeparator,
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
    setDecimalSeparatorFormat: (
      state,
      { payload }: DecimalSeparatorPayload,
    ) => {
      if (payload !== undefined) {
        state.decimalSeparator = payload;
      }
    },
    removePreferences: () => initialState,
  },
});

export const { setLanguage, setDecimalSeparatorFormat, removePreferences } =
  slice.actions;

export default slice.reducer;
