import { CommonParams } from 'types/theme';
import { StyleSheet } from 'react-native';

export default function <C>({ Fonts }: CommonParams<C>) {
  const primary = {
    ...Fonts.textPrimary,
  };

  const secondary = {
    ...Fonts.textSecondary,
  };

  const inactive = {
    ...Fonts.textPrimaryPlaceholder,
  };

  return StyleSheet.create({
    primary,
    secondary,
    inactive,
  });
}
