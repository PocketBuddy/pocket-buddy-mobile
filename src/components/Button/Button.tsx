import { ButtonType, IconType } from 'types/components';
import { Icon, Spinner } from '@/components';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Constants } from '@/utils';
import debounce from 'lodash.debounce';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '@/hooks';

type Props = {
  label: string;
  onPress: () => void;
  type?: ButtonType;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: IconDefinition;
};

const FONT_BOLD_SIZE = 4.4;
const ICON_MARGIN_BOTTOM = 3;

export default function Button({
  label,
  onPress,
  type = ButtonType.Primary,
  isLoading = false,
  disabled = false,
  icon,
}: Props) {
  const { Common } = useTheme();
  const handlePress = useCallback(
    debounce(onPress, Constants.DEBOUNCE_TIMEOUT),
    [onPress],
  );
  const isDisabled = isLoading || disabled;
  const isPrimary = type === ButtonType.Primary;
  const spinnerSize = Common.button.primaryLabel.fontSize + FONT_BOLD_SIZE;

  return (
    <TouchableOpacity
      style={[
        isPrimary
          ? Common.button.primaryContainer
          : Common.button.secondaryContainer,
        isDisabled && Common.button.disabled,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
      testID="button"
    >
      {isLoading ? (
        <Spinner size={spinnerSize} />
      ) : (
        <View style={Common.button.labelWrapper}>
          {icon && (
            <Icon
              icon={icon}
              type={isPrimary ? IconType.Secondary : IconType.Primary}
              // Hack to set vertically optical zero
              style={{ marginBottom: ICON_MARGIN_BOTTOM }}
            />
          )}
          <Text
            style={[
              isPrimary
                ? Common.button.secondaryLabel
                : Common.button.primaryLabel,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
