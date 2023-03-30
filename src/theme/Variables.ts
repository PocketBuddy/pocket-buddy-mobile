/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeNavigationColors } from 'types/theme';

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
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

/**
 * FontSize
 */
export const FontSize = {
  tiny: 14,
  small: 16,
  regular: 20,
  large: 40,
};

/**
 * Metrics Sizes
 */
export const MetricsSizes = {
  tiny: 10,
  small: 20,
  regular: 30,
  large: 60,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
