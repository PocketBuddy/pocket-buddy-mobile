import { RootState } from '..';

export const languageSelector = (state: RootState) =>
  state.preferences.language;

export const decimalSeparatorSelector = (state: RootState) =>
  state.preferences.decimalSeparator;
