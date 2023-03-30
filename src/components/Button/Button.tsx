import React, { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonType } from 'types/components';
import debounce from 'lodash.debounce';
import { Spinner } from '@/components';
import { useTheme } from '@/hooks';

type Props = {
  label: string;
  onPress: () => void;
  type?: ButtonType;
  isLoading?: boolean;
  disabled?: boolean;
};

export default function Button({
  label,
  onPress,
  type = ButtonType.Primary,
  isLoading = false,
  disabled = false,
}: Props) {
  const { Common } = useTheme();
  const handlePress = useCallback(debounce(onPress, 250), [onPress]);

  return (
    <TouchableOpacity
      style={[
        type === ButtonType.Primary
          ? Common.button.primaryContainer
          : Common.button.secondaryContainer,
        disabled && Common.button.disabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Text
          style={[
            type === ButtonType.Primary
              ? Common.button.primaryLabel
              : Common.button.secondaryLabel,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
