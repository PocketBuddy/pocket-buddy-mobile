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
    borderRadius: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  };

  const primaryLabel = { ...Fonts.titleSmall, ...Fonts.textSecondary };

  const secondaryContainer = {
    ...primaryContainer,
    backgroundColor: Colors.secondary,
    color: Colors.primary,
  };

  const secondaryLabel = { ...primaryLabel, ...Fonts.textPrimary };

  const disabled = {
    opacity: 0.75,
  };

  return StyleSheet.create({
    primaryContainer,
    primaryLabel,
    secondaryContainer,
    secondaryLabel,
    disabled,
  });
}
