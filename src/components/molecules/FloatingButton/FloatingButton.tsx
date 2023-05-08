import { TouchableOpacity, View } from 'react-native';
import { Icon } from '@/components';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { IconType } from 'types/components';
import React from 'react';
import { useTheme } from '@/hooks';

type Props = {
  icon: IconDefinition;
  onPress: () => void;
};

const ICON_SIZE = 30;
const RADIUS = 40;

export default function FloatingButton({ icon, onPress }: Props) {
  const { Layout, Colors, Gutters } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Layout.absolute, Layout.right0, Layout.bottom0]}
    >
      <View
        style={[
          Gutters.tinyPadding,
          Layout.center,
          Gutters.tinyMargin,
          { borderRadius: RADIUS, backgroundColor: Colors.primary },
        ]}
      >
        <Icon icon={icon} size={ICON_SIZE} type={IconType.Secondary} />
      </View>
    </TouchableOpacity>
  );
}
