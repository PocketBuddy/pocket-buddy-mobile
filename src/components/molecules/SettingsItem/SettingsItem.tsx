import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks';

type Props = {
  title: string;
  handlePress: () => void;
};

export default function SettingsItem({ title, handlePress }: Props) {
  const { Fonts, Gutters } = useTheme();

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[Gutters.tinyPadding]}>
        <Text style={[Fonts.titleSmall]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
