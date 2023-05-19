import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@/hooks';

type Props = {
  text: string;
  size?: 'Small' | 'Regular' | 'Large';
};

export default function Title({ text, size = 'Regular' }: Props) {
  const { Fonts } = useTheme();

  return (
    <Text
      numberOfLines={2}
      ellipsizeMode="head"
      style={[Fonts[`title${size}`]]}
    >
      {text}
    </Text>
  );
}
