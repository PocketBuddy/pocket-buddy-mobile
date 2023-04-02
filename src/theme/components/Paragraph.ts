import { CommonParams } from 'types/theme';
import { StyleSheet } from 'react-native';

export default function <C>({ Fonts }: CommonParams<C>) {
  const primary = {
    ...Fonts.textRegular,
    ...Fonts.textLeft,
  };

  const bolded = {
    ...Fonts.textBold,
  };

  const error = {
    ...bolded,
    ...Fonts.textError,
  };

  const center = {
    ...Fonts.textCenter,
  };

  const right = {
    ...Fonts.textRight,
  };

  return StyleSheet.create({
    primary,
    bolded,
    error,
    right,
    center,
  });
}
