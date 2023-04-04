import { KeyboardDismissMode, KeyboardPersisted } from 'types/components';
import React, { useCallback } from 'react';
import { KeyboardAwareScrollView } from '@mtourj/react-native-keyboard-aware-scroll-view';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

type Props = {
  renderInputs: () => React.ReactNode;
  renderButtons: () => React.ReactNode;
  enableAutomaticScroll?: boolean;
  keyboardShouldPersistTaps?: KeyboardPersisted;
  keyboardDismissMode?: KeyboardDismissMode;
};

export default function Form({
  renderInputs,
  renderButtons,
  enableAutomaticScroll = true,
  keyboardShouldPersistTaps = KeyboardPersisted.Handled,
  keyboardDismissMode = KeyboardDismissMode.OnDrag,
}: Props) {
  const { Gutters, Layout, Colors } = useTheme();
  const onStartShouldSetResponder = useCallback(() => true, []);

  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll={enableAutomaticScroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      keyboardDismissMode={keyboardDismissMode}
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
