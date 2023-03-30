import { ThemeNavigationColors } from 'types/theme';

export const Colors = {
  transparent: 'transparent',
  background: '#EEF0F0',
  white: '#F6F7F7',
  primary: '#1F2425',
  primaryPlaceholder: '#12212633',
  secondary: '#F6F7F7',
  secondaryPlaceholder: '#F6F7F766',
  success: '#0AB96E',
  error: '#AA2220',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: Colors.white,
  card: Colors.white,
};

export default {
  Colors,
  NavigationColors,
};
