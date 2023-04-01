import { ButtonRounded, ButtonType, IconType } from 'types/components';
import { Icon, Spinner } from '@/components';
import React, { useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Constants } from '@/utils';
import debounce from 'lodash.debounce';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '@/hooks';

type Props = {
  label: string;
  onPress: () => void;
  type?: ButtonType;
  rounded?: ButtonRounded;
  isLoading?: boolean;
  disabled?: boolean;
  grayed?: boolean;
  icon?: IconDefinition;
} & TouchableOpacityProps;

const FONT_BOLD_SIZE = 4.4;
const ICON_MARGIN_BOTTOM = 3;

export default function Button({
  label,
  onPress,
  type = ButtonType.Primary,
  rounded,
  isLoading = false,
  disabled = false,
  grayed = false,
  icon,
}: Props) {
  const { Common } = useTheme();
  const isDisabled = isLoading || disabled;
  const isPrimary = type === ButtonType.Primary;
  const isRightRounded = rounded === ButtonRounded.Right;
  const isLeftRounded = rounded === ButtonRounded.Left;
  const spinnerSize = Common.button.primaryLabel.fontSize + FONT_BOLD_SIZE;

  const handlePress = useCallback(
    debounce(onPress, Constants.DEBOUNCE_TIMEOUT),
    [onPress],
  );

  return (
    <TouchableOpacity
      style={[
        isPrimary
          ? Common.button.primaryContainer
          : Common.button.secondaryContainer,
        (isDisabled || grayed) && Common.button.disabled,
        isRightRounded && Common.button.rightRounded,
        isLeftRounded && Common.button.leftRounded,
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
