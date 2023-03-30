import { Image, View } from 'react-native';
import { BrandMode } from 'types/components';
import React from 'react';
import { useTheme } from '@/hooks';

type Props = {
  height?: number;
  width?: number;
  mode?: BrandMode;
};

export default function Brand({
  height = 200,
  width = 200,
  mode = BrandMode.Contain,
}: Props) {
  const { Layout, Images } = useTheme();

  return (
    <View testID={'brand-img-wrapper'} style={{ height, width }}>
      <Image
        testID={'brand-img'}
        style={Layout.fullSize}
        source={Images.logo}
        resizeMode={mode}
      />
    </View>
  );
}
