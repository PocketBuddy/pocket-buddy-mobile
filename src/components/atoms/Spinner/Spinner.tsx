import { ActivityIndicator } from 'react-native';
import React from 'react';
import { SpinnerSize } from 'types/components';

type Props = {
  size?: number | SpinnerSize;
};

export default function Spinner({ size = SpinnerSize.Small }: Props) {
  return <ActivityIndicator size={size} testID="spinner" />;
}
