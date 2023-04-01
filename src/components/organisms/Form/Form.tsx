import { KeyboardAwareScrollView } from '@mtourj/react-native-keyboard-aware-scroll-view';
import React from 'react';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

type Props = {
  renderInputs: () => React.ReactNode;
  renderButtons: () => React.ReactNode;
};

export default function FormRegister({ renderInputs, renderButtons }: Props) {
  const { Gutters, Layout } = useTheme();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[Layout.scrollSpaceBetween]}
    >
      <View style={[Gutters.tinyRowGap]}>{renderInputs()}</View>
      <View style={[Gutters.tinyRowGap]}>{renderButtons()}</View>
    </KeyboardAwareScrollView>
  );
}
