import { ActivityIndicator } from 'react-native';
import React from 'react';

/**
 * 30 is the default size for ActivityIndicator
 * this value is matched to titleSmall font size
 * */
const SIZE = 30;

export default function Spinner() {
  return <ActivityIndicator size={SIZE} testID="spinner" />;
}
