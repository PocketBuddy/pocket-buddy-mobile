/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native';
import { ThemeVariables } from 'types/theme';

export default function ({ FontSize, Colors }: ThemeVariables) {
  const baseText = {
    fontFamily: 'Gilroy',
    color: Colors.primary,
  };

  const baseTitle = {
    fontFamily: 'Gilroy',
    color: Colors.primary,
  };

  return StyleSheet.create({
    textTiny: {
      ...baseText,
      fontSize: FontSize.tiny,
    },
    textSmall: {
      ...baseText,
      fontSize: FontSize.small,
    },
    textRegular: {
      ...baseText,
      fontSize: FontSize.regular,
    },
    textLarge: {
      ...baseText,
      fontSize: FontSize.large,
    },
    textBold: {
      fontWeight: 'bold',
    },
    textUppercase: {
      textTransform: 'uppercase',
    },
    titleSmall: {
      ...baseTitle,
      fontWeight: 'bold',
      fontSize: FontSize.small * 1.5,
    },
    titleRegular: {
      ...baseTitle,
      fontWeight: 'bold',
      fontSize: FontSize.regular * 1.75,
    },
    titleLarge: {
      ...baseTitle,
      fontWeight: 'bold',
      fontSize: FontSize.large * 2,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textError: {
      color: Colors.error,
    },
    textSuccess: {
      color: Colors.success,
    },
    textPrimary: {
      color: Colors.primary,
    },
    textPrimaryPlaceholder: {
      color: Colors.primaryPlaceholder,
    },
    textSecondary: {
      color: Colors.secondary,
    },
    textSecondaryPlaceholder: {
      color: Colors.secondaryPlaceholder,
    },
  });
}
