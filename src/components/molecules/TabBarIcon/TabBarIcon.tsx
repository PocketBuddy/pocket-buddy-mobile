import { IconType, IconTypes } from 'types/components';
import { Icon } from '@/components';
import React from 'react';

type Props = {
  icon: IconTypes;
  focused?: boolean;
  type?: IconType;
  size?: number;
};

export default function TabBarIcon({ icon, focused = false, size }: Props) {
  return (
    <Icon
      icon={icon}
      type={focused ? IconType.Primary : IconType.Inactive}
      size={size}
    />
  );
}
