import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function HideKeyboard({ children }: Props) {
  const dismissKeyboard = useCallback(() => Keyboard.dismiss(), []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  );
}
