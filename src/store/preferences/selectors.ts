import { RootState } from '..';

export const languageSelector = (state: RootState) =>
  state.preferences.language;
