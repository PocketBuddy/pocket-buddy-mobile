import React, { useCallback } from 'react';
import { KeyboardAwareScrollView } from '@mtourj/react-native-keyboard-aware-scroll-view';
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
  const onStartShouldSetResponder = useCallback(() => true, []);

  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll={enableAutomaticScroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        Layout.scrollSpaceBetween,
        Gutters.smallRowGap,
        { backgroundColor: Colors.background },
      ]}
    >
      <View
        style={[Gutters.tinyRowGap]}
        onStartShouldSetResponder={onStartShouldSetResponder}
      >
        {renderInputs()}
      </View>
      <View
        style={[Gutters.tinyRowGap]}
        onStartShouldSetResponder={onStartShouldSetResponder}
      >
        {renderButtons()}
      </View>
    </KeyboardAwareScrollView>
  );
}
