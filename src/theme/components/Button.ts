import { CommonParams } from 'types/theme';
import { StyleSheet } from 'react-native';

export default function <C>({
  Colors,
  Gutters,
  Layout,
  Fonts,
}: CommonParams<C>) {
  const primaryContainer = {
    ...Layout.center,
    ...Layout.fill,
    ...Gutters.tinyPadding,
    color: Colors.secondary,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  };

  const primaryLabel = {
    ...Fonts.titleSmall,
    ...Fonts.textCenter,
    ...Fonts.textPrimary,
  };

  const secondaryContainer = {
    ...primaryContainer,
    backgroundColor: Colors.secondary,
    color: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
  };

  const secondaryLabel = { ...primaryLabel, ...Fonts.textSecondary };

  const labelWrapper = {
    ...Layout.rowCenter,
    ...Gutters.tinyColumnGap,
    ...Layout.fullWidth,
  };

  const disabled = {
    opacity: 0.75,
  };

  const rightRounded = {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  const leftRounded = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };

  return StyleSheet.create({
    primaryContainer,
    primaryLabel,
    secondaryContainer,
    secondaryLabel,
    labelWrapper,
    disabled,
    rightRounded,
    leftRounded,
  });
}
