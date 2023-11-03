import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks';

type Props = {
  handlePress: (props: any) => void;
  isSelected?: boolean;
  name: string;
};

export default function Chip({ handlePress, isSelected = false, name }: Props) {
  const { Gutters, Fonts, Colors } = useTheme();

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          Gutters.tinyPadding,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: isSelected ? Colors.primary : Colors.transparent,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isSelected ? Colors.transparent : Colors.primary,
          },
        ]}
      >
        <Text
          style={[
            isSelected ? Fonts.textSecondary : Fonts.textPrimary,
            Fonts.textBold,
          ]}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
