import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome';
import { IconDefinition as BrandsIconType } from '@fortawesome/free-brands-svg-icons';
import { IconType } from 'types/components';
import React from 'react';
import { IconDefinition as SolidIconType } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/hooks';

type Props = {
  icon: BrandsIconType | SolidIconType;
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
