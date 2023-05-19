import React, { useRef, useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Icon } from '@/components';
import { IconType } from 'types/components';
import { useTheme } from '@/hooks';

export type InputProps = {
  label: string;
  value?: string;
  secured?: boolean;
  bottomSheet?: boolean;
  renderMessage?: () => React.ReactNode;
  onChangeText: () => void;
} & TextInputProps;

const CLICKABLE_ICON_AREA = 10;

export default function Input({
  label,
  value = '',
  secured = false,
  bottomSheet = false,
  renderMessage,
  onChangeText,
  ...props
}: InputProps) {
  const { Common, Images } = useTheme();
  const [passwordHidden, setPasswordHidden] = useState(secured);
  const inputRef = useRef<TextInput>(null);
  const togglePasswordHidden = () => setPasswordHidden(!passwordHidden);
  const focus = () => inputRef.current?.focus();

  return (
    <>
      <TouchableWithoutFeedback onPress={focus}>
        <View style={[Common.input.primaryContainer]}>
          <Text style={[Common.input.primaryLabel]}>{label}</Text>
          <View>
            {bottomSheet ? (
              <BottomSheetTextInput
                style={[Common.input.primaryInput]}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor={Common.input.primaryPlaceholder.color}
                secureTextEntry={passwordHidden}
                // @ts-ignore
                ref={inputRef}
                {...props}
              />
            ) : (
              <TextInput
                style={[Common.input.primaryInput]}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor={Common.input.primaryPlaceholder.color}
                secureTextEntry={passwordHidden}
                ref={inputRef}
                {...props}
              />
            )}
            {secured && (
              <TouchableWithoutFeedback
                onPress={togglePasswordHidden}
                hitSlop={CLICKABLE_ICON_AREA}
              >
                <View style={[Common.input.primaryIcon]}>
                  <Icon
                    icon={
                      passwordHidden
                        ? Images.icons.eyeOpen
                        : Images.icons.eyeClosed
                    }
                    type={IconType.Primary}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      {renderMessage && (
        <View style={[Common.input.messageWrapper]}>{renderMessage()}</View>
      )}
    </>
  );
}
