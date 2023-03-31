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
    ...Layout.fullWidth,
    ...Gutters.tinyPadding,
    color: Colors.secondary,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
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

  return StyleSheet.create({
    primaryContainer,
    primaryLabel,
    secondaryContainer,
    secondaryLabel,
    labelWrapper,
    disabled,
  });
}
