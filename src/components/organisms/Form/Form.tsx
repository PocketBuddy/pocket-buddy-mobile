import { KeyboardAwareScrollView } from '@mtourj/react-native-keyboard-aware-scroll-view';
import React from 'react';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

type Props = {
  renderInputs: () => React.ReactNode;
  renderButtons: () => React.ReactNode;
  enableAutomaticScroll?: boolean;
};

export default function Form({
  renderInputs,
  renderButtons,
  enableAutomaticScroll = true,
}: Props) {
  const { Gutters, Layout, Colors } = useTheme();

  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll={enableAutomaticScroll}
      contentContainerStyle={[
        Layout.scrollSpaceBetween,
        Gutters.smallRowGap,
        { backgroundColor: Colors.background },
      ]}
    >
      <View style={[Gutters.tinyRowGap]}>{renderInputs()}</View>
      <View style={[Gutters.tinyRowGap]}>{renderButtons()}</View>
    </KeyboardAwareScrollView>
  );
}
