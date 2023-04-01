import { CommonParams } from 'types/theme';
import { StyleSheet } from 'react-native';

export default function <C>({ Fonts, Layout, Gutters }: CommonParams<C>) {
  const primaryContainer = {
    ...Layout.col,
    ...Layout.fullWidth,
    ...Gutters.tinyRowGap,
    ...Gutters.tinyRPadding,
    ...Gutters.tinyLPadding,
    ...Gutters.tinyBPadding,
    borderBottomWidth: 1,
    borderBottomColor: Fonts.titleSmall.color,
  };

  const primaryLabel = {
    ...Fonts.titleSmall,
  };

  const primaryInput = {
    ...Fonts.textRegular,
  };

  const primaryPlaceholder = {
    ...primaryInput,
    ...Fonts.textPrimaryPlaceholder,
  };

  const primaryIcon = {
    ...Layout.absolute,
    ...Layout.right0,
    ...Layout.bottom0,
  };

  const error = {
    ...primaryInput,
    ...Fonts.textError,
    ...Fonts.textBold,
    ...Gutters.tinyTPadding,
    ...Gutters.tinyLPadding,
    ...Fonts.textRight,
  };

  return StyleSheet.create({
    primaryContainer,
    primaryLabel,
    primaryInput,
    primaryPlaceholder,
    primaryIcon,
    error,
  });
}
