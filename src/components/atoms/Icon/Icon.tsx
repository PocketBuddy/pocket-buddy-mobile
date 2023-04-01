import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome';
import { IconType, IconTypes } from 'types/components';
import React from 'react';
import { useTheme } from '@/hooks';

type Props = {
  icon: IconTypes;
  type?: IconType;
  size?: number;
  style?: FontAwesomeIconStyle;
};

export default function Icon({
  icon,
  type = IconType.Primary,
  size,
  style,
}: Props) {
  const { Common, Fonts } = useTheme();

  return (
    <FontAwesomeIcon
      icon={icon}
      size={size || Fonts.titleSmall.fontSize}
      style={[Common.icon[type] as object, ...[style]]}
    />
  );
}
